const bodyParser = require('body-parser');
const express=require('express')
const router= express.Router();
const app= express();
const multer= require('multer');
const path=require('path');
const cors= require('cors');
const { log } = require('console');
const  fs =require('fs')

app.use(express.static('./public'));
app.use(bodyParser.json());

const Uploadvideo=require('../model/product');
const { FILE } = require('dns');
/* GET home page. */
router.get('/video', async function(req, res, next) {
try{
    const  data= await Uploadvideo.find()
    res.json(data)
}

catch(er){
    res.json({
        message:er
    })
}
 
});




router.post('/image', async(req,res)=>{
    const body=req.body;
    try{
        const newImage= await Uploadvideo.create(body)
    newImage.save();
res.status(201).json({ msg:"new image uploaded..!"})    }
catch(e){
res.status(409).json({message: e.message})
}
})


router.post('/siva',(req,res)=>{
    console.log(req.body);
res.json({
    data: req.body,

    status:"success"
});
})

const storage=  multer.diskStorage({
    destination:(req,file,cb)=>    {
      

         cb(null, "./public/images")

    },
    
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+ path.extname (  file.originalname)  )
    }
});


// let maxsize= 1*100*100
const upload=  multer({ 
storage:storage,
// limits:{
//     fileSize: 1 * 1000 * 1000
// }
})


// router.post('/g', async function(req,res){
//     try{
// //         const newItem= await new uploadHandler();
// //         newItem.inputfile.data=fs.readFileSync(req.body.path)
// // newItem.inputfile.contentType=String;
// // newItem.save();

//         // var newItem = new uploadHandler();
//         // newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//         // newItem.img.contentType = 'image/png';
//         // newItem.save();
//         res.json(req.body)
//         res.json({
//             message:'hiiiiii',
//             status:"success"
//         })
//     }
// catch(e){
// res.json({
//     message:e,
//     status:'failure'
// })
// }
//   });

router.post('/Us',upload.single('file'),(req,res)=>{

   
                
        
   
                if(!req.file){
                    res.status(400).json({message:"No file!"});
                }
else{

    const  newImage= Uploadvideo({
        Filename:req.body.Filename,
        Description:req.body.Description,
        file:{
            data:fs.readFileSync("public/images",req.file.filename),
            contentType:'image/png,'
        }
    });
 newImage.save()
 .then((res)=>{
    console.log('image is saved')
 })
 .catch((err)=>{
    console.log(err,'there is a error');
 })
}
})

let uploadHandler =upload.single("file")

router.post('/U',(req,res)=>{
   
  
    uploadHandler(req,res, function(err){
        if(err instanceof multer.MulterError){
console.log(err);
res.json(req.body)
        

        

if(err.code='LIMIT_FILE_SIZE'){
    
    res.status(400).json({message: "Maximum File size is 5mb"});
}
return;
}
       
        if(!req.file){
            res.status(400).json({message:"No file!"});
        }
        else{

            const newImage =new Uploadvideo ({
                Filename:req.body.Filename,
                Description:req.body.Description  ,
             
                file:{
                    data:   req.file.filename,
                    contentType:'image/png,mp4'
                },
             
            })
            console.log(req.body.description);
            console.log(req.body.Filename);
            console.log(req.file.filename)
            newImage.save().then(()=> res.send('successfully uploaded')).catch((err)=>console.log(err))

            res.status(200).json({message:"File Uploaded"})

        } 
        
        
        
    })
    })




module.exports = router;
