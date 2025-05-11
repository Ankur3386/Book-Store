import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCart/BookCart";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
   
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/get-favourites",
        { headers }
      );
      setFavouriteBooks(response.data.favourites);
    };
    fetch();
    
  }, [favouriteBooks]);

  return (
    <>
     {favouriteBooks&&favouriteBooks.length === 0 && <div className="text-white text-2xl justify-center item-centre">No favourite books found</div>}
    <div className="grid grid-cols-4">
     
      {favouriteBooks &&
        favouriteBooks.map((items, i) =>
         <div key={i}>
         <BookCard data={items} favourite={true}/>
         </div>
         )
         }
    </div>
    </>
  );
};

export default Favourites;