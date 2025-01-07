import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'




function LoginAndRegistrationProtoect() {

  const [isloading,setIsLoading]=useState(true)
  const [authStatus,setAuthStatus]=useState(false)
  const states=useSelector((state)=>state.userStatus.userAuthStatus)

  useEffect(()=>{
    console.log(states)
    setIsLoading(false)
    setAuthStatus(states)
  },[])

  if(isloading){
    return <div>...loading</div>
  }

  return (
    <div>
       {!authStatus?<Outlet/>:<Navigate to={"/"}/>}
    </div>
  )
}

export default LoginAndRegistrationProtoect
