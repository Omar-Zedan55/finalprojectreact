import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import style from "./products.module.css"
import CategoryList from '../CategoryList/CategoryList';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContextt';
import toast from 'react-hot-toast';
import { DotLoader, HashLoader } from 'react-spinners';
export default function Products() {
    let res;
    const addbutton = ` text-white relative ${style.addtocartbutton} bg-green-700 hover:bg-green-800 w-full mt-4 focus:ring-4
                        focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600
                        dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800
                        `
    const innerstyle = `${style.innerbuttonhover}  inner p-3 rounded-md hover:shadow-[0px_0px_20px_5px_#a0aec0] transition-all duration-500`;
    const [WishListhearts, setWishListhearts] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [productsarray, seproductsarray] = useState(null);
    const [isloadin, setIsloadin] = useState(false);
    async function GetaAllProducts() {

        res = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
        return res
    }
    const { addproducttocart, getuserWishList, addProductToWishList } = useContext(CartContext);
    async function AddToCart(id) {
        setIsloadin(true)
        const res = await addproducttocart(id); setIsloadin(false)
        if (res) {
            setIsloadin(false)
            toast.success(res.message)
        } else {
            setIsloadin(false)
            toast.error("error")
        }
    }
    var wishtoheart;
    var haerts = []
    async function getwishtohearts() {
        wishtoheart = await getuserWishList();
        heartsListMaker()
    }
function handleSearchChange(e) {
    setSearchQuery(e.target.value);
}

    function heartsListMaker() {
        for (var t = 0; t < wishtoheart?.data.length; t++) {
            haerts.push(wishtoheart?.data[t].id)
        }
        setWishListhearts(haerts)
    }
    useEffect(function () {
        getwishtohearts()
    }, [])
    async function AddToWishList(id) {
        setIsloadin(true)
        const res = await addProductToWishList(id);
        setIsloadin(false)
        if (res) {
            setIsloadin(false)
            toast.success(res.message)
        } else {
            setIsloadin(false)
            toast.error("error")
        }
    }
    const { data, isLoading, isFetching, error } = useQuery("products", GetaAllProducts)
    useEffect(function () {
        GetaAllProducts()
    }, [])
    if (isLoading) {
        return <>
            <div className='h-screen flex  justify-center items-center opacity-30 bg-black'>
                <HashLoader 
                    color="#ffffff"
                    size={150}
                />
            </div></>
    }

const filteredProducts = data.data.data?.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
);

    return (<div className='overflow-y-hidden'>
        {isloadin ?
            <div className='loadinglayer  fixed top-0 left-0 right-0 bottom-0 bg-slate-300 opacity-60 '>
                <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div class='h-8 w-8  bg-black rounded-full animate-bounce'></div>
                </div>
            </div> : ""}
        <div className='py-8'>
            <div className="w-full md:w-[80%]  m-auto">
                <div className="relative my-10 z-0 w-full mb-5 group">
                    <input type='text'  onChange={handleSearchChange}  name="search" id="search" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label
                        htmlFor="search"
                        className="peer-focus:font-medium absolute text-sm
                            text-gray-500 dark:text-gray-400 duration-300 
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto peer-focus:text-green-600
                            peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                            peer-focus:-translate-y-6">
                        search
                    </label>
                </div>
                <div className="flex  flex-wrap justify-center items-center">
                    {filteredProducts?.map((item, idx) => <>
                        <div key={idx} className='w-full md:w-1/2 lg:w-1/4 p-4'>
                            <div className={innerstyle}>
                                <Link to={`/productdetails/${item.id}`}>
                                    <img src={item.imageCover} alt="imgg" />
                                    <h2 className='text-green-600 mt-3'> {item.category.name}</h2>
                                    <h2 className=' mt-3'> {item.title.split(" ").slice(0, 2).join(" ")}</h2>
                                    <div className="flex flex-wrap justify-between mt-3 items-center">
                                        <h4>{item.price} EGP</h4>
                                        <h4> <i className='fa-star fa-solid text-yellow-600 mr-2' ></i> {item.ratingsAverage}</h4>
                                    </div></Link>
                                <div className='flex justify-between relative  items-center '>
                                    <button onClick={function () {
                                        AddToCart(item.id)
                                    }} type="button" className={addbutton}>
                                        add to cart
                                    </button>
                                    <button onClick={() => {
                                        AddToWishList(item.id)
                                        getwishtohearts()
                                        getwishtohearts()
                                    }}>
                                        {WishListhearts?.includes(item.id) ? <i class="fa-solid text-red-400 text-2xl fa-heart"></i> : <i class="fa-solid blackheart text-2xl fa-heart"></i>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>)}
                </div>
            </div>
        </div>
    </div>
    )
}
