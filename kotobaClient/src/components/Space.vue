<template>
  <div id="space">
    <router-link to="/" replace id="back" class="font3">BACK</router-link>
    <div class="space">
      <h1>{{user.nickname}}</h1>
      <label>CREATE AT : {{new Date(user.createAt).toDateString()}}</label>
      <h3 @click="isSet=!isSet">SET</h3>
      <div class="set" v-show="isSet">
        <div class="card" v-for="item in classSet" @click="getQuote(item._id,item.name)">
          <h5>{{item.name}}</h5>
          <span class="font0_8">{{new Date(item.createAt).toLocaleDateString()}}</span>
        </div>
        <div class="card" v-if="isUser">
          <h1 v-if="!isAdd" @click="isAdd=!isAdd">+</h1>
          <input v-if="isAdd" type="text" placeholder="TITLE" v-model="classtitle" id="class-title" v-validate="{required: true,regex:/^[a-zA-Z0-9_\-\u4E00-\u9FA5]{1,5}$/ }" :class="{'is-danger': errors.has('classtitle')}" name="classtitle"/>
          <span v-if="isAdd" class="font0_8" @click="addClass">保存</span>
          <span v-if="isAdd" class="font0_8" @click="isAdd=!isAdd">取消</span>
        </div>
      </div>
      <h3 @click="isList=!isList">LIST</h3>
      <div v-show="isList" v-for="item in user.list">
        <div class="list-card">
          <h2>{{item.title}}</h2>
          <span v-if="isUser" style="cursor:pointer" @click="deleteList(item._id)">删除</span>
          <p>{{item.text}}</p>
          <dfn v-if="item.author!=''">———{{item.author}}</dfn>
        </div>
      </div>
      <div class="more">
          MORE…
      </div>
    </div>

    <div class="modal" v-show="isModal">
      <div class="modal-bg" @click="isModal=!isModal,isPublish=false,isUpdateClass=false,updateClassTitle=''"></div>
      <div class="modal-data">
          <h1 v-if="!isUpdateClass">{{quoteClassTitle}}</h1>
          <input id="updeteTitle" type="text" autofocus="autofocus" v-if="isUpdateClass" v-model="updateClassTitle" placeholder="TITLE" v-validate="{required: true,regex:/^[a-zA-Z0-9_\-\u4E00-\u9FA5]{1,5}$/ }" :class="{'is-danger': errors.has('updateClassTitle')}" name="updateClassTitle"/>
          <div v-if="isUser" >
            <span v-show="!isUpdateClass" @click="isUpdateClass=!isUpdateClass" style="cursor:pointer">修改</span>
            <span v-show="!isUpdateClass" @click="deleteClass" style="cursor:pointer">删除</span>
            <span v-show="isUpdateClass" @click="updateClass" style="cursor:pointer">确定</span>
            <span v-show="isUpdateClass" @click="isUpdateClass=!isUpdateClass" style="cursor:pointer">取消</span>
            
          </div>
          <hr style= "border:1px dashed #000">
          <h3 v-show="!isPublish" @click="isPublish=!isPublish" v-if="isUser">发表</h3>
          <div id="publish" class="item" v-if="isPublish">
            <input id="ptitle" v-model="ptitle" placeholder="TITLE" v-validate="{required: true,regex:/^[a-zA-Z0-9_\-\u4E00-\u9FA5]{1,5}$/ }" :class="{'is-danger': errors.has('ptitle')}" name="ptitle"/>
            <textarea id="ptext" v-model="ptext" placeholder="TEXT" v-validate="{required: true,regex:/^[\s\S*]{1,160}$/ }" :class="{'is-danger': errors.has('ptext')}" name="ptext"/>
            <span>字数:{{count}}</span>
            <input id="pauthor" v-model="pauthor" placeholder="AUTHOR" v-validate="{regex:/^[a-zA-Z0-9_\-\u4E00-\u9FA5]{0,20}$/ }" :class="{'is-danger': errors.has('pauthor')}" name="pauthor"/>
            +<span @click="publish" style="cursor:pointer">发表</span>#<span @click="isPublish=!isPublish" style="cursor:pointer">取消</span>-         
          </div>
          <div v-if="quoteList.length==0" class="tips"><p>空空空空！！！</p><p>THERE IS NOTHING!!!</p></div>
          <div v-else v-for="item in quoteList">
            <div  class="item">
              <h2>{{item.title}}</h2>
              <p>{{item.text}}</p>
              <dfn v-if="item.author!=''">———{{item.author}}</dfn>
              <div class="font1_5">+<span v-if="isUser" style="cursor:pointer" @click="addList(item._id)">加入列表</span>#<span v-if="isUser" @click="deleteQuote(item._id)" style="cursor:pointer">删除</span>-</div>
            </div>
          </div>
          <div v-if="quoteList.length!=0" class="tips"><p>底底底底！！！</p><p>IT IS BOTTOM NOW!!! </p></div>
      </div>
    </div>


    <transition name="slide-fade">
      <div id="errors" v-show="isError" @click="isError=!isError"><p>{{errorMsg}}</p></div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'space',
  data(){
  	return{
  		isSet:true,
      isList:false,
      isModal:false,
      isPublish:false,
      isAdd:false,
      isError:false,
      isUpdateClass:false,
      errorMsg:'',
      classtitle:'',
      quoteClassId:'',
      quoteClassTitle:'',
      updateClassTitle:'',
      ptitle:'',
      ptext:'',
      pauthor:''
  	}
  },
  computed:{
    ...mapGetters({
      user:'getUser',
      currentUser:'getCurrentUser',
      classSet:'getClass',
      quoteList:'getQuoteList',
      isUser:'getIsUser'
    }),
    count:function(){
      return this.ptext.replace(/[\r\n]/g,'').length
    }
  },
  methods:{
    addList(id){
      const quote={
        userId:this.currentUser._id,
        quoteId:id
      }
      this.$store.dispatch('addList',quote).then((res)=>{
        if(res.success){
          this.$store.dispatch('getUser',this.user.nickname)
          this.errorMsg=res.msg
          this.isError=true
        }else{
          this.errorMsg=res.msg
          this.isError=true
        }
      })
    },
    deleteList(id){
      const quote={
        userId:this.currentUser._id,
        quoteId:id
      }
       this.$store.dispatch('deleteList',quote).then((res)=>{
        if(res.success){
          this.$store.dispatch('getUser',this.user.nickname)
          this.errorMsg=res.msg
          this.isError=true
        }else{
          this.errorMsg=res.msg
          this.isError=true
        }
      })
    },
    addClass(){
      const article = {
        name:this.classtitle,
        creator:this.currentUser._id
      }
      this.$store.dispatch('addClass',article).then((res)=>{
        if(res.success){
          this.$store.dispatch('getClass',this.user._id)
          this.classtitle=''
          this.isAdd=false
        }else{
          this.errorMsg=res.msg
          if(res.errorId=='01'){
            this.errors.add('classtitle','标题不能为空')
          }else if(res.errorId=='02'){
            this.errors.add('classtitle','标题格式错误')
          }
          this.isError=true
        } 
      })
    },
    deleteClass(){
      const id = this.quoteClassId
      this.$store.dispatch('deleteClass',id).then((res)=>{
        if(res.success){
          this.$store.dispatch('getClass',this.user._id)
          this.isModal=false
        }else{
          this.errorMsg=res.msg
          this.isError=true
        }
      })
    },
    updateClass(){
        const article = {
          id:this.quoteClassId,
          name:this.updateClassTitle
        }
        this.$store.dispatch('updateClass',article).then((res)=>{
          if(res.success){
            this.quoteClassTitle=this.updateClassTitle
            this.isUpdateClass=false
            this.$store.dispatch('getClass',this.user._id)
          }else{
            this.errorMsg=res.msg
            if(res.errorId=='01'){
              this.errors.add('updateClassTitle','标题不能为空')
            }else if(res.errorId=='02'){
              this.errors.add('updateClassTitle','标题格式错误')
            }
            this.isError=true
          }
        })
    },
    getQuote(id,title){
      this.$store.dispatch('getQuoteByClass',id).then((res)=>{
        this.quoteClassTitle=title
        this.quoteClassId=id
        this.isModal=true
      })
    },
    publish(){
      if(this.count==0){
        this.errorMsg='内容不能为空'
        this.errors.add('ptext','内容不能为空')
        this.isError=true
        return
      }else if(this.count>160){
        this.errorMsg='内容字数限制为160'
        this.errors.add('ptext','内容字数限制为160')
        this.isError=true
        return
      }
      const quote = {
        title:this.ptitle,
        text:this.ptext,
        author:this.pauthor,
        classId:this.quoteClassId,
        publisherId:this.currentUser._id
      }
      this.$store.dispatch('addQuote',quote).then((res)=>{
        if(res.success){
          this.$store.dispatch('getQuoteByClass',this.quoteClassId)
          this.isPublish=false
          this.ptitle=''
          this.ptext=''
          this.pauthor=''
        }else{
          this.errorMsg=res.msg
          if(res.errorId=='01'){
            this.errors.add('ptitle','标题不能为空')
            this.errors.add('ptext','内容不能为空')
          }else if(res.errorId=='02'){
            this.errors.add('ptitle','标题格式错误')
          }else if(res.errorId=='03'){
            this.errors.add('ptext','内容格式错误')
          }else if(res.errorId=='04'){
            this.errors.add('pauthor','作者格式错误')
          }
          this.isError=true
        }
      })
    },
    deleteQuote(id){
      this.$store.dispatch('deleteQuote',id).then((res)=>{
        if(res.success){
          this.$store.dispatch('getQuoteByClass',this.quoteClassId)
        }else{
          this.errorMsg=res.msg
          this.isError=true
        }
      })
    }
  },
  created(){
    const nickname = this.$route.params.nickname
    this.$store.dispatch('getUser',nickname).then((res)=>{
      this.$store.dispatch('getClass',this.user._id)
    })
  }
}
</script>

<style scoped>
#space{
  height: 100vh;
}
.space{
  display: flex;
  flex-flow: column;
  align-items: center;
} 
h3{
  cursor: pointer;
  transition: all 0.2s ease;
}
h3:hover{
  color: #E5484B;
}
.set{
  display: flex;
  flex-wrap:wrap;
  align-items: center;
  justify-content: center;
  margin:0 0em 0.5em 0em;
}
.more{
  border:1px dashed #000;
  border-radius: 3px;
  padding: 3px 0 3px 0;
  cursor: pointer;
  transition: all 0.2s ease;
}
.more:hover{
  color: #fff;
  background-color: #000;
}
.card{
  height:6em;
  width: 6em;
  float: left;
  text-align: center;
  padding: 0 0.5em 0.5em 0.5em;
  border-radius: 0.5em;
  transition: all 0.2s ease;
  cursor: pointer;
  margin: 5px 0;
}
.card:hover{
  background-color:#efe8d8;
}
#class-title{
  margin: 1.7em auto;
  width:7em;
  height:1.6em;
  font-size: 0.8em;
}

.item{
  width: 80%;
  margin: 0 auto;
  padding: 0 1em;
  text-align: center;
  box-shadow: 0 0 1px;
  display: block;
}
#publish{
  padding-top: 1px;
}
#ptitle,#pauthor{
  margin:0 auto;
  width: 100%;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
}
#ptext{
  margin: 5px auto;
  width: 100%;
  resize: none;
  text-decoration: 0;
  outline: 0;
  height:150px;
  font-size: 1.3em;
}

#updeteTitle{
  margin: 1em auto;
  border-top:0px;
  border-left: 0px;
  border-right: 0px;
  border-radius: 0px;

}
.list-card{
  margin: 0 5em;
  text-align: center;

}

.is-danger{
  border:1px solid #FF5C5C;
}
.tips{
  font-size: 1.3em;
  color: #5C636E;
  font-style:italic;
}
/*模态框*/
.modal-bg{
  width: 100%;
  height: 100%;
  background-color:rgba(0,0,0,0.6);
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  margin: 0 auto;
  z-index: 999;
}
.modal-data{
  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  text-align: center;
  margin: 0 auto;
  padding: 0 0 1em 0;
  width: 80%;
  height: 80%;
  z-index: 999;
  overflow-y: auto;
}
</style>
