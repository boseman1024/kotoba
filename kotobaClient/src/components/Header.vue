<template>
  	<div id="header">
      <div class="bar">
    		<router-link to="/">
    		<div class="date">
    			<span class="tbrl font1_5">{{year}}</span>
    			<span class="font3">{{month}}.{{date}}</span>
    		</div>
    		<div class="font2">{{day}}·{{greeting}}</div>
    		</router-link>
    		<div class="list">
    			<img class="logo" @click="isMenu=!isMenu" src="static/sun.svg">
    			<transition name="slide-fade">
    			<ul v-show="isMenu">
    				<li v-if="!isLogin"><router-link to="/login">登录</router-link></li>
    				<li v-if="!isLogin"><router-link to="/register">注册</router-link></li>
            <li><router-link to="/explore">探索</router-link></li>
    				<li v-if="isLogin"><router-link :to="{name:'space',params:{nickname:currentUser.nickname}}">个人</router-link></li>
            <li v-if="isLogin" @click="logout" style="cursor:pointer">注销</li>
    			</ul>
    			</transition>
    		</div>
      </div>

      <div id="mobile-bar">
        <div class="menu" :class="{menuOn:isNav}" @click="isNav=!isNav">MENU</div>
        <transition name="slide-fade">
        <ul class="navList" v-show="isNav">
          <li v-if="!isLogin"><router-link to="login">登录</router-link></li>
          <li v-if="!isLogin"><router-link to="register">注册</router-link></li>
          <li><router-link to="explore">探索</router-link></li>
          <li v-if="isLogin"><router-link :to="{name:'space',params:{nickname:currentUser.nickname}}">个人</router-link></li>
          <li v-if="isLogin" @click="logout" style="cursor:pointer"><a>注销</a></li>
        </ul>
        </transition>
      </div>
  	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'header',
  data(){
  	return{
  		greeting:"",
      year:"",
      month:"",
      date:"",
      day:"",
  		isMenu:false,
      isNav:false,
  	}
  },
  computed:{
    ...mapGetters({
      isLogin:'getIsLogin',
      currentUser:'getCurrentUser'
    })
  },
  created(){
    const date = new Date()
  	let hour = date.getHours()
    this.year = date.getFullYear()
    this.month  = date.getMonth()+1
    this.date = date.getDate()
    switch(date.getDay()){
      case 0:
        this.day='周日' 
        break;
      case 1:
        this.day='周一' 
        break;
      case 2:
        this.day='周二' 
        break;
      case 3:
        this.day='周三' 
        break;
      case 4:
        this.day='周四' 
        break;
      case 5:
        this.day='周五' 
        break;
      case 6:
        this.day='周六' 
        break;
    }
  	if(hour>18||hour<=5){
  		this.greeting='晚安'
  	}else if(hour>10){
  		this.greeting='午安'
  	}else if(hour>5){
      this.greeting='早安' 
  	}
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      this.$router.replace('/')
    }
  }

}
</script>

<style scope>
#mobile-bar{
  display: none;
}
.menu{
  position: fixed;
  top: 0;
  left: 1em;
  font-size: 1.7em;
  border-bottom: 1px solid #000;
  z-index: 9;
  transition: all .3s ease;
}
.menuOn{
  color: #fff;
  border-bottom: 1px solid #fff;
}
.navList{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 8em;
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 5em 0;
}
.navList a{
  color: #fff;
  font-size: 1.5em;
}
.logo{
	width: 35px;
	height:35px;
	cursor: pointer;
  float: left;
}
.bar{
  position: fixed;
  top: 20px;
  left:50px;
}
.date{
	padding: 5px 0 0 0;
	border-top: 5px solid #000;
	border-bottom: 5px solid #000;
}
.list li{
  float: left;
}


/*媒体查询*/
@media screen and (max-width:640px){
    #mobile-bar{
      display: block;
    }
    .bar{
    	display: none;
    }
    
}
</style>
