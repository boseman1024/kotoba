<template>
  <div id="explore">
    <router-link to="/" replace id="back" class="font3">BACK</router-link>
    <div v-for="card in quotes" class="explore">
    	<div class="card">
    		<h3>{{card.title}}</h3>
    		<p>{{card.text}}</p>
    		<dfn v-if="card.author!=''" class="fr author">———{{card.author}}</dfn>
    		<div class="font0_8 cl">
          <span>{{new Date(card.createAt).toDateString()}}</span>
          <span class="fr" @click="addList(card._id)" style="cursor:pointer">+</span>
          <span class="fr">「{{card.class.name}}」</span>
          <span class="fr"><router-link :to="{name:'space',params:{nickname:card.publisher.nickname}}">{{card.publisher.nickname}}</router-link></span>
        </div>
    	</div>

    <transition name="slide-fade">
      <div id="errors" v-show="isError" @click="isError=!isError"><p>{{errorMsg}}</p></div>
    </transition>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'explore',
  data(){
    return{
      errorMsg:'',
      isError:false
    }
  },
  computed:{
    ...mapGetters({
      currentUser:'getCurrentUser',
      quotes:'getQuotes',
    })
  },
  methods:{
    addList(id){
      const quote={
        userId:this.currentUser._id,
        quoteId:id
      }
      this.$store.dispatch('addList',quote).then((res)=>{
        if(res.success){
          this.errorMsg='加入成功'
          this.isError=true
        }else{
          this.errorMsg=res.msg
          this.isError=true
        }
      })
    }
  },
  created(){
    this.$store.dispatch('getQuotes')
  }
}
</script>

<style scoped>
#explore{
  height:100vh;
}
.explore{
  display: flex;
  justify-content: center;
}
.card{
	width: 30em;
  padding: 15px;
	margin:0 0 20px 0;
	border-radius: 0.5em;
  transition: all 0.7s ease;
}
.card:hover{
	background-color:#efe8d8;
}
.author{
	margin: 0 30px 20px 0;
}
@media screen and (max-width:640px){
    .explore{
        margin: 0;
    }
}
</style>
