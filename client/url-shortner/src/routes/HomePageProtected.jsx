

import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom'



function HomePageProtect() {


   const [isloading,setIsLoading]=useState(true)
   const [status,setStatus]=useState(false)
   const states=useSelector((state)=>state.userStatus.userAuthStatus)
   

   useEffect(()=>{
      setIsLoading(false)
      setStatus(states)
   },[])

   if(isloading){
      return <div>...loading</div>
   }

  return (
    <div>
      {status?<Outlet/>:<Navigate to={"/login"}/>}
    </div>
  )


}

export default HomePageProtect



