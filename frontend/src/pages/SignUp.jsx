import axios from "axios";
import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [values,setvalues] =useState({
    username:"",
    email:"",
    password:"",
    address:""
  })
  const navigate = useNavigate();
  const change = (e) => {
    const {name,value}=e.target;
    setvalues({...values,[name]:value})
  }
const submit = async (e) => {
  try {
    if(values.username===""||values.email===""||values.password===""||values.address===""){
      alert("Please fill all the fields")
    }else{
      const response =await axios.post(`http://localhost:5000/api/v1/sign-up`,values)
      console.log(response)
      navigate('/login')
    }
      
  } catch (error) {
    alert(response.data.message);
  }
}
  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <div>
            <label htmlFor="username" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={values.username}
              onChange={change}

            />
          </div>
        </div>
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
        <div className="mt-4">
          <label htmlFor="address" className="text-zinc-400">
            Address
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            rows="5"
            placeholder="address"
            name="address"
            required
            value={values.address}
              onChange={change}
          />
        </div>
        <div className="mt-4">
          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600" onClick={submit}>
            SignUp
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Already have an account? &nbsp;
          <Link to="/login" className="hover:text-blue-500">
            <u>LogIn</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;