import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { HashLoader } from 'react-spinners';
export default function AllOrders() { 
    const { id } = jwtDecode(localStorage.getItem("tkn"));
    const [load, setload] = useState(false)
    const [data, setdata] = useState(null)
    async function getuserorders() {
        try {
            setload(true)
            let { data } = await axios.get(` https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            setload(false)
            setdata(data)
            return (data)
        } catch (error) {
            setload(true)
        }
    }
    useEffect(() => {
        getuserorders()
    }, [])
    if (load) {
        return <> <div className='h-screen flex justify-center items-center opacity-30 bg-black'>
        <HashLoader
            color="#ffffff"
            size={150}
        />      
        </div></>
    }
    return (
        <section className='py-10'>
            <div className='w-full md:w-[80%] m-auto'>
                {data ? data.map((order, idx) => {
                    return <>
                        <div className="p-5 mb-3 bg-slate-200">
                            <div className="flex flex-wrap justify-center items-center">
                                {order.cartItems ? order.cartItems.map((item, idx) => {
                                    return (
                                        <div className=" w-1/2 md:w-1/4">
                                            <img src={item.product.imageCover} className='w-full' alt="" />
                                        </div>
                                    )
                                }) : ""}
                            </div>
                            <h2>total ordere price : {order.totalOrderPrice}</h2>
                            <h2>payment Method Type : {order.paymentMethodType}</h2>
                        </div>
                    </>
                }) : ""}
            </div >
        </section>
    )
}