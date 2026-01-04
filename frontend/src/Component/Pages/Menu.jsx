import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { addCartItem } from '../../redux/productSlice'
import toast from 'react-hot-toast'

const Menu = () => {
    const {filterby}=useParams()
    
    const productData=useSelector(state=>state.product.productList)
    const productDisplay=productData.filter(el=>el._id===filterby)[0]
    console.log(productDisplay)
    const userData=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handlecartproduct=(e)=>{
        // e.stopPropagation()
        // Check if user is logged in
        if(!userData._id || !userData.email){
          toast.error('Please login to add items to cart')
          navigate('/login')
          return
        }
        dispatch(addCartItem(productDisplay) )
      }
  return (
    <div className='p-2 sm:p-4'>
     <div className='w-full max-w-3xl mt-4 sm:mt-6 md:mt-10 m-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden'>
      <div className='w-full md:w-1/2 h-64 sm:h-80 md:h-auto flex justify-center items-center bg-gray-200 overflow-hidden'>
        <img src={productDisplay?.image} className='w-full h-full object-contain hover:scale-105 transition-transform duration-300 p-3 sm:p-4' alt={productDisplay?.name}/>
        
      </div>
      <div className='w-full md:w-1/2 p-4 sm:p-5 md:p-8 flex flex-col justify-between'>
      <div>
      <h3 className='font-semibold text-slate-600 capitalize text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2'>{productDisplay?.name}</h3>
    <p className='text-slate-500 font-medium text-sm sm:text-base mb-2 sm:mb-3'>{productDisplay?.category}</p>
    <p className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4"><span className="text-red-600">₹</span>{productDisplay?.price}</p>
    
    <div className='mb-3 sm:mb-4'>
        <p className='font-semibold text-slate-700 mb-1 sm:mb-2 text-sm sm:text-base'>Description:</p>
        <p className='text-slate-500 text-xs sm:text-sm md:text-base'>{productDisplay?.description}</p>
     </div>
     </div>
    <div className='text-center py-3 sm:py-4'>
    <button className='bg-yellow-400 hover:bg-yellow-500 w-full md:w-auto px-6 sm:px-8 cursor-pointer h-9 sm:h-10 rounded-full font-semibold transition-colors text-sm sm:text-base'onClick={handlecartproduct}>Add to Cart</button>    
     </div>
     
     </div>
     </div>
    </div>
  )
}

export default Menu
