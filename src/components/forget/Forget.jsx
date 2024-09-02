import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup'
export default function Forget() {
    const [isloading, setIsloading] = useState(false);
    const initial = {
        email: ""
    }
    async function forgetfunc(values) {
        try {
            setIsloading(true)
            let i = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
            setIsloading(false)
            toast.success(i.data.message || 'Password reset email sent successfully');
        }
        catch (error) {
            setIsloading(false)
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    }
    const validation = Yup.object().shape({
        email: Yup.string().required("email is required").email("enter valid email"),
    })
    const formik = useFormik(
        {
            initialValues: initial,
            onSubmit: forgetfunc,
            validationSchema: validation,
        }
    )
    return (
        <div className='container xl:w-[90%]  m-auto overflow-auto'>
            {isloading ? <div className='loadinglayer fixed top-0 left-0 right-0 bottom-0 bg-slate-300 opacity-60 '>
                <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                </div>
            </div> : ""}
            <h2 className='text-4xl font-semibold my-11'>please enter your Email</h2>
            {/* email input */}
            <form onSubmit={formik.handleSubmit} >
                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" value={formik.values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm
                            text-gray-500 dark:text-gray-400 duration-300 
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto peer-focus:text-green-600
                            peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                            peer-focus:-translate-y-6">
                        Your Email
                    </label>
                </div>
                {
                    formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Error</span> {formik.errors.email}
                    </div> : ""
                }
                <div className='flex justify-between items-center'>
                    <button type="submit" className="focus:outline-none text-white
                        bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
                        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600
                        dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {isloading ? <i className='fa-solid fa-spinner fa-spin text-white'></i> : "verify"}
                    </button>
                </div>
            </form>
        </div>
    )
}
