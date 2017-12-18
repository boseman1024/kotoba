const getters = {
	getUser:function(state){
			return state.user
	},
	getCurrentUser:function(state){
			return state.currentUser
	},
	getClass:function(state){
			return state.class
	},
	getIsLogin:function(state){
		return state.isLogin
	},
	getIsUser:function(state){
		return state.isUser
	},
	getQuoteList:function(state){
		return state.quoteList
	},
	getQuotes:function(state){
		return state.quotes
	}
}
export default getters;