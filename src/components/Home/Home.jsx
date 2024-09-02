import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import style from "./home.module.css"
import CategoryList from '../CategoryList/CategoryList';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContextt';
import toast from 'react-hot-toast';
import { DotLoader, HashLoader } from 'react-spinners';
import Products from './../products/Products';
export default function Home() {
    const addbutton = ` text-white relative ${style.addtocartbutton} bg-green-700 hover:bg-green-800 w-full mt-4 focus:ring-4
                        focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600
                        dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800
                        `
    const innerstyle = `${style.innerbuttonhover}  inner p-3 rounded-md hover:shadow-[0px_0px_20px_5px_#a0aec0] transition-all duration-500`;
    const [WishListhearts, setWishListhearts] = useState(null);
    const [isloadin, setIsloadin] = useState(false);
    async function GetaAllProducts() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
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
            <div className='h-screen flex justify-center items-center opacity-30 bg-black'>
                <HashLoader
                    color="#ffffff"
                    size={150}
                />
            </div></>
    }
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
            <div className="w-full md:w-[75%] m-auto">
                <HomeSlider /> </div>
            <div className="w-full  m-auto">
                <CategoryList />
            </div>
            <Products/>
        </div>
    </div>
    )
}
