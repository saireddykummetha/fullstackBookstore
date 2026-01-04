import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { setSearchQuery } from '../redux/productSlice';
import toast from 'react-hot-toast';


const Header = () => {
  
    const [showmenu,setshowmenu]=useState(false);
    const [searchInput, setSearchInput] = useState('');
    const userData=useSelector((state)=>state.user)
    const searchQuery=useSelector((state)=>state.product.searchQuery)
    const navigate=useNavigate()
    console.log(userData.email);
 const dispatch=useDispatch()

    // Sync search input with Redux state
    useEffect(()=>{
      setSearchInput(searchQuery)
    },[searchQuery])

    const handlelogout=()=>{
      dispatch(logoutRedux())
      dispatch(setSearchQuery('')) // Clear search on logout
      toast("logout successfully")
    }
    const handleshowmenu=()=>{
        setshowmenu(prev=>!prev)
      }

      const cartItemsNumber=useSelector((state)=>state.product.cartItem)

      const handleSearch=(e)=>{
        e.preventDefault();
        // Check if user is logged in before searching
        if(!userData._id || !userData.email){
          toast.error('Please login to search books')
          navigate('/login')
          return
        }
        if(searchInput.trim()){
          dispatch(setSearchQuery(searchInput.trim()));
          // Navigate to home to show search results
          if(window.location.pathname !== '/'){
            navigate('/');
          }
        } else {
          // Clear search if input is empty
          dispatch(setSearchQuery(''));
        }
      }

      const handleSearchChange=(e)=>{
        const value=e.target.value;
        // Check if user is logged in before searching
        if(!userData._id || !userData.email){
          toast.error('Please login to search books')
          setSearchInput('');
          navigate('/login')
          return
        }
        setSearchInput(value);
        // Update search query in real-time
        dispatch(setSearchQuery(value.trim()));
        // Navigate to home if not already there
        if(value.trim() && window.location.pathname !== '/'){
          navigate('/');
        } else if(!value.trim()){
          // Clear search when input is empty
          dispatch(setSearchQuery(''));
        }
      }

      const handleLogoClick=()=>{
        // Clear search when clicking logo
        dispatch(setSearchQuery(''));
        setSearchInput('');
      }

      const handleCartClick=(e)=>{
        // Check if user is logged in before accessing cart
        if(!userData._id || !userData.email){
          e.preventDefault();
          toast.error('Please login to view your cart')
          navigate('/login')
        }
      }

     
  return (
    <header className="shadow-md bg-white fixed w-full z-40">
      <div className="h-14 md:h-16 container mx-auto flex items-center px-2 sm:px-4 justify-between gap-2">
        <div className="flex-shrink-0">
           <Link to={'/'} className='font-bold text-sm sm:text-base md:text-lg' onClick={handleLogoClick}>BOOKSTORE</Link>
        </div>

        {/* Desktop Search Bar */}
        {userData._id && userData.email ? (
          <form onSubmit={handleSearch} className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-2'>
                  <input 
                    type='text' 
                    placeholder='What are you looking for?' 
                    className='w-full outline-none px-2 text-sm' 
                    value={searchInput}
                    onChange={handleSearchChange}
                  />
                  <button type='submit' className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer hover:bg-red-700'>
                    <IoSearch />
                  </button>
            </form>
        ) : (
          <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-2' onClick={() => {
            toast.error('Please login to search books')
            navigate('/login')
          }}>
            <input 
              type='text' 
              placeholder='Login to search books...' 
              className='w-full outline-none px-2 text-sm cursor-pointer' 
              readOnly
            />
            <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
              <IoSearch />
            </div>
          </div>
        )}

          {/* Mobile Search Bar */}
          {userData._id && userData.email ? (
            <form onSubmit={handleSearch} className='lg:hidden flex items-center flex-1 max-w-xs border rounded-full focus-within:shadow pl-2 mx-1'>
                    <input 
                      type='text' 
                      placeholder='Search...' 
                      className='w-full outline-none px-2 text-xs sm:text-sm' 
                      value={searchInput}
                      onChange={handleSearchChange}
                    />
                    <button type='submit' className='text-base sm:text-lg min-w-[35px] sm:min-w-[40px] h-7 sm:h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer hover:bg-red-700'>
                      <IoSearch />
                    </button>
              </form>
          ) : (
            <div className='lg:hidden flex items-center flex-1 max-w-xs border rounded-full pl-2 mx-1 bg-gray-100 cursor-not-allowed' onClick={() => {
              toast.error('Please login to search books')
              navigate('/login')
            }}>
              <input 
                type='text' 
                placeholder='Login to search...' 
                className='w-full outline-none px-2 text-xs sm:text-sm bg-gray-100 cursor-pointer' 
                readOnly
              />
              <div className='text-base sm:text-lg min-w-[35px] sm:min-w-[40px] h-7 sm:h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                <IoSearch />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-10 flex-shrink-0">
        <div className='text-xl sm:text-2xl md:text-3xl text-slate-600 relative'>
          <Link to={'cart'} onClick={handleCartClick}>
        <IoCart />
        <div className='absolute -top-1 -right-1 text-white bg-red-600 h-4 w-4 rounded-full m-0 text-xs text-center flex items-center justify-center'>{cartItemsNumber.length}</div>
        </Link>
        </div>
        <div className="text-slate-600 relative" onClick={handleshowmenu}>
        <div className='text-xl sm:text-2xl md:text-3xl cursor-pointer w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden flex items-center justify-center'>        
        {
        userData.image?<img src={userData.image} className='h-full w-full object-cover' alt="User"/>:<FaRegUserCircle />
        }
        </div>
         {
            showmenu &&  (<div className='absolute right-0 top-10 sm:right-2 bg-white px-2 py-1 shadow-lg drop-shadow-lg flex flex-col gap-1 min-w-[120px] rounded border'>
          {
            userData.email===`sai@gmail.com`&& <Link  to={"newproduct"}className='whitespace-nowrap cursor-pointer text-sm px-2 py-1 hover:bg-gray-100 rounded'>New product</Link>
          }
         {
        userData._id && userData.email ? (
          <p className="cursor-pointer text-white bg-red-600 px-3 py-1 rounded text-sm" onClick={handlelogout}>
            Logout{userData.firstName ? `(${userData.firstName})` : ''}
          </p>
        ) : (
          <Link to={"login"} className='whitespace-nowrap cursor-pointer text-sm px-2 py-1 hover:bg-gray-100 rounded'>Login</Link>
        )
         } 
         </div>
         )}
        
        </div>
     </div>

      </div>
    </header>
  )
}

export default Header
