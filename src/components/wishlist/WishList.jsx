import React, { useContext } from 'react'
import img from "./../../assets/1680403156501-cover.jpeg"
import { CartContext } from '../context/CartContextt';
import toast from 'react-hot-toast';
export default function WishList() {


    const { WishListproducts, addproducttocart, removewish } = useContext(CartContext);
    async function addproduct(id) {
        const res = await addproducttocart(id);
        if (res) {
            toast.success(res.message)
        } else {
            toast.error("error")
        }
    }
    async function removethatwish(id) {
        const res = await removewish(id);
        if (res) {
            toast.success(res.message)
        } else {
            toast.error("error")
        }
    }
    return (
        <div className=' overflow-auto'>
            <div className='container mt-20 m-auto  xl:w-[90%] bg-slate-100 p-10'>
                <h2 className='  text-3xl font-semibold'>My wish List</h2>
                <div>
                    {
                        WishListproducts ?
                            WishListproducts.map((item) => {
                                return (
                                    <div className=' flex justify-center flex-wrap items-center border-b border-gray-400 '>
                                        <div className='w-full  md:w-1/6 p-5'>
                                            <div>
                                                <img src={item.imageCover} className='w-full' alt="" />
                                            </div>
                                        </div>
                                        <div className='w-1/2 md:w-4/6 p-5'>
                                            <h2 className=' text-xl mb-2 font-semibold'>{item.title.split(" ").slice(0, 3).join(" ")}</h2>
                                            <h2 className='font-mono mb-1 font-bold text-green-600'>{item.price} EGP</h2>
                                            <button onClick={function () {
                                                removethatwish(item.id)
                                            }} className='text-red-700  '><i class="fa-solid fa-trash me-2"></i>
                                                Remove
                                            </button>
                                        </div>
                                        <div className='w-1/2 md:w-1/6 '>
                                            <button onClick={function () {
                                                addproduct(item.id)
                                                removewish(item.id)
                                            }} type="button" className="text-black-700 m-auto  border
                                    border-green-700  focus:outline-none focus:ring-green-300 
                                    font-normal rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2
                                    dark:border-green-500 dark:text-green-500  dark:focus:ring-green-800">
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div >
                                )
                            })
                            : ""
                    }
                </div>
            </div>
        </div>
    )
}
