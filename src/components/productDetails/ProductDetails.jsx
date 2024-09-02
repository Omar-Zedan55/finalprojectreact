import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import { CartContext } from '../context/CartContextt'
import toast from 'react-hot-toast'
import { HashLoader } from 'react-spinners'
import Slider from "react-slick";


export default function ProductDetails() {
    const [isloadin, setIsloadin] = useState(false);
    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const { id } = useParams()
    async function getproductdetails() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

    }
    const { addproducttocart } = useContext(CartContext);
    async function AddToCart() {
        setIsloadin(true)
        const res = await addproducttocart(id);
        setIsloadin(false)

        if (res) {
            setIsloadin(false)
            toast.success(res.message)
        } else {
            setIsloadin(false)
            toast.error("error")
        }
    }
    const { data, isLoading } = useQuery(`product${id}`, getproductdetails)

    if (isLoading) {
        return <> <div className='h-screen flex justify-center items-center opacity-30 bg-black'>
            <HashLoader
                color="#ffffff"
                size={150}
            />
        </div></>
    }

    return (
        <div className='p-8'>
            {isloadin ?
                <div className='loadinglayer  fixed top-0 left-0 right-0 bottom-0 bg-slate-300 opacity-60 '>
                    <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                    </div>
                </div> : ""}
            <div className='w-full md:w-80% m-auto'>
                <div className="flex flex-wrap justify-center items-center">
                    <div className="md:w-1/3 p-5 w-full">
                        <div>
                            <Slider {...settings}>
                                {data?.data.data.images.map((item) => {
                                    return (
                                        <div>
                                            <img className="lg:h-[500px] w-full" src={item} alt="slider" />
                                        </div>
                                    )
                                })
                                }
                            </Slider>
                        </div>
                    </div>
                    <div className="md:w-2/3 p-5 w-full">
                        <div>
                            <div className="text-2xl mb-3 font-semibold">{data?.data.data.title} </div>
                            <div className=" mb-3 font-mono">{data?.data.data.description}</div>
                            <div className=" mb-3 text-green-500 font-mono">{data?.data.data.category.name} </div>
                            <div className="flex flex-wrap justify-between mt-3 items-center">
                                <h4>{data?.data.data.price} EGP</h4>
                                <h4> <i className='fa-star fa-solid text-yellow-600 mr-2' ></i> {data?.data.data.ratingsQuantity}</h4>
                                <button onClick={AddToCart} type="button" className="text-white bg-green-700 hover:bg-green-800 w-full mt-4 focus:ring-4
                                focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600
                                dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
                                    add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
