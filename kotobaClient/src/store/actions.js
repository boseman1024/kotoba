import axios from 'axios'

const baseurl = 'http://localhost:3000/api/'

const actions = {
	async register({commit},userInfo){
		let url = baseurl+'user/create'
		const result =  await axios.post(url,userInfo)
		return result.data
	},
	async login({commit},userInfo){
		let url = baseurl+'user/login'
		const result = await axios.post(url,userInfo)
		commit('setUser',result.data)
		localStorage.setItem('token',result.data.token)
		return result.data
	},
	async isLogin({commit}){
		const token = localStorage.getItem('token')
		if(token){
			const tokenInfo = {
			'token' : token
			}
			let url = baseurl+'user/validToken'
			const result = await axios.post(url,tokenInfo)
			if(!result.data.isLogin){
				localStorage.removeItem('token')
				commit('isLogin',result.data)
			}else{
				commit('isLogin',result.data)
				commit('setCurrentUser',result.data)
			}

		}
		
	},
	async logout({commit}){
		localStorage.removeItem('token')
		commit('clearCurrentUser')
		commit('isLogin',false)
	},
	async getUser({commit},nickname){
		let url = baseurl+'user/getUser?nickname='+nickname
		const result = await axios.get(url)
		commit('setUser',result.data)
	},
	async getClass({commit},id){
		let url = baseurl+'class/getList?userid='+id
		const result = await axios.get(url)
		commit('setClass',result.data)
	},
	async addClass({commit},article){
		let url = baseurl+'class/create'
		const result =  await axios.post(url,article)
		return result.data
	},
	async deleteClass({commit},id){
		let url = baseurl+'class/delete?id='+id
		const result = await axios.get(url)
		return result.data
	},
	async updateClass({commit},article){
		let url = baseurl+'class/update'
		const result = await axios.post(url,article)
		return result.data
	},
	async getQuoteByClass({commit},id){
		let url = baseurl+'quote/getListByClass?id='+id
		const result = await axios.get(url)
		commit('setQuoteList',result.data)
	},
	async addQuote({commit},quote){
		let url = baseurl+'quote/create'
		const result = await axios.post(url,quote)
		return result.data
	},
	async getQuotes({commit}){
		let url = baseurl+'quote/getList'
		const result = await axios.get(url)
		commit('setQuotes',result.data)
	},
	async deleteQuote({commit},id){
		let url = baseurl+'quote/delete?id='+id
		const result = await axios.get(url)
		return result.data
	},
	async addList({commit},quote){
		let url = baseurl+'user/addList'
		const result = await axios.post(url,quote)
		return result.data
	},
	async deleteList({commit},quote){
		let url = baseurl+'user/deleteList'
		const result = await axios.post(url,quote)
		return result.data
	}
}

export default actions