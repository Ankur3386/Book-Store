import React, { useState ,useEffect} from 'react'
import BookCart from '../components/BookCart/BookCart'
import Loader from '../components/Loader'
import axios from 'axios';

const AllBooks = () => {
  const [data , setData] = useState();
    useEffect(()=>{
      const fetch=async()=>{
       const response= await axios.get('http://localhost:5000/api/v1/books')
   
          // console.log("Hello",response.data.books);
          setData(response.data.books);
        
      };
      fetch();
    },[])
  return (
    <div className='bg-zinc-900 py-8 h-auto px-12 '>  <h4 className='text-3xl text-yellow-100'> Recently Added Books
    </h4>
    {!data &&(<div className='w-full h-screen flex items-center justify-center'> <Loader /></div>) 
    }
    <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
      
    {data &&data.map((items,i)=>(
    <div key ={i} >
      <BookCart data={items}/>
      </div>
     )) }
    </div></div>
  )
}

export default AllBooks