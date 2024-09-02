import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { HashLoader } from 'react-spinners'

export default function Category() {
    const [isload, setIsload] = useState(false);
    const [subcat, setSubCat] = useState(null)
    const [subname, setname] = useState(null)
    async function GetaAllCategories() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    async function getSubCategory(id, name) {
        try {
            setIsload(true)
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
            ); setIsload(false);
            setSubCat(data.data)
            setname(name)
            return data;
        } catch (error) {
            setIsload(false)
        }
    }
    const { data, isLoading, isFetching, error } = useQuery("category", GetaAllCategories)
    if (isLoading) {
        return <> <div className='h-screen flex justify-center items-center opacity-30 bg-black'>
        <HashLoader
            color="#ffffff"
            size={150}
        />      
        </div></>
    }
    return (
        <div className='mt-28 mb-14 '>
            {isload ? <div className='loadinglayer fixed top-0 left-0 right-0 bottom-0 bg-slate-300 opacity-60 '>
                <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                </div>
            </div> : ""}
            <div className='container m-auto xl:w-[90%] '>
                <div className='flex flex-wrap justify-start items-center'>
                    {
                        data ? data.data.data.map((item) => {
                            return (
                                <div  className='w-full  md:w-1/3 p-5 '>
                                    <div onClick={function () { getSubCategory(item._id, item.name) }}className='inner hover:shadow-[0px_0px_20px_5px_#a0aec0] transition-all duration-500  text-center border border-gray-300 rounded-lg'>
                                        <div className="overflow-hidden h-[300px] m-auto">
                                            <img className='w-full h-full object-cover object-center ' src={item.image} alt="" />
                                        </div>
                                        <h2 className=" text-green-700 text-3xl py-4 font-semibold" >{item.name}</h2>
                                    </div>
                                </div>
                            )
                        }) : ""
                    }
                </div>
            </div>
            <div>
                {subcat ? <div className='mt-7'>
                    <div className='container m-auto xl:w-[90%] '>
                        <h2 className=' text-green-700 text-3xl py-4 font-semibold text-center'>{subname}</h2>
                        <div className='flex flex-wrap justify-start items-center'>
                            {
                                subcat.map((i) => {
                                    return (<div className='w-full  md:w-1/3 px-5 py-2 '>
                                        <div className='inner hover:shadow-[0px_0px_20px_5px_#a0aec0] transition-all duration-500  text-center border border-gray-300 rounded-lg'>
                                            <h2 className=" text-black-700 text-3xl py-4 font-semibold" >{i.name}</h2>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </div> : ""}
            </div>
        </div>
    )
}
