import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
const Sidebar = ({ data }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
    <div className=" bg-zinc-800 p-4 flex flex-col items-between justify-center text-center h-auto lg:h-[100%]">
    
     <div className="flex flex-col items-center justify-center">
     <img
        src={data.user.avatar}
        alt="User"
        className="w-20 h-20 rounded-full object-cover mb-2"
      />

      <p className="mt-3 text-xl text-zinc-100 font-semibold">{data.user.username}</p>

      <p className="mt-1 text-normal text-zinc-300">{data.user.email}</p>

     
      <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>

     </div>
     
      <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Settings
        </Link>
      </div>
      <button
  className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded transition-all hover:bg-zinc-800"
 onClick={() => {
  dispatch(authActions.logout());
  dispatch(authActions.changeRole("user"));
  localStorage.clear("id");
  localStorage.clear("token");
  localStorage.clear("role");
  navigate("/");
}}>
  Log Out
  <FaArrowRightFromBracket className="ms-4" />
</button>
    </div>
  );
};

export default Sidebar;
