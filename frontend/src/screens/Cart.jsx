import React, { useContext } from 'react'
import { CartContext } from '../context/Context'




function Cart({ onclose }) {


  const { cart, setCart } = useContext(CartContext)

  const removeItem = (idx) => {
    setCart(cart.filter((_, i) => i !== idx))


  }

  const totalCartPrice = cart.reduce((total, food) => total + food.totalPrice, 0);

  const handleSubmit = async () => {

    try {



      const orderData = { cart, orderDate: new Date().toISOString() }
      
      let response = await fetch(`${import.meta.env.VITE_API_URL}/api/ordersData`, {
        method: "post",
        headers: {
          'content-type': 'application/json',
          'auth-token': localStorage.getItem("authToken")
        },
        body: JSON.stringify(orderData)
      })
      response = await response.json()
      setCart([])
      if (response.success) {
        
      }
      else {
        console.log(response.error)
      }




    } catch (error) {
      console.log(error)

    }


  }


  return (
    <div className="fixed inset-0 bg-transparent flex justify-center items-center px-2 py-6 z-50 ">
      <div className="bg-[#0f172a] text-white rounded-lg w-[95%] h-[90vh] relative overflow-auto flex flex-col  shadow-2xl border border-gray-700">

        {/* Header */}
        <div className="bg-slate-800 px-6 py-4 flex justify-between items-center rounded-t-lg shadow-md">

          <h2 className="text-3xl font-bold text-white tracking-wide">
            GoFood - Home - My Orders
          </h2>

          <button onClick={onclose}
            className="w-8 h-8 flex  justify-center text-white bg-red-600 hover:bg-red-700 rounded-full text-xl font-bold">
            ×
          </button>

        </div>


        {/* Table Section */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="overflow-x-auto">
            <table className="w-full text-lg table-auto border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-700">
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold text-lg">#</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold text-lg">Name</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold text-lg">Quantity</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold text-lg">Size</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold text-lg">Amount</th>
                  <th className="py-4 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((food, idx) =>

                  <tr key={idx + 1} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                    <td className="py-4 px-4 text-gray-400">{idx + 1}</td>
                    <td className="py-4 px-4 text-gray-300">{food.name}</td>
                    <td className="py-4 px-4 text-gray-300">{food.qty}</td>
                    <td className="py-4 px-4 text-gray-300">{food.size}</td>
                    <td className="py-4 px-4 text-gray-300">{food.totalPrice}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => removeItem(idx)}
                        className="text-gray-400 hover:text-red-400 transition-colors text-xl">🗑️</button>
                    </td>
                  </tr>

                )}
              </tbody>
            </table>

          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 px-8 py-5 flex justify-between items-center rounded-b-lg">
          <h3 className="text-2xl font-bold">Total Price: {totalCartPrice}/-</h3>
          <button onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
            Check Out
          </button>
        </div>

      </div>
    </div>



  )
}

export default Cart