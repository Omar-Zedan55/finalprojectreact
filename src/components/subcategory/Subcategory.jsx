import React from 'react'

export default function Subcategory() {
    return (
        <div>
            <div className='mt-7'>
                <div className='container m-auto xl:w-[90%] '>
                    <h2 className=' text-green-700 text-3xl py-4 font-semibold text-center'>Electronics subcategories</h2>
                    <div className='flex flex-wrap justify-start items-center'>
                        <div className='w-full  md:w-1/3 p-5 '>
                            <div className='inner hover:shadow-[0px_0px_20px_5px_#a0aec0] transition-all duration-500  text-center border border-gray-300 rounded-lg'>
                                <h2 className=" text-black-700 text-3xl py-4 font-semibold" >TVs, Satellites & Accessories</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
