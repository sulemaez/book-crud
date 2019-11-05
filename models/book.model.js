
const moongoose = require('mongoose')
const Schema = moongoose.Schema 


let BookSchema = new Schema({
    isbn : {
        type : String, required : true ,
    },
    title : {
        type : String, required : true ,
    },
    author : {
        type : String, required : true ,
    },
    year :{
        type : Number, required : true ,
    },
    amount : {
        type : Number, required : true ,
    }
})

module.exports = moongoose.model('Book',BookSchema)