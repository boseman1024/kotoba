<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
  	return{

  	}
  },
  created(){

  }

}
</script>

<style>

/*滚动条*/
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background-color:#f5f5f5;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);}
::-webkit-scrollbar-thumb{background-color:#555;}
.tbrl{
	writing-mode: vertical-rl;    
    writing-mode: tb-rl;
    margin:0;
    padding:0;
}
.font0_8{
	font-size: 0.8em;
}
.font1_5{
	font-size:1.5em;
}
.font2{
	font-size:2em;
}
.font3{
	font-size:3em;
}
.fl{
	float: left;
}
.fr{
	float: right;
}
.cl{
	clear: both;
}
html,body{
	margin: 0;
	padding: 0;
	height: 100vh;
	width: 100%;
}
ul,li{
	list-style: none;
	margin: 0;
	padding: 0;
}
a:hover, a:visited, a:link, a:active {
    text-decoration: none;
    color:#000;
}
p{
  word-break: break-all;
}
input{
	box-sizing: border-box;
	text-align:center;
	font-size:1.2em;
	height:2.7em;
	border-radius:5px;
	border:1px solid #c8cccf;
	color:#000;
	display:block;
	outline:0;
	padding:0 0.5em;
	text-decoration:none;
}
input:focus{
	border:1px solid #000;
}
input:focus::-webkit-input-placeholder{
  font-size: 12px;
  transition: all .3s ease;
}
.btns{
  text-align: center;
  border: 1px solid #c8cccf;
  border-radius: 5px;
  transition: all .2s ease;
  padding: 0.6em 0;
  margin: 1em 0;
  font-size: 1.2em;
  cursor: pointer;
}
.btns:hover{
  border:1px solid #000;
  color: #fff;
  background-color: #000;
}
#app{
 	height:100vh;
 	margin:0;
 	position: 0;
}
#back{
  margin:0 0 0 2em;
  cursor: pointer;
  color: #666;
  transition: all .3s ease;
}
#back:hover{
	color: #000;
}
#errors{
  position: fixed;
  right: 1em;
  bottom: 1em;
  padding: 0 1em;
  border-radius: 0.8em;
  background-color: #000;
  color: #fff;
  z-index: 9999;
}


@media screen and (max-width:640px){
    #back{
      margin:0 0 0 1em;
      font-size: 1.7em;
      color: #000;
      border-bottom: 1px solid #000;
    }
}

/*过渡动画*/
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
