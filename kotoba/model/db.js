const mongoose = require('mongoose')

const MONGO_ADDR = 'localhost'
const uri = 'mongodb://' +  MONGO_ADDR + '/kotoba'
mongoose.Promise = require('bluebird')
mongoose.connect(uri,{useMongoClient: true})

// 连接成功 
mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to ' + uri)
})

// 连接失败
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err)
})

// 断开连接
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected')
})