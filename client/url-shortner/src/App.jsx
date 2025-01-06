import './App.css'
import { Route, Routes } from "react-router-dom";
import  Login  from './pages/common/Login';
import SignUp from './pages/common/SignUp';
import URLList from './pages/user/Dashboard';
import URLShortener from './pages/user/HomePage';


function App() {

  return (
    <>
 <Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<SignUp/>}/>
  <Route path='/Dashboard' element={<URLList/>}/>
  <Route path='/list' element={<URLShortener/>}/>

 </Routes>
    </>
  )
}

export default App
