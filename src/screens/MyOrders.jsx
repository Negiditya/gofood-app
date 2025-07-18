import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function OrderHistory() {
    const [ordersData, setOrdersData] = useState([]);

    const fetchMyOrders = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/myorders", {
                method: "get",
                headers: {
                    "auth-token": localStorage.getItem("authToken"),
                },
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Something went wrong");
            }

            setOrdersData(data.ordersData.reverse());
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const calculateTotal = (order) =>
        order.cart.reduce((sum, item) => sum + item.totalPrice, 0);

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const formattedDate = date.toLocaleDateString("en-GB");
        const formattedTime = date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        return `${formattedDate} | ${formattedTime}`;
    };


    return (
        <>
            <Navbar />
            <div className="max-w-5xl mx-auto p-4 min-h-screen text-white">
                <h2 className="text-2xl font-bold mb-6">Order History</h2>

                {ordersData.map((order, idx) => (
                    <div
                        key={idx}
                        className="mb-8 bg-white/90 dark:bg-slate-800 text-black dark:text-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4"
                    >
                        <h3 className="text-md font-medium text-gray-600 dark:text-gray-300 mb-4">
                            {formatDateTime(order.orderDate)}
                        </h3>

                        {order.cart.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-3 mb-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-lg">{item.name}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Size: {item.size}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Quantity: {item.qty}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right font-bold">₹{item.totalPrice}</div>
                            </div>
                        ))}

                        <div className="text-right font-semibold text-lg pt-2 border-t dark:border-gray-700">
                            Total: ₹{calculateTotal(order)}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default OrderHistory;


