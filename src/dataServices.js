
const axios = require('axios')
const url = "https://api.hatchways.io/assessment/students"


export default class DataServices{
    static getPosts(){
        return new Promise((resolve, reject)=>{
            axios(url
            ,{
                method:"GET"
            }
            ).then(posts=>{
                resolve(posts)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}