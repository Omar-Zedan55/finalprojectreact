import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Button, Modal } from "flowbite-react";
import { HashLoader } from 'react-spinners';
export default function Brand() {
    const [openModal, setOpenModal] = useState(false);
    const [isloadingSub, setIsloadingSub] = useState(false);
    const [subbrand, setSubbrand] = useState(null)
    async function getSubBrand(id) { 
        try {
            setIsloadingSub(true)
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
            );
            setIsloadingSub(false);
            setSubbrand(data.data)
            
            return data;
        } catch (error) {
            setIsloadingSub(false)
            
        }
    }
    async function GetaAllBrands() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }
    const { data, isLoading, isFetching, error } = useQuery("brand", GetaAllBrands)
    if (isLoading) {
        return <><div className='h-screen flex justify-center items-center opacity-30 bg-black'>
        <HashLoader
            color="#ffffff"
            size={150}
        />      
        </div></>
    }
    return (
        <div className='mt-28 mb-14 text-center'>
            <h2 className='text-4xl text-green-500 mb-3 font-semibold'>All Brands</h2>
            <div className='container m-auto xl:w-[90%] '>
                <div className='flex flex-wrap justify-start items-center'>
                    {
                        data ? data.data.data.map((item) => {
                            return (
                                <div className='w-full  md:w-1/4 p-3 '>
                                    <div onClick={function () {
                                        getSubBrand(item._id); setOpenModal(true)
                                    }} className='inner  hover:shadow-[0px_0px_20px_5px_#a0aec0] transition-all duration-500 p-5 text-center border border-gray-300 rounded-lg'>
                                        <div className="overflow-hidden  m-auto">
                                            <img className='md:w-full w-1/2  ' src={item.image} alt="" />
                                        </div>
                                        <h2 className="  text-xl py-4 " >{item.name}</h2>
                                    </div>
                                </div>
                            )
                        }) : ""
                    }
                </div>
            </div>
            <>
                <Modal dismissible show={openModal} onClose={() => { setOpenModal(false); setSubbrand(null) }}>
                    <Modal.Header></Modal.Header>
                    <Modal.Body>
                        {isloadingSub ? <div className='loadinglayer  fixed top-0 left-0 right-0 bottom-0 bg-slate-300 opacity-60 '>
                            <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                                <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                            </div>
                        </div> : <div className='flex flex-wrap justify-center p-5 items-center'>
                            <div className='w-full md:w-1/2'>
                                <h2 className='text-5xl mb-3 font-semibold text-green-800'>{subbrand?.name}</h2>
                                <h3>{subbrand?.slug}</h3>
                            </div>
                            <div className='w-full md:w-1/2'>
                                <img src={subbrand?.image} alt="" />
                            </div>
                        </div>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="dark" className='ms-auto' onClick={() => { setOpenModal(false); setSubbrand(null) }} pill>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div >
    )
}