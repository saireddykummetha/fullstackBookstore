import React, { useEffect, useState } from 'react'
import Homecard from './Homecard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cardfeatures from './Cardfeatures'
import toast from 'react-hot-toast'

import Filterproduct from './Filterproduct';


const Home = () => {
  const productData=useSelector((state)=>state.product.productList)
  const searchQuery=useSelector((state)=>state.product.searchQuery)
  const userData=useSelector((state)=>state.user)
  const navigate=useNavigate()
  // console.log(productData)
  const homeproductcartlist=productData.slice(1,50)
  const homeproductcartlistcartlist=productData.filter(el=>el.category==='Mythologybook',[1])
  // console.log(homeproductcartlistcartlist);
  const loadingArray=new Array(8).fill(null)
  const loadingArrayFeature=new Array(10).fill(null)
  
  const categoryList=[...new Set(productData.map(el=>el.category))]
  // console.log(categoryList);

 
  const [datafilter,setdatafilter]=useState([])

useEffect(()=>{
  if(searchQuery){
    // Filter products based on search query
    const filtered=productData.filter(el=>
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (el.description && el.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setdatafilter(filtered)
  } else {
    setdatafilter(productData)
  }
},[productData, searchQuery])

  const handlefilterproduct=(category)=>{
    // Check if user is logged in before filtering
    if(!userData._id || !userData.email){
      toast.error('Please login to filter books')
      navigate('/login')
      return
    }
    const filter=productData.filter(el=>el.category.toLowerCase()===category.toLowerCase())
    setdatafilter(()=>{
   return[
      ...filter
     ]
    })
  }
  return (
    <div className="p-2 sm:p-3 md:p-4">
      {/* Search Results Section - Only show if user is logged in */}
      {searchQuery && userData._id && userData.email && (
        <div className='mb-4 sm:mb-6'>
          <h2 className='font-bold text-base sm:text-lg md:text-xl px-2 sm:px-5 text-slate-800 mb-3 sm:mb-4'>
            Search Results for "{searchQuery}" ({datafilter.length} {datafilter.length === 1 ? 'book' : 'books'})
          </h2>
          <div className='flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 py-3 sm:py-5'> 
            {
              datafilter.length > 0 ? (
                datafilter.map(el=>{
                  return(
                    <Cardfeatures
                         key={el._id}
                         id={el._id}
                          image={el.image}
                          name={el.name}
                          price={el.price}
                          category={el.category}
                    />
                  )
                })
              ) : (
                <div className='w-full text-center py-6 sm:py-8'>
                  <p className='text-gray-600 text-sm sm:text-base md:text-lg'>No books found matching your search.</p>
                </div>
              )
            }
          </div>
        </div>
      )}

      {/* Regular Content - Only show when not searching */}
      {!searchQuery && (
        <>
          <div className='my-2 sm:my-3'>
            <h2 className='font-bold text-sm sm:text-base md:text-lg px-2 sm:px-5 text-slate-800'>FILTER YOUR BOOK</h2>
          </div>
          <div className='flex gap-3 sm:gap-5 md:gap-10 justify-center overflow-x-auto pb-2 scrollbar-hide px-2 sm:px-0'>
            {
              categoryList[0] && categoryList.map((el, index)=>{
                return(
                  <Filterproduct key={index} category={el} onClick={()=>handlefilterproduct(el)}/>
                )
              })
            }
          
          </div>
           
           <div className='flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 py-3 sm:py-5'> 
            {
              datafilter.map(el=>{
                return(
                  <Cardfeatures
                       key={el._id}
                       id={el._id}
                        image={el.image}
                        name={el.name}
                        price={el.price}
                        category={el.category}
                  />
                )
              })
            }
           </div>
        </>
      )}
   
   <div className="py-2 sm:py-3 justify-center align-center mr-20">
        <div className='flex items-center px-2 sm:px-5'>
        <h2 className='font-bold text-sm sm:text-base md:text-lg text-slate-800'>POPULAR SELLING BOOKS</h2>
       
        </div>
        
          <div className='flex gap-2 sm:gap-3 md:gap-4 py-3 sm:py-5 overflow-x-auto scrollbar-hide px-2 sm:px-0 ml-20' >
            {
              homeproductcartlistcartlist[0]? homeproductcartlistcartlist.map(el=>{
                return(
                  <Cardfeatures
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                  />
                );
              })
              :loadingArrayFeature.map((el,index)=>{
                return(
                 <Homecard
                 key={index}
                 loading={"Loading..."}
                 />
                )
              })
            }      
        </div>
     </div>

      <div className="py-3 sm:py-5">
      <h2 className="text-base sm:text-lg md:text-xl font-bold px-4 sm:px-6 md:px-10">Popular Categories in <span className='text-blue-700'>books</span></h2>
      </div>
      <div className='flex flex-wrap cursor-pointer gap-3 sm:gap-4 md:gap-5 justify-center align-center px-2 sm:px-4 md:px-10'>
      {
        homeproductcartlist[0] ? homeproductcartlist.map(el=>{
          return(
            <Homecard
            key={el._id}
            id={el._id}
            image={el.image}
            name={el.name}
            price={el.price}
            category={el.category}
            />
          )
        })
        :loadingArray.map((el,index)=>{
          return(
           <Homecard
           key={index}
           loading={"Loading..."}
           />
          )
        })
      }
     </div>

  
    </div>
  )
}

export default Home
