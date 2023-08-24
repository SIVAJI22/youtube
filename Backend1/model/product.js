const mongoose= require('mongoose')
const  multer=require('multer')
const videoSchema=mongoose.Schema({


    Filename:{
        type:String,
        require:true
    },
   
    

    file:{
        data:Buffer,
        contentType:String
    },
    Description:{
        type:String,
        require:true
    }
  
  

});
const Product=mongoose.model('video',videoSchema)
module.exports=Product;