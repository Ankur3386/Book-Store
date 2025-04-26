import { useState } from 'react'
import Navbar from './components/Navbar'
import { Home } from './pages/Home'
import Footer from './components/Footer'
import { Route, Router, Routes } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails'
import { authActions } from './store/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Favourites from './components/Profile/Favourites'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Setting from './components/Profile/Setting'

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <>
    
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} >
      <Route index element={<Favourites/>} />
      {/* index means route  profile pa jate hi  favourites ha */}
      <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
      <Route path="/profile/settings" element={<Setting />} />

      </Route>
      <Route path="/all-books" element={<AllBooks />} />
      <Route path="/view-book-details/:id" element={<ViewBookDetails/>} />

      </Routes>

<Footer />

    </>
  )
}

export default App
