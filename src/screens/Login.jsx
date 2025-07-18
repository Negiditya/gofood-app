import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



function Login() {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()


    try {
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)


      });

      const data = await response.json();
      
      if (!data.success) {
        alert("please enter correct credentials")
      }
      else if (data.success) {
        localStorage.setItem("authToken", data.authToken )
        
        navigate("/")
      }

    } catch (error) {
      console.error('Error:', error);

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Email</label>
          <input
            required
            value={credentials.email}
            type="email"
            name="email"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            onChange={onChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Password</label>
          <input
            required
            value={credentials.password}
            type="password"
            name="password"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-300">New user? </span>
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login