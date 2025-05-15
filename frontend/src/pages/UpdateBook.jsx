
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
const UpdateBook = () => {
    const {id} = useParams();
    const navigate = useNavigate();
     const [Data, setData] = useState({
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const submit = async () => {
    try {
      const { title, author, price, desc, language } = Data;

     if (!title && !author && !price && !desc && !language && !imageFile) {
  alert("Please provide at least one field to update");
  return;
}

   
      const formData = new FormData();
     if (title) formData.append("title", title);
if (author) formData.append("author", author);
if (price) formData.append("price", price);
if (desc) formData.append("desc", desc);
if (language) formData.append("language", language);
if (imageFile) formData.append("image", imageFile);


      const response = await axios.put("http://localhost:5000/api/v1/update-book", formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);
      navigate(`/view-book-details/${id}`);
      
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
        const fetch = async() => {
            const response = await axios.get(`http://localhost:5000/api/v1/book/${id}`)
            console.log(response.data.book);
            setData(response.data.book);
        };
        fetch();
    }, [])
  return (
    <div className=" bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label className="text-zinc-400">Image</label>
          <input
            type="file"
            className="w-full mt-2 text-zinc-100 p-2 outline-none"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="mt-4">
          <label className="text-zinc-400">Title of book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="title of book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="text-zinc-400">Author of book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="author of book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label className="text-zinc-400">Language</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="language of book"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label className="text-zinc-400">Price</label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="price of book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-zinc-400">Description of book</label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            rows="5"
            placeholder="description of book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  )
}

export default UpdateBook