<template>
  <div class="main">
    <search :parentDataHandler="search"></search>
    <p v-if="error!=''">{{error}}</p>
    <ul class="student-list">
      <li v-for="(post,index) in posts" :key="index">
        <post :parentTagHandler="addTags" :incomingPost="post"></post>
      </li>
    </ul>
  </div>
  
</template>

<script>
import dataServices from "./dataServices"
import post from './components/post.vue'
import search from './components/search.vue'
//updating the array from api was necessary, But with the tag system it wouldn't be possible so we only get the data once put it in referacnePosts and use that as the baseline data, now we can add tags to them and keep the data for saerching with tags. Api data will only be updated on refresh.



export default {
  name: 'App',
  components: {
    post,
    search
  }
  ,
  data() {
    return {
      posts:[],//shown posts
      referancePosts:[],//post to save a clean copy ,only modified to add tags 
      error:''
    }
  },
async created(){
    await this.getData()
  },
  methods:{
    async getData(){
      dataServices.getPosts().then(posts=>{
        this.referancePosts = posts.data.students;
        for(var i in this.referancePosts){//add tags array to all students
          this.referancePosts[i].tags = [];
        }
        this.posts = posts.data.students;
        this.error = "";
        
    }).catch(()=>{//user doesn't need to know the exact error
        this.err = "something went wrong on our side"
    })
    
      
    }
    ,search(searchString,tag){
      this.error="";
      if(searchString==="" && tag ===""){
        this.posts = this.referancePosts
      }else{
      
        this.error ="";//reseting for new search opperation
        this.posts = []
        this.posts = this.referancePosts.filter(post=>{

          var fullName = post.firstName.toLowerCase()+post.lastName.toLowerCase()
          if(fullName.includes(searchString.toLowerCase())){
            return post
          }
          
        })
        if(tag != ""){//tag is present 
          this.posts = this.posts.filter(post=>{
            for(var i = 0; i<post.tags.length;i++){
              if(post.tags[i].includes(tag))
                return post;

            }
          })
        }
        if(this.posts.length === 0)
          this.error = "No Students found"    
      }
    },
    addTags(tag, id){
      if(tag != ''){
      const index = this.referancePosts.findIndex(elem=>elem.id === id)
      this.referancePosts[index].tags.push(tag)
      }
    }
  }
  
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
*{
  margin:0;
  padding:0;
}
.main{
  height: fit-content;
  width: 100%;
  overflow:hidden;

}
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.student-list{
  list-style-type: none;
}
</style>
