import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'






function Home() {
    const [foodItems, setFoodItems] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")



    const loadData = async () => {
        try {
            let response = await fetch(`${import.meta.env.VITE_API_URL}/api/foodData`, {
                method: 'get',
                headers: {

                    'auth-token': localStorage.getItem("authToken")
                },



            });


            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }


            setFoodItems(data.foodItems)
            setFoodCategory(data.foodCategory)




        }


        catch (error) {
            console.error('Error:', error);

        }
    }

    useEffect(() => {
        loadData()
    }, [])


    return (
        <div>

            <Navbar />
            <Carousel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="max-w-7xl mx-auto px-4">

                {foodCategory.length !== 0 ?
                    foodCategory.map((data) => {
                        return (<div key={data._id} className="mb-8" >

                            <h3 className="text-2xl font-semibold mb-2">{data.CategoryName}</h3>

                            <hr className='mb-4' />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                                {

                                    foodItems.length !== 0 ? foodItems.filter
                                        (item => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map(filterItem => {
                                            return (

                                                <Card key={filterItem._id} food={filterItem} />


                                            )
                                        }) : ""
                                }
                            </div>

                        </div>
                        )
                    }


                    )
                    : ""
                }
            </div>



            <Footer />
        </div>
    )
}

export default Home