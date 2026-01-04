import React, { useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";

import toast from 'react-hot-toast';
import { imageToBase64 } from '../../utility/imageTobase64';
const Newproduct = () => {
  const [data,setdata]=useState({
    name:'',
    category:'',
    image:'',
    price:'',
    description:''
  })

  const handleChange=(e)=>{
    const {name,value}=e.target
    setdata((prev)=>{
     return{
      ...prev,
      [name] : value
     }
    })
  }
   const uploadImage=async(e)=>{
      const data=await imageToBase64(e.target.files[0])
     

      setdata((prev)=>{
        return{
          ...prev,
          image:data
        }
      })
   }
   
   
   const handleSubmit =async(e)=>{
    e.preventDefault();
    console.log(data)

    const {name,image,category,price}=data

   if(name && image && category && price){
    const fetchData=await fetch('https://fullstackbookstore-3.onrender.com',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)

  })
  const dataApi=await fetchData.json();
 console.log(dataApi)
 toast(dataApi.message)

 setdata(()=>{
  return{
    name:'',
    category:'',
    image:'',
    price:'',
    description:''
  }
 })
   }
   else{
    toast("Enter required fileds");
   }
   }
 
  return (
    <div className='p-3 sm:p-4 md:p-6'>
     <form className='m-auto w-full max-w-md shadow-lg flex flex-col p-4 sm:p-5 md:p-6 bg-white rounded-lg' onSubmit={handleSubmit}>
      <h2 className='text-xl sm:text-2xl font-bold text-slate-700 mb-4'>Add New Product</h2>
      <label htmlFor='name' className='text-sm sm:text-base font-medium mb-1'>Name</label>
      <input type={'text'} name='name' className='bg-slate-200 p-2 sm:p-2.5 my-1 rounded text-sm sm:text-base focus:outline-blue-300' onChange={handleChange} value={data.name} required></input>
      
      <label htmlFor='category' className='text-sm sm:text-base font-medium mb-1 mt-2'>Category</label>
      <select className='bg-slate-200 p-2 sm:p-2.5 my-1 rounded text-sm sm:text-base focus:outline-blue-300' name="category" id='category'onChange={handleChange} value={data.category} required>
      <option value={"other"}>Select category</option>
      <option value={"Storybook"}>Storybook</option>
        <option  value={"Mythologybook"}>Mythologybook</option>
        <option value={"Knowledgebook"}>Knowledgebook</option>
        <option value={"Horrorbook"}>Horrorbook</option>
        <option value={"Healthbook"}>Healthbook</option>
      </select>

      <label htmlFor="image" className='text-sm sm:text-base font-medium mb-1 mt-2'>Image
      <div className="h-40 sm:h-48 w-full bg-slate-300 rounded flex items-center justify-center cursor-pointer overflow-hidden mt-1 border-2 border-dashed border-slate-400 hover:border-slate-500 transition-colors">
        {
          data.image ?  <img src={data.image} className='w-full h-full object-contain' alt="Product preview"/> : <span className='text-3xl sm:text-4xl text-slate-500'><IoCloudUploadOutline/></span>
        }
       
        
        <input type={"file"} id="image" accept="image/*"onChange={uploadImage} className='hidden' required></input>
      </div>
      </label>
      <label htmlFor='price' className='text-sm sm:text-base font-medium mb-1 mt-2'>Price</label>
      <input type={'text'} className='bg-slate-200 p-2 sm:p-2.5 my-1 rounded text-sm sm:text-base focus:outline-blue-300'name='price' onChange={handleChange} value={data.price} required/>

      <label htmlFor='description' className='text-sm sm:text-base font-medium mb-1 mt-2'>Description</label>
      <textarea rows={3} className='bg-slate-200 p-2 sm:p-2.5 my-1 resize-none rounded text-sm sm:text-base focus:outline-blue-300' name="description"onChange={handleChange} value={data.description}></textarea>
      
      <button className='bg-red-600 hover:bg-red-700 py-2 sm:py-2.5 px-6 text-white mt-4 sm:mt-5 rounded-full text-sm sm:text-base font-medium transition-colors'>Save</button>
     </form>
    </div>
  )
}

export default Newproduct
