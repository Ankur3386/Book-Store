import React, { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Loader from '../components/Loader'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr"
import { FaHeart } from "react-icons/fa"
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux'

const ViewBookDetails = () => {
    const {id} = useParams()
    
    const [data, setData] = useState();
     const isLoggedIn=useSelector((state)=>state.auth.isloggedIn)
     const role =useSelector((state)=>state.auth.role)

    useEffect(() => {
        const fetch = async() => {
            const response = await axios.get(`http://localhost:5000/api/v1/book/${id}`)
            console.log(response.data.book);
            setData(response.data.book);
        };
        fetch();
    }, [id])
    const headers = {
        bookid: id,
        id: localStorage.getItem("id"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        
      };
      console.log(headers.Authorization)

  const handleFavourite = async() => {
const response = await axios.put(`http://localhost:5000/api/v1/add-book-to-favourite`,{},{headers})
alert(response.data.message)

  }
  const handleCart = async() => {
    const response = await axios.put(`http://localhost:5000/api/v1/add-to-cart`,{},{headers})
    alert(response.data.message)
  }
    return (
        <>
        {data && (
            <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start h-[82vh]'>
                <div className="w-full md:w-1/2 flex items-center justify-center">
                        <div className="relative bg-zinc-800 rounded-xl p-6 flex flex-col lg:flex-row justify-center items-center shadow-lg">
                            <img
                                src={data.image}
                                alt={data.title}
                                className=" h-[60vh] md:h-[60vh] lg:h[70vh] object-contain rounded-lg"
                            />
                            {isLoggedIn==true && role==="user" && (
                            <div className="absolute top-4 right-4 flex flex-col  md:flex-row lg:flex-col items-center justify-between lg:justify-start gap-4">
                                <button className="bg-white rounded lg:rounded-full p-3 text-3xl text-red-500 shadow-md"
                                onClick={handleFavourite}>
                                    <FaHeart />   <span className='ms-4 block lg:hidden'> Favourite </span>
                                </button>
                                <button className="bg-white  rounded mt-8 md:mt-0 lg:rounded-full p-3  lg:mt-8 text-2xl text-blue-500 flex items-center justify-center"
                                onClick={handleCart}>

                                <FaShoppingCart />    <span className='ms-4 block lg:hidden'> Add To Cart  </span>
                                </button>
                            </div>
                            )}
                              {isLoggedIn==true && role==="admin" && (
                            <div className="absolute top-4 right-4 flexflex-col  md:flex-row lg:flex-col items-center justify-between lg:justify-start gap-4">
                                <button className="bg-white rounded lg:rounded-full p-3 text-3xl  shadow-md">
                                <FaEdit />  <span className='ms-4 block lg:hidden'> Edit  </span>
                                </button>
                                <button className="bg-white  rounded lg:rounded-full p-3 mt-8 md:mt-0 lg:mt-8 text-2xl text-red-500  flex items-center justify-center">
                                <MdDelete />   <span className='ms-4 block lg:hidden'> Delete Book  </span>
                                </button>
                            </div>
                            )}
                        </div>
                    </div>
                <div className='p-4 w-full lg:w-3/6'>
                    <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1>
                    <p className="text-zinc-400 mt-1">by {data.author}</p>
                    <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
                    <p className="flex mt-4 items-center justify-start text-zinc-400">
                        <GrLanguage className="me-3" /> {data.language}
                    </p>
                    <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                        Price : ₹ {data.price}{" "}
                    </p>
                </div>
            </div>
        )}
        {!data && (
            <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader/></div>
        )}
        </>
    )
}

export default ViewBookDetails