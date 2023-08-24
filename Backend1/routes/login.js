var express = require("express");
var router = express.Router();
var users =require("../model/login")

/* GET users listing. */

// router.get("/", function (req, res, next) {
//   res.send("respond with a hii");
// });

router.post("/l", function (req, res, next) {
    res.send("respond with a hii");
  });
  

//=======post unique=================>

router.post("/s", async function (req, res) {
  try {
    const postuser = new users (req.body);
    await postuser.save();
    res.json({
 status: "user register successfully",

    });
  } catch (e) {
    if (e.code === 11000) {
      res.json({
        status: "user already existed",
        message: "user already existed" ,
      });
    } else {
      res.json({
        status: "error",
        message: e
      });
    }


  }
});

//======================user login============>

router.post("/log", async function (req, res) {
  try {

// let data = await users.findOne({Email:req.body.Email});
//  if(data?.Password === req.body.Password){
//   res.json({
//     status:"success",
//     data:data,
//   })
  
// }
const data= await users.findOne( {Email:req.body.Email});
console.log(data);
if (data?.Password===req.body.Password){
  res.json({
    status:"success",
    data:data,
  })
}


else{
  res.json({
    status:"failure",
    message:"user not found"
  })
}
    // let   data = await users.find({ Email: req.body.Email });
    // if (data?.Password === req.body.Password) {
    //   res.json({
    //     status: "success ",
    //     data:data,
     
    //   });
    // } else {
    //   res.json({
    //     status: "error",
    //     message: "user not found",
    //   });
    // }
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
  }
});

module.exports = router;
