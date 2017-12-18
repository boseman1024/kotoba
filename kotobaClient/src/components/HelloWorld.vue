<template>
  <div class="hello">
    <h1>语</h1>
    <div>
      <input v-model="text" placeholder="text">
      <input v-model="author" placeholder="author">
      <input v-model="publisherId" placeholder="publisherId">
      <input v-model="qclassId" placeholder="classId">
      <input v-model="qkey" placeholder="key">
      <input v-model="qtips" placeholder="tips">
      <button v-on:click="creq">创建</button>
      <button v-on:click="getqList">获取</button>
      <p>{{qlist}}</p>
    </div>
    <div>
      <input v-model="qId" placeholder="qId">
      <button v-on:click="delq">删除</button>
    </div>
    <button v-on:click="qcheck">KEY</button>
    <h1>类</h1>
    <button v-on:click="check">KEY</button>
    <div>
      <input v-model="name" placeholder="name">
      <input v-model="creatorId" placeholder="creatorId">
      <input v-model="key" placeholder="key">
      <input v-model="tips" placeholder="tips">
      <button v-on:click="cre">创建</button>
      <button v-on:click="getList">获取</button>
      <p>{{list}}</p>
      <div>
        <input v-model="classId" placeholder="classId">
        <button v-on:click="delclass">删除</button>
      </div>
      <div>
        <input v-model="classId" placeholder="classId">
        <input v-model="uname" placeholder="uname">
        <input v-model="ukey" placeholder="ukey">
        <input v-model="utips" placeholder="ukey">
        <button v-on:click="upclass">修改</button>
      </div>
    </div>
    <h1>用户</h1>
  	<div>
  	<input v-model="email" placeholder="email">
  	<input v-model="nickname" placeholder="nickname">
  	<input v-model="password" placeholder="password">
  	<button v-on:click="reg">注册</button>
  	</div>
  	<div>
  		<p>{{email}}  {{nickname}}   {{password}}</p>
  		<button v-on:click="getUsers">获取</button>
  		<p>{{user}}</p>
  	</div>
  	<div>
  		<input v-model="id" placeholder="id">
  		{{id}}
  		<button v-on:click="del">删除</button>
  	</div>
  	<div>
  	  <input v-model="upid" placeholder="upid">
      <input v-model="opwd" placeholder="opwd">
      <input v-model="npwd" placeholder="npwd">
      <p>{{upid}}  {{opwd}}   {{npwd}}</p>
      <button v-on:click="update">修改</button>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      qId:'',
      qlist:'11',
      text:'',
      author:'',
      publisherId:'',
      qclassId:'',
      qtips:'',
      qkey:'',
      uname:'',
      ukey:'',
      utips:'',
      classId:'',
      name:'',
      creatorId:'',
      tips:'',
      key:'',
      list:'',
    	id:'',
    	email: '',
      nickname: '',
      password: '',
      user:'121',
      upid:'',
      opwd:'',
      npwd:''
    }
  },
  methods:{
    qcheck:function(){
      const qinfo = {
        id:this.qId,
        key:this.qkey
      }
      this.$http.post('http://localhost:3000/api/quote/check',qinfo).then(response =>
        console.log(response)
        )
    },
    delq:function(){
      this.$http.get('http://localhost:3000/api/quote/delete/'+this.qId).then(response =>
        console.log(response)
      )
    },
    getqList:function(){
        this.$http.get('http://localhost:3000/api/quote/getList').then(response =>
        this.qlist = response.data
      )
    },
    creq:function(){
      const qinfo = {
        text:this.text,
        author:this.author,
        publisherId:this.publisherId,
        classId:this.qclassId,
        key:this.qkey,
        tips:this.qtips
      }
      this.$http.post('http://localhost:3000/api/quote/create',qinfo).then(response =>
        console.log(response)
        )
    },
    check:function(){
      const classInfo = {
        id:this.classId,
        key:this.key
      }
      this.$http.post('http://localhost:3000/api/class/check',classInfo).then(response =>
        console.log(response)
        )
    },
    upclass:function(){
      const classInfo = {
        id:this.classId,
        name:this.uname,
        key:this.ukey,
        tips:this.utips
      }
      this.$http.post('http://localhost:3000/api/class/update',classInfo).then(response =>
        console.log(response)
        )
    },
    delclass:function(){
      this.$http.get('http://localhost:3000/api/class/delete/'+this.classId).then(response =>
        console.log(response)
      )
    },
    cre:function(){
      const classInfo = {
        name:this.name,
        key:this.key,
        tips:this.tips,
        creator:this.creatorId
      }
      this.$http.post('http://localhost:3000/api/class/create',classInfo).then(response =>
        console.log(response)
        )
    },
    getList:function(){
      this.$http.get('http://localhost:3000/api/class/getList').then(response =>{
        console.log(response)
        this.list = response.data
        }
      )
    },
    update:function(){
      const userInfo = {
        id : this.upid,
        newPwd : this.npwd,
        oldPwd : this.opwd
      }
      this.$http.post('http://localhost:3000/api/user/update',userInfo).then(response =>
        console.log(response)
        )
    },
  	del:function(){
  		this.$http.get('http://localhost:3000/api/user/delete/'+this.id).then(response =>
  			console.log(response)
  		)
  	},
  	reg:function(){
  		const userInfo = {
  			email : this.email,
  			nickname : this.nickname,
  			password : this.password
  		}
  		this.$http.post('http://localhost:3000/api/user/create',userInfo).then(response =>
  			console.log(response)
  		)
  	},
  	getUsers:function(){
  		this.$http.get('http://localhost:3000/api/user/getList').then(response =>{
  			console.log(response)
  			this.user = response.data
  			}
  		)
  	}
  }
}
</script>

<style scoped>

</style>
