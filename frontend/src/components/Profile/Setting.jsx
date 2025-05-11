import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/me",
        { headers }
      );
    
      setProfileData(response.data.user);
      setValue({ address: response.data.user.address });
    };
    fetch();
  }, []);
   const change = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  const submitAddress = async () => {
    const response = await axios.put(
      "http://localhost:5000/api/v1/update-profile",
      { address: value.address },
      { headers }
    );
    if (response.status === 200) {
      setValue({ address: response.data.address });
      alert("Address updated successfully");
    } else {
      alert("Error updating address");
    }
  }
  return (
  
     <>
      {!profileData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profileData && (
        <div className="h-[100%] p-6 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div className="">
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div className="">
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400"
            onClick={submitAddress}>
              Update
            </button>
          </div>
        </div>
      )}
    </>
  )
};

export default Settings;