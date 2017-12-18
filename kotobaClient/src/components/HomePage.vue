<template>
  <div id="home">
    <header-Area></header-Area>

    <div class="kotoba" :class="{tbrl:isVertical}" @click="isVertical=!isVertical">
    	{{quotes[index].text}}
    	<div v-if="quotes[index].author!=''">———{{quotes[index].author}}</div>
    </div>
    <div class="title" @click="index++" style="cursor:pointer">{{quotes[index].title}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import headerArea from '@/components/Header'
export default {
  name: 'home',
  components:{
    headerArea
  },
  data(){
  	return{
  		isVertical:true,
      index:0
  	}
  },
  computed:{
    ...mapGetters({
      quotes:'getQuotes',
    })
  },
  created(){
    this.$store.dispatch('getQuotes')
    
  },
  watch:{
    index:function(val){
      if(val==this.quotes.length){
        this.index=0
      }
    }
  }
}
</script>

<style scoped>
#home{
  height:100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kotoba{
    font-family:"Source Han Sans CN";
    margin: 100px 0px 110px 0;
    padding:20px 15px;
    text-align: center;
    font-size:1.5rem;
    line-height: 2.5rem;
    cursor: pointer;
}
.title{
	position: absolute;
	bottom: 20px;
	right: 50px;
	padding:10px 30px 10px 30px;
	border: 3px solid #000;
	font-size:2.7em;
}

@media screen and (max-width:640px){
    .title{
      font-size:1.2em;
    }
}
</style>
