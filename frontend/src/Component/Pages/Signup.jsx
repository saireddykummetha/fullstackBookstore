import React, { useState } from 'react'
import { BiShow,BiHide } from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom';
import login from '../../assets/login-animation.gif'
import  { toast} from 'react-hot-toast';
import { imageToBase64 } from '../../utility/imageTobase64';
const Signup = () => {
  const navigate=useNavigate(true);
   const [showpassword,setshowpassword]=useState(false);
   const [showconfirmpassword,setconfirmpassword]=useState(false);
   const [data,setdata]=useState({
   firstName:"",
   lastName:"",
   email:"",
   password:"",
   confirmpassword:"",
   image:""
  });
  console.log(data);
   const handlepassword=()=>{
    setshowpassword(prev=>!prev)
   }
   const handleconfirmpassword=()=>{
    setconfirmpassword(prev=>!prev)
   }
   const handleOnchange=(e)=>{
     const{name,value}=e.target
     setdata((prev)=>{
      return{
        ...prev,
        [name]:value
      }
     })
   }

   const handleuploadprofile=async(e)=>{   
    const data=await imageToBase64(e.target.files[0])
    console.log(data)
    setdata((prev)=>{
      return{
       ...prev,
        image:data
      }
    })
   }

  const handleSubmit=async(e)=>{
  e.preventDefault();
  const {firstName,email,password,confirmpassword}=data
  if(firstName && email && password && confirmpassword){
     if(password === confirmpassword){
      const fetchData = await fetch('https://bookstore-2txs.onrender.com',{
        method : "post",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      const dataApi=await fetchData.json();
      console.log(dataApi);
        // alert(dataApi.message)
        toast(dataApi.message);
       
        if(dataApi.alert){
        navigate('/login')
        }
     }
     else{
      alert("password and confirm password not equal")
     }
  }
  }

  
  return (
    <div className="p-3 sm:p-4 md:p-6">
       <div className="max-w-full sm:max-w-sm bg-white m-auto flex-col p-4 sm:p-6 rounded-lg shadow-md">
          
           <div className='w-14 h-14 sm:w-16 sm:h-16 overflow-hidden rounded-full drop-shadow-md m-auto shadow-md relative'>
            
            <img src={data.image ? data.image : login} className='w-full h-full object-cover' alt="Profile"/>
            <label htmlFor='profileImage'>
           <div className='absolute bottom-0 h-1/3 bg-slate-400 bg-opacity-20 w-full text-center cursor-pointer'>
            <p className='text-[10px] sm:text-xs text-white'>Upload</p>
           </div>
           <input type={"file"} id="profileImage" accept="image/*" className='hidden'onChange={handleuploadprofile} required/>
           </label>
           </div>
           <form className="w-full py-3 sm:py-4 flex flex-col"onSubmit={handleSubmit}>
            <label htmlFor='firstName' className='text-sm sm:text-base font-medium mb-1'>First Name</label>
            <input type='text' id="firstName" name='firstName' className='w-full mb-3 sm:mb-4 mt-1 border-none focus-within:outline-blue-300 bg-slate-200 p-2 sm:p-2.5 rounded text-sm sm:text-base'
            value={data.firstName} onChange={handleOnchange} required></input>
            <label htmlFor='lastName' className='text-sm sm:text-base font-medium mb-1'>Last Name</label>
            <input type='text' id="lastName" name='lastName' className='w-full border-none focus-within:outline-blue-300 mb-3 sm:mb-4 mt-1 bg-slate-200 p-2 sm:p-2.5 rounded text-sm sm:text-base'
            value={data.lastName} onChange={handleOnchange} required></input>
            <label htmlFor='email' className='text-sm sm:text-base font-medium mb-1'>Email</label>
            <input type='email' id="email" name='email' className='w-full mb-3 sm:mb-4 mt-1 border-none focus-within:outline-blue-300 bg-slate-200 p-2 sm:p-2.5 rounded text-sm sm:text-base'
            value={data.email}onChange={handleOnchange} required></input>
            <label htmlFor='password' className='text-sm sm:text-base font-medium mb-1'>Password</label>
            <div className="flex p-2 sm:p-2.5 rounded bg-slate-200 mb-3 sm:mb-4 mt-1 focus-within:outline focus-within:outline-blue-300">
            <input type={showpassword ? "text":'password'}id="password" name='password' className='w-full outline-none bg-slate-200 text-sm sm:text-base'
            value={data.password}onChange={handleOnchange} required></input>         
           <span className='flex text-xl sm:text-2xl cursor-pointer' onClick={handlepassword}>{showpassword ?<BiShow/> : < BiHide/>}</span>
           </div>
           <label htmlFor='confirmpassword' className='text-sm sm:text-base font-medium mb-1'>Confirm Password</label>
            <div className="flex p-2 sm:p-2.5 rounded bg-slate-200 mb-3 sm:mb-4 mt-1 focus-within:outline border-none focus-within:outline-blue-300">
            <input type={showconfirmpassword ? "text":'password'}id="confirmpassword" name='confirmpassword' className='w-full outline-none bg-slate-200 text-sm sm:text-base'
            value={data.confirmpassword}onChange={handleOnchange} required></input>         
           <span className='flex text-xl sm:text-2xl cursor-pointer' onClick={handleconfirmpassword}>{showconfirmpassword ?<BiShow/> : < BiHide/>}</span>
          
           </div>
           <button className='bg-red-600 cursor-pointer px-3 mt-4 sm:mt-6 max-w-[200px] sm:max-w-[250px] m-auto w-full py-2 sm:py-2.5 hover:bg-red-700 text-white rounded-full text-sm sm:text-base font-medium'>Signup</button>
           </form>
           <p className="text-xs sm:text-sm text-center mt-2">Already have account ?<Link to={"/login"} className='text-red-600 underline ml-1'>Login</Link></p>
       </div>
    </div>
  )
}

export default Signup

