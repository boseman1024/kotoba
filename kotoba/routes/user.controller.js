const mongoose = require('mongoose')
const userModel = require('../model/user.model')
const jwt = require('jwt-simple')
const moment = require('moment')

const jwtTokenSecret = 'just-secret'

class user{
	static async createUser(ctx){
		const {userInfo,username,nickname,password,repassword} = ctx.request.body
		if(!username||!nickname||!password||!repassword){
			return ctx.body= {success:false,errorId:'01',msg:'注册信息不能为空'}
		}
		//验证信息
		const userNamePattern =  /^[a-zA-Z0-9_]{6,16}$/
		const nickNamePattern =  /^[a-zA-Z0-9_\-\u4E00-\u9FA5]{2,9}$/
		const passWordPattern = /^[a-zA-Z0-9_]{6,16}$/
		if(!userNamePattern.test(username)||!nickNamePattern.test(nickname)||password!==repassword||!passWordPattern.test(password)){
			return ctx.body= {success:false,errorId:'04',msg:'重复密码不正确'}
		}
		if(await userModel.findOne({username:username})){
			return ctx.body= {success:false,errorId:'02',msg:'用户名已被占用'}
		}
		if(await userModel.findOne({nickname:nickname})){
			return ctx.body= {success:false,errorId:'03',msg:'昵称已被占用'}
		}
		await userModel.create({username:username,nickname:nickname,password:password},function(err,res){
			if(err){
				console.log(err)
				return ctx.body= {success:false,errorId:'00',msg:'注册失败'}
			}else{
				console.log('注册成功:'+res)
				return ctx.body = {success:true,msg:'注册成功'}
			}
		})

	}
	//(#`O′)
	static async deleteUser(ctx){
		const {id} = ctx.params
		ctx.body = await userModel.remove({_id:id},function(err,res){
			if(err){
				console.log(err)
				ctx.throw(400, '删除失败!')
			}else{
				console.log('删除成功:'+res)
			}
		})
	}
	//(#`O′)
	static async updateUserPwd(ctx){
		const {id,newPwd,oldPwd} = ctx.request.body
		if(!id||!newPwd||!oldPwd){
			ctx.throw(400, '获取用户信息失败!')
		}else if(newPwd==oldPwd){
			ctx.throw(400, '新密码与原密码相同!')
		}
		await userModel.findOne({_id:id,password:oldPwd}).then(function(user){
			if(!user){
				ctx.throw(400, '原密码错误!')
			}
		})
		ctx.body = await userModel.update({_id:id},{$set:{password:newPwd}},function(err,res){
			if(err){
				console.log(err)
				ctx.throw(400, '修改失败!')
			}else{
				console.log('修改成功:'+res)
			}
		})
		
	}
	static async getUser(ctx){
		const {nickname} = ctx.query
		const user = await userModel.findOne({nickname:nickname},{password:0,__v:0}).populate('list').exec()
		ctx.body={success:true,user:user}
	}
	static async login(ctx){
		const {username,password} = ctx.request.body
		if(!username||!password){
			return ctx.body= {success:false,errorId:'01',msg:'用户名或密码不能为空'}
		}
		//验证信息
		const userNamePattern =  /^[a-zA-Z0-9_]{6,16}$/
		const passWordPattern = /^[a-zA-Z0-9_]{6,16}$/
		if(!userNamePattern.test(username)||!passWordPattern.test(password)){
			return ctx.body= {success:false,errorId:'02',msg:'用户名或密码错误'}
		}
		const user = await userModel.findOne({username:username,password:password},{password:0,__v:0})
		if(!user){
			return ctx.body= {success:false,errorId:'02',msg:'用户名或密码错误'}
		 }
		const time = moment().add(3,'day').valueOf()
		const token = jwt.encode({iss:user._id,exp:time},jwtTokenSecret)
		ctx.body={success:true,msg:'登录成功',token:token,user:user}
	}
	static async validToken(ctx){
		const {token} = ctx.request.body
		if(token){
			try{
				const decoded = jwt.decode(token,jwtTokenSecret)
				if(decoded.exp<=Date.now()){
					ctx.body={isLogin:false,msg:'Token已失效'}
				}else{
					await userModel.findOne({_id:decoded.iss},{password:0,__v:0},function(err,user){
						if(err){
							console.log(err)
							ctx.body={isLogin:false,msg:'Token错误'}
						}else if(user!==null){
							ctx.body={isLogin:true,msg:'已登录',user:user}
						}else{
							ctx.body={isLogin:false,msg:'Token错误'}
						}
					})
				}
			}catch(err){
				console.log(err)
			}
		}else{
			ctx.body={isLogin:false,msg:'未登录'}
		}
		
	}
	static async addList(ctx){
		const {userId,quoteId} = ctx.request.body
		await userModel.update({_id:userId},{$addToSet:{list:quoteId}}).then((res)=>{
			if(res.nModified==0){
				return ctx.body = {success:false,errorId:'00',msg:'已存在于列表中'}
			}else{
				return ctx.body = {success:true,msg:'添加成功'}
			}
		})
	}
	static async deleteList(ctx){
		const {userId,quoteId} = ctx.request.body

		await userModel.update({_id:userId},{$pull:{list:quoteId}}).then((res)=>{
			if(res.nModified==0){
				return ctx.body = {success:false,errorId:'00',msg:'删除失败'}
			}else{
				return ctx.body = {success:true,msg:'删除成功'}
			}
		})
	}



}

module.exports = user