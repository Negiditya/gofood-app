import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/Context'
import Cart from '../screens/Cart'


function Navbar() {

  const [showCart, setShowCart] = useState(false)

  const navigate = useNavigate()
  const { cart } = useContext(CartContext)

  const handleLogout = () => {

    localStorage.removeItem("authToken")
    navigate("/login")
  }
  return (
    <>

      {showCart && <Cart onclose = {() => setShowCart(false)} />}
      <nav className="flex items-center justify-between px-6 py-4 bg-green-400 dark:bg-gray-900 shadow-md">
        {/* Left: Logo + Home/My Orders */}

        <div className="flex items-center gap-6">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">GoFood</div>
          <div className="flex gap-6 text-gray-700 dark:text-gray-300 text-[16px] font-medium">
            <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400">Home</Link>
            {localStorage.getItem("authToken") && (
              <Link to="/myorders" className="hover:text-blue-500 dark:hover:text-blue-400">My Orders</Link>
            )}
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="flex gap-4 text-sm font-medium">
          {localStorage.getItem("authToken") ? (
            <>
              <Link
                to=""
                className="relative border px-3 py-1 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-blue-500 hover:text-white transition"
                onClick={()=> setShowCart(true) }
              >
                My Cart
                {cart.length > 0 &&
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                }
              </Link>
              <button
                onClick={handleLogout}
                className="border px-3 py-1 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>

            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border px-3 py-1 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-blue-500 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border px-3 py-1 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-blue-500 hover:text-white transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </>



  )
}

export default Navbar
