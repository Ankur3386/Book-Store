import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Loader from'../components/Loader'
import { FaUserLarge } from 'react-icons/fa6'

import {  FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SeeUserData from './SeeUserData';


 const AllOrder = () => {
  const [AllOrder, setAllOrder] = useState();
  const [options, setOptions] = useState(-1);
  const [Values,setValues] = useState({status:''})
const [userDiv,setuserDiv]=useState("hidden")
const [userDivData,setUserDivData]=useState()

  const headers = {
        
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        
      };
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/get-all-orders',{headers})
    console.log(response.data.order)
        setAllOrder(response.data.order)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  },[AllOrder])
 const change=(e)=>{
  const {value}=e.target
  setValues({status:value})
 }
 const submitChanges=async(i)=>{
  const id=AllOrder[i]._id ;
  const response = await axios.put(`http://localhost:5000/api/v1/update-status/${id}`,Values,{headers})
  console.log("Hello",response.data)
  alert("Status Updated")
 }
 return (
   <>
   {!AllOrder && ( 
    <div className='flex justify-center items-center h-screen'>
      <Loader/>
    </div>
   )}
 {AllOrder && AllOrder.length > 0 && (
  <div className="h-[100%] p-0 md:p-4 text-zinc-100">
    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">All Orders</h1>

    <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
      <div className="w-[3%]">
        <h1 className="text-center">Sr.</h1>
      </div>
      <div className="w-[40%] md:w-[22%]">
        <h1>Books</h1>
      </div>
      <div className="w-0 md:w-[45%] hidden md:block">
        <h1>Description</h1>
      </div>
      <div className="w-[17%] md:w-[9%]">
        <h1>Price</h1>
      </div>
      <div className="w-[30%] md:w-[16%]">
        <h1>Status</h1>
      </div>
      <div className="w-[10%] md:w-[5%]">
        <h1><FaUserLarge /></h1>
      </div>
    </div>

  {AllOrder.map((items, i) => (
  <div
    key={i}
    className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
  >
    <div className="w-[3%]">
      <h1 className="text-center">{i + 1}</h1>
    </div>

    <div className="w-[40%] md:w-[22%]">
      {items.book ? (
        <Link to={`/view-book-details/${items.book._id}`} className="hover:text-blue-300">
          {items.book.title}
        </Link>
      ) : (
        <span className="text-red-400">Book Deleted</span>
      )}
    </div>

    <div className="w-0 md:w-[45%] hidden md:block">
      <h1>{items.book?.desc ? items.book.desc.slice(0, 50) + '...' : "No description available"}</h1>
    </div>

    <div className="w-[17%] md:w-[9%]">
      <h1>{items.book?.price ? `₹ ${items.book.price}` : "N/A"}</h1>
    </div>

    <div className="w-[30%] md:w-[16%]">
      <h1 className="font-semibold">
       <button
  className={`hover:scale-105 transition-all duration-300 ${
    items.status === "Order placed"
      ? "text-yellow-500"
      : items.status === "Cancelled"
      ? "text-red-500"
      : "text-green-500"
  }`}
  onClick={() => setOptions(i)}
>
  {items.status}
</button>


        <div className={`${options === i ? "block" : "hidden"} flex mt-4 `}>
          <select name="status" className="bg-gray-800" onChange={change} value={Values.status}>
            {["Order placed","Out for delivery","Delivered","Cancelled"].map((item, idx) => (
              <option key={idx} value={item}>{item}</option>
            ))}
          </select>
          <button className="text-green-500 hover:text-pink-600  ml-2"
          onClick={()=>{
            setOptions(-1);
            submitChanges(i)
          }}>
            <FaCheck />
          </button>
        </div>
      </h1>
    </div>

    <div className="w-[10%] md:w-[5%] flex items-center justify-center"
    onClick={()=>{
      setuserDiv("fixed")
      setUserDivData(items.user)
    }}>
      
        <FaExternalLinkAlt />
   
    </div>
  </div>
))}

  </div>
)}
{
  userDivData && (
    <SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv}/>
  )
}


   </>
  )
}
export default AllOrder
