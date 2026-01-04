import React from 'react'
import { FaBookOpen } from "react-icons/fa6";
const Filterproduct = ({category,onClick}) => {
  return (
    <>
    <div onClick={onClick} className='flex-shrink-0'>
       <div className='text-2xl sm:text-3xl md:text-4xl flex p-3 sm:p-4 md:p-5 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-yellow-500 rounded-full cursor-pointer items-center justify-center hover:bg-yellow-600 transition-colors'>
              <FaBookOpen />
        </div>
        <p className='text-center font-medium my-1 text-xs sm:text-sm md:text-base'>{category}</p>
    </div>
    </>
  )
}

export default Filterproduct
