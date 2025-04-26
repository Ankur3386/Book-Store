
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCart from '../BookCart/BookCart';
import Loader from '../Loader';

const RecentlyAdded = () => {
  const [data , setData] = useState();
  useEffect(()=>{
    const fetch=async()=>{
     const response= await axios.get('http://localhost:5000/api/v1/get-recent-books')
 
        setData(response.data.books);
      
    };
    fetch();
  },[])
  return (
    <div className='mt-8 px-4 '>
        <h4 className='text-3xl text-yellow-100'> Recently Added Books
            </h4>
            {!data &&<div className='flex items-centre justify-centre my-8'> <Loader/> 
            </div>}
            <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
              
            {data &&data.map((items,i)=>(
            <div key ={i} >
              <BookCart data={items}/>
              </div>
             )) }
            </div>
            </div>
  )
}

export default RecentlyAdded