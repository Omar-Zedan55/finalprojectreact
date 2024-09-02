import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useNavigation } from 'react-router-dom'
import * as Yup from 'yup'
export default function Register() {
    const [isloading, setIsloading] = useState(false);
    const navigate = useNavigate();
    const initial = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: ""
    }
    async function submitlogic(vlaues) {
        setIsloading(true)
        try {
            let i = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", vlaues)
            setIsloading(false)
            toast.success(i.data.message)
            navigate('/login')

        } catch (error) {
            setIsloading(false)
            toast.error(error.response.data.message)
        }
    }
    const validation = Yup.object().shape({

        name: Yup.string().required("name is required").min(3, "min=3").max(15, "max=15"),

        email: Yup.string().required("email is required").email("enter valid email"),

        password: Yup.string().required("password is required")
            .matches(/^[A-Z][a-z0-9]{3,8}$/, "password must be started with uppercase"),

        rePassword: Yup.string().required("repassword is required")
            .oneOf([Yup.ref("password")], "repassword must equal password"),

        phone: Yup.string().required("phone must be put").matches(/^01[0125][0-9]{8}$/, "enter egyption number")

    })
    const formik = useFormik(
        {
            initialValues: initial,
            onSubmit: submitlogic,
            validationSchema: validation,
        }
    )
    return (
        <div className='py-5 '>
            <h1 className='mb-8 text-green-700 text-center  text-5xl'>Registeration Form</h1>
            <div className="md:w-[60%] mx-auto md:p-0 p-5">
                <form onSubmit={formik.handleSubmit} >
                    {/* name input */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
                    </div>
                    {
                        formik.errors.name && formik.touched.name ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">Error</span> {formik.errors.name}
                        </div> : ""
                    }
                    {/* phone input */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
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
                    {
                        formik.errors.phone && formik.touched.phone ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">Error</span> {formik.errors.phone}
                        </div> : ""
                    }
                    {/* email input */}
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
                        formik.errors.email && formik.touched.email ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">Error</span> {formik.errors.email}
                        </div> : ""
                    }
                    {/* password input */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" value={formik.values.password} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label
                            htmlFor="password"
                            className="peer-focus:font-medium absolute text-sm
                            text-gray-500 dark:text-gray-400 duration-300 
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto peer-focus:text-green-600
                            peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                            peer-focus:-translate-y-6">
                            Your Password
                        </label>
                    </div>
                    {
                        formik.errors.password && formik.touched.password ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">Error</span> {formik.errors.password}
                        </div> : ""
                    }
                    {/* repassword input */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label
                            htmlFor="rePassword"
                            className="peer-focus:font-medium absolute text-sm
                            text-gray-500 dark:text-gray-400 duration-300 
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto peer-focus:text-green-600
                            peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                            peer-focus:-translate-y-6">
                            Your rePassword
                        </label>
                    </div>
                    {
                        formik.errors.rePassword && formik.touched.rePassword ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">Error</span> {formik.errors.rePassword}
                        </div> : ""
                    }
                    <button type="submit" className="focus:outline-none text-white
                        bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
                        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600
                        dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {isloading ? <i className='fa-solid fa-spinner fa-spin text-white'></i> : "register"}
                    </button>
                </form>
            </div>
        </div>
    )
}