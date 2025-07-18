import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Context from './context/Context'
import MyOrders from './screens/MyOrders'

function App() {


  return (
    <Context>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/myorders' element={<MyOrders />} />



      </Routes>
    </Context>

  )
}

export default App
