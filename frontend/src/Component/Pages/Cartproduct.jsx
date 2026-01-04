import React from 'react'
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { useDispatch } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { deleteCartItem ,increaqty,decreaqty} from '../../redux/productSlice'
const Cartproduct = ({id,name,price,image,category,total,qty,description}) => {
  
  const dispatch=useDispatch();
  return (
    <div className='bg-slate-200 p-2 sm:p-3 flex flex-col sm:flex-row gap-3 sm:gap-4 rounded border border-slate-300 mb-3'>
      <div className='bg-white rounded overflow-hidden w-full h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 flex justify-center items-center'>
       <img src={image} className='w-full h-full object-contain' alt={name}/>
      </div>

      <div className='flex flex-col gap-1 w-full'>
        <div className='flex justify-between items-start'>
      <h3 className='font-semibold text-slate-600 capitalize text-base sm:text-lg md:text-xl lg:text-2xl px-2 sm:px-5 flex-1'>{name}</h3>
      <div className='cursor-pointer py-2 sm:py-4 text-xl sm:text-2xl text-slate-700 hover:text-red-700 flex-shrink-0'onClick={()=>dispatch(deleteCartItem(id))}>
         <MdDelete/>
      </div>
      </div>
    <p className='text-slate-500 font-medium text-sm sm:text-base px-2 sm:px-5 pt-1 sm:pt-3'>{category}</p>
    <p className="font-bold text-sm sm:text-base px-2 sm:px-3"><span className="text-red-600">₹</span>{price}</p>
    
    <div className='px-2 sm:px-5 text-sm sm:text-base'>
        <span className='font-medium'>Description:</span>
        <p className='text-slate-500 text-xs sm:text-sm'>{description}</p>
     </div>
     <div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-0'>
    <div className='flex gap-3 items-center px-2 sm:px-5 pt-2'>
    <button onClick={()=>dispatch(increaqty(id))}className='bg-slate-400 hover:bg-slate-500 p-1 sm:p-1.5 cursor-pointer rounded text-sm sm:text-base'><GoPlus/></button> 
    <p className='font-semibold text-sm sm:text-base'>{qty}</p>   
    <button onClick={()=>dispatch(decreaqty(id))} className='bg-slate-400 hover:bg-slate-500 p-1 sm:p-1.5 cursor-pointer rounded text-sm sm:text-base'><LuMinus/></button>    
     </div>
     
     <div className='flex items-center gap-2 font-bold text-slate-700 text-sm sm:text-base px-2 sm:px-5'>
      <p>Total:</p>
      <p><span className="text-red-600">₹</span>{total}</p>
     </div>
     </div>
     </div>
    </div>
  )
}

export default Cartproduct
