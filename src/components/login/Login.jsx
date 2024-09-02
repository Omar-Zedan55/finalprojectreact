import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import * as Yup from 'yup'
import { authContext } from './../context/AuthContext';
export default function Login() {
    const { setToken } = useContext(authContext)
    const [isloading, setIsloading] = useState(false);
    const navigate = useNavigate();
    const initial = {
        email: "",
        password: "",
    }
    async function loginlogic(vlaues) {
        setIsloading(true)
        try {
            let i = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", vlaues)
            setIsloading(false)
            toast.success(i.data.message)
            navigate('/')
            setToken(i.data.token)
            localStorage.setItem("tkn", i.data.token)
        } catch (error) {
            setIsloading(false)
            toast.error(error.response.data.message)
        }
    }
    const validation = Yup.object().shape({
        email: Yup.string().required("email is required").email("enter valid email"),
        password: Yup.string().required("password is required")
            .matches(/^[A-Z][a-z0-9]{3,8}$/, "password must be started with uppercase"),
    })
    const formik = useFormik(
        {
            initialValues: initial,
            onSubmit: loginlogic,
            validationSchema: validation,
        }
    )
    return (
        <div className='py-5 '>
            <h1 className='mb-8 text-green-700 text-center  text-5xl'>Login Form</h1>
            <div className="md:w-[60%] mx-auto md:p-0 p-5">
                <form onSubmit={formik.handleSubmit} >
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

                    <div className='flex justify-between items-center'>
                        <Link to="/forget"><h2 className='text-xl font-medium hover:text-green-700 transition-colors'>Forgot Your Password?</h2></Link>
                        <button type="submit" className="focus:outline-none text-white
                        bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
                        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600
                        dark:hover:bg-green-700 dark:focus:ring-green-800">
                            {isloading ? <i className='fa-solid fa-spinner fa-spin text-white'></i> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
