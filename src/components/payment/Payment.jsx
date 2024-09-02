import axios from 'axios'
import React, { useContext, useState } from 'react'
import { CartContext } from './../context/CartContextt';
import toast from 'react-hot-toast';
export default function Payment() {
    const [phone, setPhone] = useState(0)
    const [datails, setDatails] = useState(null)
    const [city, setCity] = useState(null)
    const { cartId, settotalprice, setnumofitems, setproducts } = useContext(CartContext)
    async function cashPayment() {
        const x = {
            shippingAddress: {
                datails,
                phone,
                city
            }
        }
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, x, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })
            settotalprice(0);
            setnumofitems(0);
            setproducts(null);
            toast.success(data.status);
            return (data);
        } catch (error) {
            toast.error("error");
        }
    }
    async function onlinePayment() {
        const x = {
            shippingAddress: {
                datails,
                phone,
                city
            }
        }
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://omar-zedan55.github.io`, x, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })
            toast.success(data.status);
            window.open(data.session.url)
            return (data);
        } catch (error) {
            toast.error("error");
        }
    }
    return (
        <div className='py-10'>
            <h2 className='text-center text-green-600 text-3xl font-semibold'>Payment</h2>
            <div className='w-full md:w-[70%] m-auto '>
                {/* phone input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={function (e) { setPhone(e.target.value) }} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label
                        htmlFor="phone"
                        className="peer-focus:font-medium absolute text-sm
                            text-gray-500 dark:text-gray-400 duration-300 
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto peer-focus:text-green-600
                            peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                            peer-focus:-translate-y-6">
                        Your Phone
                    </label>
                </div>
                {/* details input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" onChange={function (e) { setDatails(e.target.value) }} name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label
                        htmlFor="details"
                        className="peer-focus:font-medium absolute text-sm
                            text-gray-500 dark:text-gray-400 duration-300 
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto peer-focus:text-green-600
                            peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                            peer-focus:-translate-y-6">
                        Your details
                    </label>
                </div>
                {/* city input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" onChange={function (e) { setCity(e.target.value) }} name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label
                        htmlFor="city"
                        className="peer-focus:font-medium absolute text-sm
                            text-gray-500 dark:text-gray-400 duration-300 
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto peer-focus:text-green-600
                            peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                            peer-focus:-translate-y-6">
                        Your city
                    </label>
                </div>
                <button onClick={function () {
                    cashPayment()
                }} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4
                    focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600
                    dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
                    Cash Payment
                </button>
                <button onClick={function () {
                    onlinePayment()
                }} type="button" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4
                    focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-600
                    dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800">
                    ONLINE Payment
                </button>
            </div>
        </div>
    )
}
