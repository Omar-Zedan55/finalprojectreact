import React, { useContext } from 'react'
"use client";
import style from "./test.module.css"
import img1 from './../../assets/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from './../context/AuthContext';
import { CartContext } from '../context/CartContextt';
import { Navbar } from "flowbite-react";
export default function Navbarcomp() {
    const { numofitems } = useContext(CartContext)
    const navigate = useNavigate()
    const { token, setToken } = useContext(authContext);
    function logout() {
        localStorage.removeItem("tkn")
        setToken(null)
        navigate("/login")
    }
    const navlinkstyle = `${style.navlink} py-4 md:py-0 opacity-70  font-medium `
    const navlinkstyle2 = `${style.navlink} relative lg:py-0 opacity-70  font-medium `
    return (<div className="py-4 lg:px-14 px-0 bg-slate-200 fixed z-40 w-full ">
        <Navbar className=" bg-slate-200 " fluid rounded>

            <NavLink to="/"><img src={img1} className='mx-auto' alt="" /></NavLink>

            <Navbar.Toggle />            {
                token ? <>
                    <Navbar.Collapse>
                        <NavLink className={navlinkstyle} to="/"> Home</NavLink>
                        <NavLink className={navlinkstyle} to="/products"> Products</NavLink>
                        <NavLink className={navlinkstyle} to="/brand">brand</NavLink>
                        <NavLink className={navlinkstyle} to="/category">category</NavLink>
                        <NavLink className={navlinkstyle} to="/allorders">allorders</NavLink>
                        <NavLink className={navlinkstyle} to="/wishlist">WishList</NavLink>
                        <div className='text-center'>
                        </div>
                    </Navbar.Collapse>
                </> : ""}
            <Navbar.Collapse>
                {
                    token ? <>
                        <div className='text-center'>
                            <NavLink to="/cart" className={navlinkstyle2}> <i class="fa-solid text-2xl fa-cart-shopping"></i>
                                <div class="absolute  inline-flex items-center justify-center
                        w-6 h-6 text-xs font-bold text-white bg-red-500 border-2
                        border-white rounded-full -top-5 -end-3 dark:border-gray-900">
                                    {numofitems}
                                </div>
                            </NavLink></div>

                    </> : ""}

                <div className='text-center ml-3 space-x-4 '>
                    {
                        token ? <button className={navlinkstyle} onClick={logout}>
                            logout
                        </button>
                            :
                            <>
                                <NavLink className={navlinkstyle} to="/register">register</NavLink>
                                <NavLink className={navlinkstyle} to="/login">login</NavLink>
                            </>
                    }
                </div>
            </Navbar.Collapse>
        </Navbar></div>
    );
}
