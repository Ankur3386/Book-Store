import axios from "axios";
import React, { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import {authActions} from "../store/auth"
import {useDispatch} from "react-redux"

const Login = () => {
  const [values,setvalues] =useState({
   
    email:"",
    password:"",
    
  })
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const change = (e) => {
    const {name,value}=e.target;
    setvalues({...values,[name]:value})
  }
const submit = async (e) => {
  try {
    if(values.email===""||values.password===""){
      alert("Please fill all the fields")
    }else{
      const response =await axios.post(`http://localhost:5000/api/v1/sign-in`,values)
      dispatch(authActions.login())
      dispatch(authActions.changeRole(response.data.user.role))
      
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("id",response.data.user._id)
      localStorage.setItem("role",response.data.user.role)
      console.log(response.data)
      navigate('/profile')
    }
      
  } catch (error) {
    alert(response.data.message);
  }
}
  return (
    <div className="h-[83vh] bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl font-semibold">Login</p>

        <div className="mt-4">
          <label htmlFor="email" className="text-zinc-400">
            Email
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="xyz@example.com"
            name="email"
            required
            value={values.email}
              onChange={change}
          />
        </div>

       
           <div className="mt-4">
          <label htmlFor="password" className="text-zinc-400">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="••••••••"
            name="password"
            required
            value={values.password}
              onChange={change}
          />
        </div>

        <div className="text-right mt-1">
          <span className="text-red-400 text-sm">Please fill out this field.</span>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
            onClick={submit}
          >
            Login
          </button>
        </div>

        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>

        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Don’t have an account?&nbsp;
          <Link to="/signup" className="hover:text-blue-500">
            <u>Sign Up</u>
          </Link>
        </p>

        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          <Link to="/forgot-password" className="hover:text-blue-500">
            <u>Forgot Password?</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
