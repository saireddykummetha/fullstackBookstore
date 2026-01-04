import { useEffect, useState } from 'react'
import React from 'react'
import './App.css'
import Header from './Component/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setDataproduct } from './redux/productSlice'


function App() {
  const dispatch=useDispatch()
  const productdata=useSelector((state)=>state.product)
 
  useEffect(()=>{
    (async()=>{
      const res=await fetch('https://bookstore-7bu0.onrender.com')
      const resdata=await res.json()
      console.log(resdata)
      dispatch(setDataproduct(resdata))
    })()
    },[])
    console.log(productdata)
  return (
    <>
    <Toaster/>
     <Header/>
     <main className='pt-14 md:pt-16 bg-slate-100 min-h-[calc(100vh)]'>
      <Outlet/>
     </main>
    </>
  )
}

export default App
