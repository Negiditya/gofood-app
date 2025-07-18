import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/Context'

function Card({ food }) {
  let options = food.options[0]
  let priceOptions = Object.keys(options)



  const [qty, setQty] = useState(1)
  const [size, setSize] = useState(priceOptions[0])

  const totalPrice = qty * parseInt(options[size])

  // my logic

  const { cart, setCart } = useContext(CartContext)




  const addToHandleClick = () => {
    let foodItem = { id: food._id, qty, size, totalPrice, img: food.img, name: food.name }
    const idx = cart.findIndex((cartItem) => cartItem.id === foodItem.id && cartItem.size === foodItem.size)


    if (idx !== -1) {
      const updatedCart = [...cart]; 
      updatedCart[idx] = {
        ...updatedCart[idx],
        qty: updatedCart[idx].qty + foodItem.qty,
        totalPrice: updatedCart[idx].totalPrice + foodItem.totalPrice,
      };

      setCart(updatedCart); 
      return;
    }





    setCart([...cart, foodItem])

  }







  return (
    <div className="max-w-sm border-2 mt-2 rounded-xl shadow">
      <img
        className="w-full h-40 object-cover rounded-t-xl"
        src={food.img}
        alt="Food"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{food.name}</h2>
        <p className="text-sm text-gray-600">
          {food.description}
        </p>
      </div>

      <div className="p-4">
        <select className="mb-2 p-2 bg-green-500 text-white rounded" onChange={(e) => setQty(parseInt(e.target.value))}>
          {Array.from(Array(6), (e, i) => {
            return (
              <option value={i + 1} key={i + 1}>{i + 1}</option>
            );
          })}
        </select>
        <select className="mb-2 p-2 ml-2 bg-green-500 text-white rounded" onChange={(e) => setSize(e.target.value)}>
          {priceOptions.map((data) => <option key={data} value={data}>{data}</option>)}
        </select>
        <div className="text-sm font-medium">Total Price: ₹{totalPrice}</div>
        <button
          onClick={addToHandleClick}
          className="mt-2 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition">
          Add to Cart
        </button>
      </div>
    </div>


  )
}

export default Card