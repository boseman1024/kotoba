const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = new Schema({
	title:{type:String,require:true},
	text:{type:String,require:true},
	author:{type:String},
	class:{type:Schema.Types.ObjectId,ref:'quoteClass'},
	publisher:{type:Schema.Types.ObjectId,ref:'User',require:true},
	createAt:{type:Date,default:Date.now},
	key:{type:String},
	tips:{type:String}
})

module.exports = mongoose.model('Quote',quoteSchema,'quote')