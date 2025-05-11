import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const BookCart = ({ data, favourite }) => {
  const headers = {
    bookid: data._id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/remove-from-favourites",
        {},
        { headers }
      );
      console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.error("Error removing book:", error);
      alert("Failed to remove book from favourites.");
    }
  };

  return (
    <div className='m-3 bg-zinc-800 rounded p-4 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-zinc-900 rounded flex items-center justify-center'>
          <img src={data.image} alt={data.title} className='h-[25vh]' />
        </div>
        <h2 className='mt-4 text-xl text-white font-semibold'>{data.title}</h2>
        <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
        <p className='mt-2 text-zinc-200 font-semibold text-xl'>₹ {data.price}</p>
      </Link>

      {favourite && (
        <button
          className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4'
          onClick={handleRemoveBook}
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default BookCart;
