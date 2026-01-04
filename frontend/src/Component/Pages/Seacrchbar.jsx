import React from 'react'

const Seacrchbar = ({loading}) => {
  
  return (
    <div>
       
            <div className='flex flex-wrap cursor-pointer gap-5 justify-center align-center px-10'>
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

export default Seacrchbar
