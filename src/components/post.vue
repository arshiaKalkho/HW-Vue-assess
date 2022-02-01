<template lang="">
    <div class="card">
        <img class="card-image" :src=post.pic />
        <h1 class="card-name">{{post.firstName+" "}}{{post.lastName}}</h1>
        <div>Email: {{post.email}}</div>
        <div>Company: {{post.company}}</div>
        <div>Skill: {{post.skill}}</div>
        <div>Average: {{avg}}%</div>
        <button class="expand-button" v-on:click="toggleExpandState">{{this.expandState}}</button>
        <ul v-if="expandState === '-'">
            <li v-for="(grade,index) in post.grades" :key="index">
                <p>Test{{index+1}}:{{'  '+grade}}%</p>
            </li>
        </ul>
        <ul class="tags" v-if="tags.length != 0">
            <li v-for="(tag,index) in tags" :key="index">
                <p class="tag">{{tag}}</p>
            </li>
        </ul>
        <input class="tag-input" type="text" v-on:keyup.enter="onEnter" v-model="tagToBeAdded" placeholder="add tag"/>
    </div>
</template>
<script>
export default {
    name:"post",
    props:{
        incomingPost:Object,
        parentTagHandler:Function
    },
    data() {
        return {
            avg:0,
            post:{},
            tags:[],
            expandState:"+",
            tagToBeAdded:"",
        }
    },
    created(){
        this.post = this.incomingPost
        this.avg = this.calcAvg()
    },
    updated(){
        this.post = this.incomingPost
        this.tags = this.incomingPost.tags||[]
        this.avg = this.calcAvg()
    }
    ,
    methods: {
        calcAvg(){
            if(this.post.grades.length === 0)
                return 0
            
            let sum = 0
            for(var i =0; i<this.post.grades.length;i++){
                sum += parseInt(this.post.grades[i],10)
            }
            
            return sum / this.post.grades.length;
        },
        toggleExpandState(){
            if(this.expandState === "+"){
                this.expandState = "-"
            }else{
                this.expandState = "+"
            }
        },
        onEnter() {//enter key event listener for adding tags
       
        if(this.tagToBeAdded != ""){
            this.tags.push(this.tagToBeAdded)
            this.tagToBeAdded = "";
            this.parentTagHandler(this.tagToBeAdded, this.post.id)
        }
    }
    },  
}
</script>
<style lang="css">
    .card{
        height:fit-content;
        width:100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        gap: 1rem;
        padding: 4px;
        border: 1px solid grey;
        
    }
    
    .card-image{
        position: absolute;
        width: 11rem;
        height: 11rem;
        object-position: center;
        object-fit: contain;
        border: 1px solid grey;
        border-radius: 50%;
        
    }
    .card-name{
        font-weight: 900;
        color: black;
    }
    .expand-button{
        position: absolute;
        right: 1rem;
        margin-top: 3rem;
        border: none;
        background: none;
        font-size: 4rem;
        color: grey;
    }
    .tags{
        margin-left: 40%;
        list-style-type: none;
    }
    .tags>li{
        float: left;
        background: lightgray;
        margin: 1px;
        padding:2px;
        border-radius: 5px;
    }
    .tag-input{
        width: 5rem;
        text-align: center;
        border: none;
        margin: 0.5rem;
        margin-left: 40%;
        border-bottom: 1px solid grey;
    }
</style>