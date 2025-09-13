import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

export default function Layout({ children }) {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return <>
        <Navbar />
        <div className="text-black bg-gradient-to-br from-[#dadfe2] via-[#dadfe2] to-[#6087a1] bg-fixed font-montserrat">
            <Outlet>
                {children}
            </Outlet>
            <Footer />
        </div>
        <div className="fixed flex flex-col gap-2 top-2/3 right-0 bg-white/5 backdrop-blur-sm p-2 rounded-lg rounded-r-none text-white/40 text-xl">
            <FaFacebook className='hover:text-blue-500 transition-colors duration-300 cursor-pointer hover:bg-white rounded-full hover:shadow-lg hover:scale-105' />
            <FaLinkedin className='hover:text-blue-800 transition-colors duration-300 cursor-pointer hover:bg-white rounded-sm hover:shadow-lg hover:scale-105' />
        </div>
    </>
}
