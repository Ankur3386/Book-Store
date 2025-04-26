import React from 'react'
import { Link } from 'react-router-dom'

const BookCart = ({data}) => {
    // console.log(data)
  return (
    <> 
    <Link to={`/view-book-details/${data._id}`} > 
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
        <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img src={data.image} alt={data.title} className='w-full h-64  ' />

        </div>
        <h2 className='mt-4 text-xl  font-semibold text-white'>{data.title}</h2>
        <p className="mt-2 text-zinc-200 font-semibold text-xl"> ₹ {data.author}</p>
        <p className="text-zinc-400 text-sm">₹ {data.price}</p>

        </div></Link></>
  )
}

export default BookCart