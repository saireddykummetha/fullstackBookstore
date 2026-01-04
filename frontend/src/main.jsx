
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'

import { createBrowserRouter,createRoutesFromElements,Route, RouterProvider } from 'react-router-dom'
import Login from './Component/Pages/Login.jsx'
import Newproduct from './Component/Pages/Newproduct.jsx'
import Signup from './Component/Pages/Signup.jsx'
import { Provider } from'react-redux';
import { store } from './redux/index.jsx'
import Home from './Component/Pages/Home.jsx'
import Menu from './Component/Pages/Menu.jsx'
import Cart from './Component/Pages/Cart.jsx'
import SearchProduct from './Component/Pages/SearchProduct.jsx'
import ProtectedRoute from './Component/ProtectedRoute.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route  element={<App/>}>
    <Route path='/'element={<Home/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='menu/:filterby' element={<Menu/>}/>
    <Route path='newproduct' element={<ProtectedRoute><Newproduct/></ProtectedRoute>}/>
    <Route path='signup' element={<Signup/>}/>
    <Route path='cart' element={<Cart/>}/>
    <Route path='search' element={<SearchProduct/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
)
