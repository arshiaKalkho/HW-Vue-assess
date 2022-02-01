<template lang="">
    <div>
        <input v-model=searchString v-on:input="parentDataHandler(searchString,tagString)" class="search-bar" type="text" placeholder="Search Names" />
        <input v-model=tagString v-on:input="parentDataHandler(searchString,tagString)" class="search-bar" type="text" placeholder="Search Tags" />
    </div>
</template>
<script>
export default {
    name:"search",
    props:{
        parentDataHandler:Function
    },
    data() {
        return {
            searchString:"",
            tagString:""
        }
    },
    updated(){
        if(this.searchString==="" && this.tagString ===""){
            this.parentDataHandler("")
        }
    }

}
</script>
<style lang="css">
    .search-bar{
        text-align: center;
        width: 100%;
        height: 2rem;
        font-size: 1.3rem;
    }
</style>