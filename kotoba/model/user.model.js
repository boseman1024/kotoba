const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema

const userSchema = new Schema({
	username:{type:String,require:true,unique:true},
	nickname:{type:String,require:true,unique:true},
	password:{type:String,require:true},
	createAt:{type:Date,default:Date.now},
	list:[{type:Schema.Types.ObjectId,ref:'Quote'}]
})

userSchema.pre('findOne',function(next){
	if(this._conditions.password){
		const salt = this._conditions.password.substring(2,5)
		this._conditions.password = crypto.createHmac('sha256',salt).update(this._conditions.password).digest('hex')
	}
	next()
})

userSchema.pre('save',function(next){
	const user = this
	const salt = user.password.substring(2,5)
	user.password = crypto.createHmac('sha256',salt).update(user.password).digest('hex')
	next()
})

userSchema.pre('update',function(next){
	if(!!this._update.$set){
		if(this._update.$set.password){
			const salt = this._update.$set.password.substring(2,5)
			this._update.$set.password = crypto.createHmac('sha256',salt).update(this._update.$set.password).digest('hex')
		}
	}
	next()
})
module.exports = mongoose.model('User',userSchema,'user');