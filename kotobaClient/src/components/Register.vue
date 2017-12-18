<template>
  <div id="register">
    <router-link to="/" replace id="back" class="font3">BACK</router-link>
    <div class="register">
      <div>
    	<h3>用户名：</h3>
    	<input type="text" v-model="userInfo.username" v-validate="'required|alpha_num|min:6|max:16'" :class="{'is-danger': errors.has('username') }" placeholder="USERNAME" name="username">
    	<h3>昵称：</h3>
    	<input type="text" v-model="userInfo.nickname" placeholder="NICKNAME" v-validate="{required: true,regex:/^[a-zA-Z0-9_\-\u4E00-\u9FA5]{2,9}$/ }" :class="{'is-danger': errors.has('nickname')}" name="nickname">
    	<h3>密码：</h3>
    	<input type="password" v-model="userInfo.password" placeholder="PASSWORD" v-validate="'required|alpha_num|min:6|max:16'" :class="{'is-danger': errors.has('pwd')}" name="pwd">
    	<h3>重复密码：</h3>
    	<input type="password" v-model="userInfo.repassword" placeholder="REPEAT_PASSWORD" v-validate="'required|confirmed:pwd'" :class="{'is-danger': errors.has('repwd')}" name="repwd">
    	<div class="btns" @click="register">注册</div>
    	<hr>
    	<router-link to="/login"><div class="btns">登录</div></router-link>
      </div>
    </div>
    <transition name="slide-fade">
      <div id="errors" v-show="isError" @click="isError=!isError"><p>{{errorMsg}}</p></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'register',
  data(){
  	return{
      userInfo:{
    		username:'',
        nickname:'',
        password:'',
        repassword:''
      },
      isError:false,
      errorMsg:''
  	}
  },
  methods:{
    register(){
      this.$store.dispatch('register',this.userInfo).then((res)=>{
        if(res.success){
          this.$router.push('login')
        }else{
          this.errorMsg=res.msg
          if(res.errorId=='01'){
            this.$validator.validateAll()
          }else if(res.errorId=='02'){
            this.errors.add('username','用户名已被占用')
          }else if(res.errorId=='03'){
            this.errors.add('nickname','昵称已被占用')
          }
          this.isError=true
        }
      })
    }
  }
}
</script>

<style scoped>
#register{
	height: 100vh;
} 
.register{
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
input{
	font-size:1em;
	height:2em;
}
.btns{
  padding:0.2em 0;
}
.is-danger{
  border:1px solid #FF5C5C;
}

</style>
