const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema

const quoteClassSchema = new Schema({
	name:{type:String,require:true},
	creator:{type:Schema.Types.ObjectId,ref:'User',require:true},
	createAt:{type:Date,default:Date.now},
	lock:{type:Boolean,default:false},
	key:{type:String},
	tips:{type:String}
})

module.exports = mongoose.model('quoteClass',quoteClassSchema,'quoteclass')