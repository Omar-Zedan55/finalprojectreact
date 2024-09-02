import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Navbarcomp from '../navbar/Navbar'

export default function Layout() {
    return (
        <div className=' overflow-auto'>
            <Navbarcomp />
            <div className='mt-20'>
            <Outlet />
            </div>
        </div>
    )
}
