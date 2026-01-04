// const bcryptjs =require ("bcryptjs");
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv=require("dotenv");
// dotenv.config();
// const app = express({limit:'100mb'});

// app.use(cors());
// app.use(express.json());


// mongoose.connect(process.env.MONGODB_URL)
// .then(()=>{
//        console.log('MongoDB connected');
//     })
//     .catch(()=>{
//     console.log('MongoDB error')});
  

//   const userSchema=new mongoose.Schema({
//    firstName:String,
//    lastName:String,
//    email:String,
//    password:String,
//    confirmpassword:String,
//    image:String
// })
// const userModel=mongoose.model('users',userSchema);  


// app.get('/',(req,res)=>{
//     res.status(200).send('Server is running');
// })


//    app.post('/signup', async (req, res) => {
//     const { email,image } = req.body;
//     try {
//       const result = await userModel.findOne({ email: email });
//       console.log(result);
//       // if(!image){
//       //   res.send({message:"upload your image"});
//       // }
//       if (result) {
//         res.send({ message: "Email id is already register", alert: false });
//       } else {
//         const data = new userModel(req.body);
//         await data.save(); 
//         res.send({ message: "Successfully sign up", alert: true });
//       }
  
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ message: "Server error", alert: false });
//     }
//   });

//   app.post('/login', async (req, res) => {
//     console.log(req.body);
//     const { email,password } = req.body;
  
//     try {
//       const result = await userModel.findOne({ email: email,password:password});
  
//       if (result) {
//         console.log(result);
//         const datasend = {
//           _id: result._id,
//           firstName: result.firstName,
//           lastName: result.lastName,
//           email: result.email,
//           image: result.image
//         };
//         console.log(datasend);
//         res.send({ message: "Login successfully", alert: true, data: datasend });
//       } else {
//         res.send({ message: "Email not found", alert: false });
//       }
  
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ message: "Server error", alert: false });
//     }
//   });
  
// //product section
  
// const schemaProduct = mongoose.Schema({
//   name: String,
//   category:String,
//   image: String,
//   price: String,
//   description: String,
// });
// const productModel = mongoose.model("product",schemaProduct)
    
//   //save product in data 
 
//   app.post("/uploadProduct",async(req,res)=>{
//     console.log(req.body)
//    const data = await productModel(req.body)
//    const datasave = await data.save()
//    res.send({message : "Upload successfully"})
// })

// //data
// app.get("/product",async(req,res)=>{
//   const data = await productModel.find({})
//   res.send(JSON.stringify(data))
// })

// const PORT = process.env.PORT || 8080;
// app.listen(PORT,(res,req)=>{
//     console.log(`Server is running on http://localhost:${PORT}`);
// })

const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();
const cors=require("cors");
const router=require('./Routes')
const app = express({limit:'100mb'});

app.use(express.json());
app.use(cors());

app.use('/',router)

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("mongoDB connected"))
.catch(err=>console.log("mongoDB error"));
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`)
})