const mongoose = require('mongoose')
const quoteModel = require('../model/quote.model')

class quote{
	static async create(ctx){
		const{title,text,author,publisherId,classId} = ctx.request.body
		const titlePattern = /^[a-zA-Z0-9_\-\u4E00-\u9FA5]{1,5}$/
		const textPattern = /^[\s\S*]{1,160}$/
		const authorPattern = /^[a-zA-Z0-9_\-\u4E00-\u9FA5]{0,20}$/
		if(!text||!title||!publisherId||!classId){
			return ctx.body= {success:false,errorId:'01',msg:'信息不能为空'}
		}else if(!titlePattern.test(title)){
			return ctx.body= {success:false,errorId:'02',msg:'标题格式有误'}
		}else if(!textPattern.test(text)){
			return ctx.body= {success:false,errorId:'03',msg:'内容格式有误'}
		}else if(!authorPattern.test(author)){
			return ctx.body= {success:false,errorId:'04',msg:'作者格式有误'}
		}
		await quoteModel.create({title:title,text:text,author:author,publisher:publisherId,class:classId},function(err,res){
			if(err){
				return ctx.body = {success:false,errorId:'00',msg:'创建失败'}
			}else{
				return ctx.body = {success:true,msg:'创建成功'}
			}
		})
	}
	static async delete(ctx){
		const {id} = ctx.query
		await quoteModel.remove({_id:id},function(err,res){
			if(err){
				console.log(err)
				return ctx.body = {success:false,msg:'删除失败'}
			}else{
				return ctx.body = {success:true,msg:'删除成功'}
			}
		})
	}
	static async getList(ctx){
		const List = await quoteModel.find().sort({_id: -1}).populate('publisher class','nickname name').exec()
		ctx.body={success:true,quotes:List}
	}
	static async getListByClass(ctx){
		const {id} = ctx.query
		const List = await quoteModel.find({class:id}).sort({_id: -1}).populate('publisher class','nickname name').exec()
		ctx.body={success:true,quoteList:List}
	}

}

module.exports = quote