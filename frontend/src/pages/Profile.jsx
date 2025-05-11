import React, { useEffect } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const [profile, setProfile] = React.useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/me",
          { headers }
        );
        console.log(response.data);
        setProfile(response.data)
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 text-white">
      {profile && (    <>
    <div className="w-full md:w-1/6 h-auto lg:h-screen ">
        <Sidebar data={profile} />
        <MobileNav/>
      </div>
      <div className="w-5/6">
        <Outlet />
      </div>
   
    </>
    )}
    {!profile && (
      <div className="flex items-center justify-center h-full w-full">

<Loader/>
      </div>
     
    )}
   </div>
  );
};

export default Profile;
