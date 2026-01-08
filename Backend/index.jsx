

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
