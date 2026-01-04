import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ children }) => {
  const userData = useSelector((state) => state.user)
  const navigate = useNavigate()
  
  // Check if user is logged in
  if (!userData._id || !userData.email) {
    toast.error('Access Not Allowed. Please login to continue.')
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Not Allowed</h2>
          <p className="text-gray-700 mb-6">You need to be logged in to access this content.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }
  
  return children
}

export default ProtectedRoute

