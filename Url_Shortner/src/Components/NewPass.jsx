import React, { useState } from 'react'
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from "axios"



const New_pass = ({otp,email,setEmail}) => {

  const [errpass,setErrpass]=useState("");
  const [sipnner,setSpinner]=useState(false)
  const navigate = useNavigate()

  
  return (
    
    <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
    <div className=' rounded-5 p-2' style={{backgroundColor:"rgb(190, 189, 189)",width:"25rem",boxShadow:"25px 25px 25px black"}}>
   
  <h4 style={{fontFamily:"serif"}}>CREATE NEW PASSWORD</h4>
  <Formik
    initialValues={{ password: '' }}
    validate={values => {
      const errors = {};
      if(!values.password){
        errors.password="Required"
      }
      return errors;
    }}
    onSubmit={ async(values ) => {
      setSpinner(true);
    console.log(otp)
        const pass=values.password;
        console.log(pass)
     try {
      let response =await axios.post(`https://url-shortner-a1ie.onrender.com/api/user/forgot_pass/${otp}/new_pass`,{password:values.password})
     
      console.log(response)
      navigate("/userLogin")

    } catch (error) {
      setSpinner(false);
      console.log(error)

      if(error.response.status===404){
        setErrpass(error.response)
      }

   
    }
        
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      /* and other goodies */
    }) => (
      <form onSubmit={handleSubmit}>
       
      
     
         <br />
         <br />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          autoComplete='current-password'
          placeholder='Enter New Password'

        />
        {errors.password && touched.password && errors.password}
        <p style={{color:"red",fontSize:"12px",marginBottom:0}}>{errpass}</p>
        <br />
      
        <br />
        <button className='btn btn-primary' type="submit" disabled={isSubmitting} >
          Login {sipnner&&<div className="spinner-border text-light mx-2 " role="status"  style={{width:"20px",height:"20px"}}>
<span className="visually-hidden">Loading...</span>
</div>}
        </button>
      </form>
    )}
  </Formik>


</div>
</div>
  )
}

export default New_pass