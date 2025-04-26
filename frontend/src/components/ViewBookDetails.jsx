import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr"
import { FaHeart } from "react-icons/fa"
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux'

const ViewBookDetails = () => {
    const {id} = useParams()
    console.log(id);
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
  
    return (
        <>
        {data && (
            <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start h-[82vh]'>
                <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative bg-zinc-800 rounded-xl p-6 flex justify-center items-center shadow-lg">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="h-[60vh] object-contain rounded-lg"
                            />
                            {isLoggedIn==true && role==="user"}
                            <div className="absolute top-4 right-4 flex flex-col gap-4">
                                <button className="bg-white rounded-full p-3 text-2xl text-red-500 shadow-md">
                                    <FaHeart />
                                </button>
                                <button className="bg-white rounded-full p-3 text-2xl text-blue-500 shadow-md">
                                    <FaShoppingCart />
                                </button>
                            </div>
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