import React, { useState } from 'react'
import login from '../../assets/login-animation.gif'
import { BiShow,BiHide } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../../redux/userSlice';



const Login = () => {
   const [showpassword,setshowpassword]=useState(false);
 
   const [data,setdata]=useState({
   email:"",
   password:"",
  
  });
  console.log(data); 
   const handlepassword=()=>{
    setshowpassword(prev=>!prev)
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
   const navigate=useNavigate()
   const userData=useSelector(state=>state)
   
   const dispatch=useDispatch()
   
  const handleSubmit=async(e)=>{
  e.preventDefault();
  const {email,password}=data
  
  if(!email || !password){
    toast.error("Please enter email and password")
    return
  }

  try {
    const fetchData = await fetch('https://fullstackbookstore-3.onrender.com',{
      method : "post",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    
    const dataApi=await fetchData.json();
    console.log(dataApi);
    
    if(dataApi.alert && dataApi.data){
      // Success - show success message
      toast.success(dataApi.message || "Login successfully")
      // Dispatch login data to Redux
      dispatch(loginRedux(dataApi));
      // Navigate to home page
      navigate("/");
    } else {
      // Error - show error message
      toast.error(dataApi.message || " Please check your credentials.")
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Network error. Please try again later.")
  }
  }
  return (
    <div className="p-3 sm:p-4 md:p-6">
       <div className="max-w-full sm:max-w-sm bg-white m-auto flex-col p-4 sm:p-6 rounded-lg shadow-md">
           <div className='w-14 h-14 sm:w-16 sm:h-16 overflow-hidden rounded-full drop-shadow-md m-auto shadow-md'>
            <img src={login} className='w-full h-full object-cover' alt="Login"/>
           </div>
           <form className="w-full py-3 sm:py-4 flex flex-col"onSubmit={handleSubmit}>
            <label htmlFor='email' className='text-sm sm:text-base font-medium mb-1'>Email</label>
            <input type='email' id="email" name='email' className='w-full mb-3 sm:mb-4 mt-1 border-none focus-within:outline-blue-300 bg-slate-200 p-2 sm:p-2.5 rounded text-sm sm:text-base'
            value={data.email}onChange={handleOnchange} required></input>
            <label htmlFor='password' className='text-sm sm:text-base font-medium mb-1'>Password</label>
            <div className="flex p-2 sm:p-2.5 rounded bg-slate-200 mb-3 sm:mb-4 mt-1 focus-within:outline focus-within:outline-blue-300">
            <input type={showpassword ? "text":'password'}id="password" name='password' className='w-full outline-none bg-slate-200 text-sm sm:text-base'
            value={data.password}onChange={handleOnchange} required></input>         
           <span className='flex text-xl sm:text-2xl cursor-pointer' onClick={handlepassword}>{showpassword ?<BiShow/> : < BiHide/>}</span>
           </div>
          
           <button className='bg-red-600 cursor-pointer px-3 mt-4 sm:mt-6 max-w-[200px] sm:max-w-[250px] m-auto w-full py-2 sm:py-2.5 hover:bg-red-700 text-white rounded-full text-sm sm:text-base font-medium'>Login</button>
           </form>
           <p className="text-xs sm:text-sm text-center mt-2">Don't have account ?<Link to={"/signup"} className='text-red-600 underline ml-1'>Signup</Link></p>
       </div>
    </div>
  )
}

export default Login;
