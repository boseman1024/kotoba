const mutations = {
	setUser:function(state,data){
		state.user = data.user
	},
	setCurrentUser:function(state,data){
		state.currentUser = data.user
	},
	clearCurrentUser:function(state){
		state.currentUser = ''
	},
	setClass:function(state,data){
		state.class = data.class
	},
	setQuoteList:function(state,data){
		state.quoteList = data.quoteList
	},
	setQuotes:function(state,data){
		state.quotes = data.quotes
	},
	isLogin:function(state,data){
		state.isLogin = data.isLogin
	},
	setIsUser:function(state,data){
		state.isUser = data
	}
}

export default mutations;
