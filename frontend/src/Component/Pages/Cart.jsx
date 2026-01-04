import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cartproduct from './Cartproduct'
import toast from 'react-hot-toast'

const Cart = () => {
    const productcart=useSelector((state)=>state.product.cartItem)
    const userData=useSelector((state)=>state.user)
    const navigate=useNavigate()
    
    useEffect(()=>{
      // Check if user is logged in
      if(!userData._id || !userData.email){
        toast.error('Please login to view your cart')
        navigate('/login')
      }
    },[userData, navigate])
    
    // Don't render cart if not logged in
    if(!userData._id || !userData.email){
      return null
    }
    
    console.log(productcart)
  return (
    <>
    
    <div className='p-2 sm:p-3 md:p-4'>
      <h2 className='text-base sm:text-lg md:text-2xl font-bold text-slate-600 px-2 sm:px-0'>Your Cart Item</h2>
       <div className='my-3 sm:my-4'>
        <div className='w-full max-w-2xl mx-auto'>
           {
            productcart.length > 0 ? (
              productcart.map(el=>{
                return(
                 <Cartproduct
                 key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                qty={el.qty}
                total={el.total}
                 />
                )
              })
            ) : (
              <div className='text-center py-8'>
                <p className='text-gray-600 text-sm sm:text-base'>Your cart is empty</p>
              </div>
            )
           }
        </div>
       </div>
    </div>
    </>
  )
}

export default Cart
