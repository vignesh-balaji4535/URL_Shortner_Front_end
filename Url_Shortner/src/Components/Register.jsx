import React, { useState } from 'react';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"


const Register = () =>{ 
  const [sipnner,setSpinner]=useState(false)
  const [err,setErr]=useState('')
    const navigate=useNavigate();
    // const [userinput,setUserinput]=useState({ })

    
    return (
    
  
      <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh" }}>
      <div className=' rounded-5 p-2' style={{backgroundColor:"rgb(190, 189, 189)",width:"25rem",boxShadow:"25px 25px 25px black"}}>
   <h3 style={{fontFamily:"serif"}}>USER REGISTRATION</h3>
    <Formik
      initialValues={{ username:'', email: '', password: '' }}
      validate={values => {
        const errors = {};


        if(!values.password){
          errors.password="Required"
        }

        if(!values.username){
          errors.username="Required"
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          console.log("error")
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSpinner(true);
        setSubmitting(false);

          try {
            let response =await axios.post("https://url-shortner-a1ie.onrender.com/api/user/register",values)
            console.log(response);
            localStorage.setItem("user_key",response.data.UserToken)

            localStorage.setItem("user_data",response.data.new_user._id)

            if(response.data.UserToken){
            navigate("/")
            }

          } catch (error) {
            console.log(error)
            setSpinner(false)
            
        if(error.response.status===404){
          setErr(error.response.data)
        }
        else{
          console.log(error.response)
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
           <input
            type="username"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            autoComplete='username'
            placeholder='Enter your Name'
          />
          <p style={{color:"red",fontSize:"12px",marginBottom:"0"}}>{errors.username && touched.username && errors.username}</p>

          <br />

          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            autoComplete='email'
            placeholder='Enter you E-mail'
          />
          <p style={{color:"red",fontSize:"12px",marginBottom:"0"}}>{errors.email && touched.email && errors.email} {err}</p>

          <br />          

          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            autoComplete='current-password'
            placeholder='Password'
          />
<p style={{color:"red",fontSize:"12px",marginBottom:"0"}}>
{errors.password && touched.password && errors.password}
</p>
          <br />

          <button className='btn btn-success' type="submit" disabled={isSubmitting}>
            Register {sipnner&&<div className="spinner-border text-light mx-2 " role="status"  style={{width:"20px",height:"20px"}}>
  <span className="visually-hidden">Loading...</span>
</div>}
          </button>
        </form>
      )}
    </Formik>
    <p>or</p>
    <dir className="px-0">
    <p className='d-inline'>If already registered ?<Link to='/userLogin' style={{textDecoration:"none",color:"blue"}}>Log in </Link></p> 
    </dir>
  </div>
  </div>
)};

export default Register;