import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export const Forgot = ({setOtp ,setMail}) =>{ 
    const navigate = useNavigate();
   const [err,setErr]=useState('')
    
const [sipnner,setSpinner]=useState(false)
  return  (  
  <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
    <div className=' rounded-5 p-2' style={{backgroundColor:"rgb(190, 189, 189)",width:"25rem",boxShadow:"25px 25px 25px black"}}>
<h3 style={{fontFamily:"serif"}}>Password Reset</h3>
<br />
    <Formik
     initialValues={{ email: '' }}
     validate={values => {
       const errors = {};

       if (!values.email) {
         errors.email = 'Required';
       } else if (
         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
       ) {
         errors.email = 'Invalid email address';
       }
       return errors;
     }}
    
      onSubmit={async(values) => {
        // same shape as initial values
        setSpinner(true);


try {
  const response =await axios.post("https://url-shortner-a1ie.onrender.com/api/user/forgot_pass",values)


  if(response){
    console.log(response)

    localStorage.setItem('otp',response.data.otp_token);
    
    setOtp(response.data.token)
    setMail(response.data.email)
    navigate("/otp");
  }

} catch (error) {
  setSpinner(false);

  if(error.response.status===401){
setErr(error.response.data)
  }
  console.log(error)

}}}
    >
              {({ errors, touched }) => (

        <Form>
          <Field name="email" type="email" placeholder="Enter your Email"/>
          
          <p style={{color:"red",fontSize:"12px",marginBottom:"0"}}>{errors.email && touched.email && errors.email} {err}</p>

          <br />
          <br />
          <button className='btn btn-primary' type="submit"  >
        Verify Email & Get OTP {sipnner&&<div className="spinner-border text-light mx-2 " role="status"  style={{width:"20px",height:"20px"}}>
  <span className="visually-hidden">Loading...</span>
</div>}
          </button>
        </Form>

      )}
    </Formik>
    </div>
  </div>
)};