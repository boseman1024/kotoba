const router = require('koa-router')()
const userController = require('./user.controller')
const quoteClassController = require('./quoteClass.controller')
const quoteController = require('./quote.controller')

router.prefix('/api')

router
	.post('/user/login',userController.login)
	.post('/user/validToken',userController.validToken)
	.post('/user/create',userController.createUser)
	.get('/user/delete/:id',userController.deleteUser)
	.post('/user/update',userController.updateUserPwd)
	.get('/user/getUser',userController.getUser)
	.post('/user/addList',userController.addList)
	.post('/user/deleteList',userController.deleteList)

	.get('/class/getList',quoteClassController.getList)
	.get('/class/delete',quoteClassController.delete)
	.post('/class/create',quoteClassController.create)
	.post('/class/update',quoteClassController.update)

	.get('/quote/getList',quoteController.getList)
	.get('/quote/getListByClass',quoteController.getListByClass)
	.get('/quote/delete',quoteController.delete)
	.post('/quote/create',quoteController.create)

module.exports = router
