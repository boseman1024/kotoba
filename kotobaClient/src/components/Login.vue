<template>
  <div id="login">
    <router-link to="/" replace id="back" class="font3">BACK</router-link>
    <div class="login">
      <div>
      	<h3>用户名：</h3>
      	<input type="text" v-model="userInfo.username" v-validate="'required|alpha_num|min:6|max:16'" :class="{'is-danger': errors.has('username') }" placeholder="USERNAME" name="username">
      	<h3>密码：</h3>
      	<input type="password" v-model="userInfo.password" placeholder="PASSWORD" v-validate="'required|alpha_num|min:6|max:16'" :class="{'is-danger': errors.has('pwd')}" name="pwd">
      	<div class="btns" @click="login">登录</div>
      	<hr>
      	<router-link to="/register"><div class="btns">注册</div></router-link>
      </div>
    </div>
    <transition name="slide-fade">
      <div id="errors" v-show="isError" @click="isError=!isError"><p>{{errorMsg}}</p></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
  	return{
      userInfo:{
        username:'',
        password:''
      },
      isError:false,
      errorMsg:''
  	}
  },
  methods:{
    login(){
      this.$store.dispatch('login',this.userInfo).then((res)=>{
        if(res.success){
          this.$router.replace('/')
        }else{
          this.errorMsg=res.msg
          if(res.errorId=='01'){
            this.$validator.validateAll()
          }else if(res.errorId=='02'){
            this.errors.add('username','用户名错误')
            this.errors.add('pwd','密码错误')
          }
          this.isError=true
        }
      })
    }
  }
}
</script>

<style scoped>
#login{
	height: 100vh;
}
.login{
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.is-danger{
  border:1px solid #FF5C5C;
}
</style>
