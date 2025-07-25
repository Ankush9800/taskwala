import { Login } from '@/pages'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'


function ProtectedRoute({children}) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const checkAuth = async ()=>{
      try {
        const admin = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getadmin`,{
          withCredentials : true
        })
        setIsAuthenticated(true)
      } catch (error) {
        console.log("admin not found");
        setIsAuthenticated(false)
      }finally{
        setLoading(false)
      }
    }

    checkAuth()
  },[])

  if (loading) {
    return <div className="text-center mt-10 text-white">Checking access...</div>;
  }

  return isAuthenticated? children : <Navigate to="/login"/>
}

export default ProtectedRoute