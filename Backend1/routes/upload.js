const bodyParser = require('body-parser');
const express=require('express')
const router= express.Router();
const app= express();
const multer= require('multer');
const path=require('path');
const cors= require('cors');
const { log } = require('console');

const uploadvideo=require('../model/product')

// app.use(express.static('./public'));
app.use(express.static( './public'));
app.use(bodyParser.json());

app.use(cors())

//use of multer  package


    const storage=  multer.diskStorage({
        destination:(req,file,cb)=>    {
            cb(null,req.body(uploadvideo))

        },
        filename:(req,file,cb)=>{
            cb(null,file.fieldname+"_"+Date.now()+ path.extname (  file.originalname)   )
        }
    });
    

let maxsize= 5 * 1000 * 1000
const upload=  multer({ 
    storage:storage,
    limits:{
        fileSize:maxsize
    }
    })


let uploadHandler =upload.single('file');


router.post('/U',(req,res)=>{


    uploadHandler(req,res, function(err){
        if(err instanceof multer.MulterError){
if(err.code='LIMIT_FILE_SIZE'){
    
    res.status(400).json({message: "Maximum File size is 5mb"});
}
return;}
       
        if(!req.file){
            res.status(400).json({message:"No file!"});
        }
        else if( req.file=true){
            res.status(200).json({message:"File Uploaded"})

        } 
    })

    const uploaddata= new uploadvideo(uploadHandler);
    uploaddata.save()

});


// })
module.exports = router;

// const PORT =process.env.PORT || 8000;
// app.listen(PORT,()=>{

//     console.log(`server is running ${PORT}`)
// })
// module.exports = router;
