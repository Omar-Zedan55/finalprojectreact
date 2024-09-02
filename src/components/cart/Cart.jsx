import React, { useContext } from 'react'
import { CartContext } from '../context/CartContextt'
import { Link } from 'react-router-dom';
export default function Cart() { 
    const { products, totalprice, updateCount, remove, clearcart } = useContext(CartContext);
    return (
        <div className='overflow-auto'>
            <div className='bg-slate-100 w-full md:w-[80%] m-auto overflow-auto mt-14 py-8 p-5 '>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-3xl'>Cart Shop</h2>
                    {products != null && products.length != 0 ? <><Link to="/payment" className="text-white
                        bg-sky-700 hover:bg-sky-800 focus:ring-4
                    focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-600
                    dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800">
                        Check Out
                    </Link></> : ""}
                </div>
                {products != null && products.length != 0 ?
                    <>
                        <h2 className='text-green-800 text-xl font-mono'>total price:
                            <span className='font-semibold text-2xl text-green-500'>{totalprice}</span> EGP</h2>
                        {products?.map((item) => {
                            return <div className=''>
                                <div className=' flex flex-wrap justify-center items-center border-b border-gray-400 '>
                                    <div className='md:w-1/6 w-full p-5'>
                                        <img src={item.product.imageCover} alt="" />
                                    </div>
                                    <div className='w-4/6 '>
                                        <h2 className=' pb-3 '>title:{item.product.title.split(" ").slice(0, 2).join(" ")} </h2>
                                        <h2 className=' pb-3 '>price: {item.price} </h2>
                                        <button onClick={function () {
                                            remove(item.product.id)
                                        }} className='text-red-700  '><i class="fa-solid fa-trash me-2"></i>
                                            Remove
                                        </button>
                                    </div>
                                    <div className='w-1/6 flex justify-center items-center '>
                                        <button onClick={function () {
                                            updateCount(item.product.id, item.count - 1)
                                        }} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4
                                            focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600
                                            dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800  ">
                                            -
                                        </button>
                                        <h2>{item.count}</h2>
                                        <button onClick={function () {
                                            updateCount(item.product.id, item.count + 1)
                                        }} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4
                                                focus:ring-green-300 font-medium rounded-lg text-sm ms-4 px-5 py-2.5 me-2 mb-2 dark:bg-green-600
                                                dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        })} </> : <h2 className='font-semibold text-red-600 text-3xl'> cart is empty</h2>
                }
                {products != null && products.length != 0 ?
                    <div className='flex justify-center items-center mt-4'>
                        <div>
                            <button onClick={function () {
                                clearcart()
                            }} type="button" className="text-white  bg-red-700 hover:bg-red-800 focus:ring-4
                                        focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600
                                        dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                clearcart
                            </button>
                        </div>
                    </div> : ""}
            </div>
        </div>)
}