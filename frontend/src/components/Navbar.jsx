import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];
const isLoggedIn=useSelector((state)=>
  state.auth.isloggedIn)
// connsole.log(isLoggedIn)
if(isLoggedIn==false){
  links.splice(2,3)
}
  return (
    <>
      <nav className="relative z-50 flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
            className="h-10 mr-4"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
  {links.map((item, i) => (
    item.title === "Profile" ? (
      <Link
        to={item.link}
        className="text-white text-xl border border-blue-500 px-4 py-2"
        key={i}
      >
        {item.title}
      </Link>
    ) : (
      <Link
        to={item.link}
        className="hover:text-blue-500 transition-all duration-300"
        key={i}
      >
        {item.title}
      </Link>
    )
  ))}
  
  {isLoggedIn === false && (
    <>
      <Link to='/login' className="text-white text-xl border border-blue-500 px-4 py-2" onClick={() => setMenuOpen(false)}>SignIn</Link>
      <Link to='/signup' className="text-white text-xl bg-blue-500 px-4 py-2" onClick={() => setMenuOpen(false)}>SignUp</Link>
    </>
  )}
</div>

        {/* Mobile Menu Icon */}
        <button
          className='md:hidden text-white text-2xl hover:text-zinc-400'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaGripLines />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden bg-zinc-800 absolute top-0 left-0 w-full h-screen z-40 flex flex-col items-center justify-center gap-6'>
          {links.map((item, i) => (
            <Link
              to={item.link}
              className="text-white text-3xl font-semibold hover:text-blue-500 transition-all duration-300"
              key={i}
              onClick={() => setMenuOpen(false)} // Close on link click
            >
              {item.title}
            </Link>
          ))}
{
         isLoggedIn===false &&<>
                   <Link to='/login' className="text-white text-xl border border-blue-500 px-4 py-2" onClick={() => setMenuOpen(false)}>SignIn</Link>
                   <Link to='/signup' className="text-white text-xl bg-blue-500 px-4 py-2" onClick={() => setMenuOpen(false)}>SignUp</Link></>
}
        </div>
      )}
    </>
  );
};

export default Navbar;
