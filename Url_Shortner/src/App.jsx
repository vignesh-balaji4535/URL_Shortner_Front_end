import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from './Components/HomePage'
import { Forgot } from './Components/Forgot'
import Get_OTP from './Components/Otp'
import New_pass from './Components/NewPass'
import Register from './Components/Register'
import Login from './Components/Login'

function App() {

  
  const [otp,setOtp]=useState(localStorage.getItem("otp"));
  const [mail,setMail]=useState("");
  const [email,setEmail]=useState("")
  return (

    <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/userLogin" element={<Login/>}/> 
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot setOtp={setOtp} setMail={setMail}/>} />
        <Route path="/otp" element={<Get_OTP otp={otp} setOtp={setOtp} setEmail={setEmail}/>} />
        <Route path="/newpass" element={<New_pass  otp={otp} mail={mail} email={email} setEmail={setEmail}/>} />
 
    </Routes>
    </BrowserRouter>


  )
}

export default App
