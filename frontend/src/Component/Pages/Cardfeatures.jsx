import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addCartItem } from '../../redux/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
const Cardfeatures = ({name,image,category,price,loading,id}) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userData=useSelector(state=>state.user)
  const handlecartproduct=(e)=>{
    // e.stopPropagation()
    // Check if user is logged in
    if(!userData._id || !userData.email){
      toast.error('Please login to add items to cart')
      navigate('/login')
      return
    }
    dispatch(addCartItem({
      _id:id,
      name:name,
      price:price,
      category:category,
      image:image,
    }) )
  }

 
  return (
    <div className='min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] bg-white drop-shadow-lg hover:shadow-lg cursor-pointer p-2 sm:p-3 md:p-4 rounded-lg overflow-hidden '>
    {
       image ? <>
       <Link to={`menu/${id}`}>
      <div className='h-32 sm:h-36 md:h-40 w-full flex justify-center items-center overflow-hidden bg-gray-100 rounded-md mb-2'>
       <img src={image} className='h-full w-full object-contain' alt={name}/>
     </div>
     <h3 className='font-semibold text-slate-600 capitalize text-xs sm:text-sm mt-2 sm:mt-3 line-clamp-2'>{name}</h3>
    <p className='text-slate-500 mt-1 font-medium text-[10px] sm:text-xs'>{category}</p>
    <p className="font-bold mt-1 text-xs sm:text-sm"><span className="text-red-600">₹</span>{price}</p>
    </Link>
    <div className='text-center py-2 sm:py-3 md:py-5 mt-2 sm:mt-3 md:mt-5'>
    <button className='bg-yellow-400 hover:bg-yellow-500 w-full sm:w-auto px-3 sm:px-4 cursor-pointer h-7 sm:h-8 rounded-full text-xs sm:text-sm font-medium'
    onClick={handlecartproduct}>Add to Cart</button>
    </div>
    
    </>
    :
    <div className='min-h-[150px] flex justify-center items-center'>
    <p className='text-xs sm:text-sm'>{loading}</p>
    </div>
    } 
    </div>
  )
}

export default Cardfeatures
