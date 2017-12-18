const mongoose = require('mongoose')
const quoteClassModel = require('../model/quoteClass.model')

class quoteClass{
	static async create(ctx){
		const{name,creator} = ctx.request.body
		const namePattern =  /^[a-zA-Z0-9_\-\u4E00-\u9FA5]{1,5}$/
		if(!name||!creator){
			return ctx.body = {success:false,errorId:'01',msg:'标题不能为空'}
		}else if(!namePattern.test(name)){
			return ctx.body = {success:false,errorId:'02',msg:'标题格式错误'}
		}
		await quoteClassModel.create({name:name,creator:creator},function(err,res){
			if(err){
				return ctx.body = {success:false,errorId:'00',msg:'创建失败'}
			}else{
				return ctx.body = {success:true,msg:'创建成功'}
			}
		})
	}
	static async getList(ctx){
		const {userid} = ctx.request.query
		const list = await quoteClassModel.find({creator:userid},{key:0,tips:0})
		ctx.body = {class:list}
	}
	static async update(ctx){
		const{id,name} = ctx.request.body
		const namePattern =  /^[a-zA-Z0-9_\-\u4E00-\u9FA5]{1,5}$/
		if(!id||!name){
			return ctx.body = {success:false,errorId:'01',msg:'标题不能为空'}
		}else if(!namePattern.test(name)){
			return ctx.body = {success:false,errorId:'02',msg:'标题格式错误'}
		}
		await quoteClassModel.update({_id:id},{$set:{name:name}}).then(function(res){
			if(res.ok==0){
				return ctx.body = {success:false,errorId:'00',msg:'修改失败'}
			}else{
				return ctx.body = {success:true,msg:'修改成功'}
			}
		})
	}
	static async delete(ctx){
		const {id} = ctx.query
		await quoteClassModel.remove({_id:id},function(err,res){
			if(err){
				return ctx.body = {success:false,msg:'删除失败'}
			}else{
				return ctx.body = {success:true,msg:'删除成功'}
			}
		})
	}
}

module.exports = quoteClass