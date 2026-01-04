const express=require("express");
const bcrypt=require("bcryptjs");
const userModel=require("../models/Usersmodel");
const productModel=require("../models/Productmodel");
const jwt=require("jsonwebtoken")
const router=express.Router();

// signup
router.post('/signup', async (req, res)=>{
   try{
     const { email, password, image } = req.body;
     console.log("req.body",req.body);
     
     // Validate input
     if(!email || !password){
        return res.status(400).json({ 
           message: "Email and password are required", 
           alert: false 
        });
     }
     
      // Validate image
     if(!image){
        return res.status(400).json({ 
           message: "Upload your profile image", 
           alert: false 
        });
     }
     // Check if user already exists
     const User=await userModel.findOne({email: email});
     
     if(User){
        return res.status(400).json({ 
           message: "Email id is already registered", 
           alert: false 
        });
     }

    

     // Hash password
     const hashPassword=await bcrypt.hash(password,10);
     
     // Create user data with hashed password
     const userData={
        ...req.body,
        password:hashPassword
     }
     
     const UserData=new userModel(userData);
     await UserData.save();
     
     res.status(201).json({
        message: "Successfully signed up",
        alert: true
     })
   }catch(err){
       console.log("Signup error:", err);
       res.status(500).json({
         message: "Server error",
         alert: false
       })
   }
})


// login
router.post('/login',async(req,res)=>{
   try{
      const { email,password } = req.body;
      console.log(req.body);
      
      // Validate input
      if(!email || !password){
         return res.status(400).json({ 
            message: "Email and password are required", 
            alert: false 
         });
      }

      // Find user by email
      const User=await userModel.findOne({email: email});
      
      if(!User){
         return res.status(401).json({ 
            message: "Invalid email", 
            alert: false 
         });
      }

      // Check password
      const checkPassword=await bcrypt.compare(password,User.password);
      
      if(!checkPassword){
         return res.status(401).json({ 
            message: "Invalid password", 
            alert: false 
         });
      }

      // Prepare user data to send
      const datasend = {
         _id: User._id,
         firstName: User.firstName,
         lastName: User.lastName,
         email: User.email,
         image: User.image
      };

      // Send success response with user data
      res.status(200).json({
         message: "Login successfully",
         alert: true,
         data: datasend
      });
      
   }catch(err){
      console.log("Login error:", err);
      res.status(500).json({
         message: "Server error",
         alert: false
      });
   }
})

//save products
router.post("/uploadProduct",async(req,res)=>{
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload successfully"})
})

// get data

router.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})
module.exports = router