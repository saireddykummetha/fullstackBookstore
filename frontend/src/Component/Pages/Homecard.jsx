import React from 'react'

const Homecard = ({name,image,category,price,loading}) => {
  return (
    <div className="bg-white p-2 sm:p-3 rounded h-72 sm:h-76 md:h-80 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] overflow-hidden shadow-md hover:shadow-lg transition-shadow flex-shrink-0">
     {
        name ? (
        <>
    <div className='w-full h-32 sm:h-36 md:h-40 flex justify-center items-center overflow-hidden bg-gray-100 rounded-md mb-2'>
       <img src={image} className='h-full w-full object-contain' alt={name}/>
     </div>
     <h3 className='mt-2 sm:mt-3 font-semibold text-slate-600 capitalize text-xs sm:text-sm line-clamp-2'>{name}</h3>
    <p className='mt-1 text-slate-700 font-medium text-[10px] sm:text-xs'>{category}</p>
    <p className="mt-1 font-bold text-xs sm:text-sm"><span className="text-red-600">₹</span>{price}</p>
    
    </>
    ):
    <div className='flex justify-center items-center h-full'>
    <p className='text-xs sm:text-sm'>{loading}</p>
    </div>
     }
    </div>
  )
}


export default Homecard
