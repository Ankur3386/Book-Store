import { useEffect, useState } from "react";
import axios from "axios";
import Loader from '../Loader'
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  


  
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/my-orders",
          {headers}
        );
        setOrderHistory(response.data.orders);
       
      } catch (error) {
        console.error("Error fetching order history:", error);
      } 
    };
    
    fetch();
  }, []);

  return (
    <>
      {!orderHistory &&  (
        <div className="flex items-center justify-center h-[100%]">
          <Loader />
        </div>
      ) }
{orderHistory && orderHistory.length > 0 && (
  <div className="h-[100%] p-0 md:p-4 text-zinc-100">
    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
      Your Order History
    </h1>

   
    <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
      <div className="w-[3%]">
        <h1 className="text-center">Sr.</h1>
      </div>
      <div className="w-[22%]">
        <h1>Books</h1>
      </div>
      <div className="w-[45%]">
        <h1>Description</h1>
      </div>
      <div className="w-[9%]">
        <h1>Price</h1>
      </div>
      <div className="w-[16%]">
        <h1>Status</h1>
      </div>
      <div className="w-none md:w-[5%] hidden md:block">
        <h1>Mode</h1>
      </div>
    
  </div>


          
         {orderHistory.map((items, i) => (
        <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
          <div className="w-[3%] text-center">
            <h1>{i + 1}</h1>
          </div>
          <div className="w-[22%]">
            <Link to={`/view-book-details/${items.book._id}`} className="hover:text-blue-300">
              {items.book.title}
            </Link>
          </div>
          <div className="w-[45%]">
            <h1>{items.book.desc.slice(0, 50)}...</h1>
          </div>
          <div className="w-[9%]">
            <h1>₹ {items.book.price}</h1>
          </div>
          <div className="w-[16%]">
            <h1 className="font-semibold text-green-500">
              {items.status === "Order placed" ? (
                <div className="text-yellow-500">{items.status}</div>
              ) : items.status === "Canceled" ? (
                <div className="text-red-500">{items.status}</div>
              ) : (
                items.status
              )}
            </h1>
          </div>
          <div className="w-none md:w-[5%] hidden md:block">
            <h1 className="text-sm text-zinc-400">COD</h1>
          </div>
        </div>
      ))}
    </div>
  )
}
    </>
  );
};

export default UserOrderHistory;