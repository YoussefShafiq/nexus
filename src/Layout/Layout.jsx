import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return <>
        <Navbar />
        <div className="text-black bg-gradient-to-b from-[#dadfe2] to-[#6f8594] bg-fixed font-montserrat">
            <Outlet>
                {children}
            </Outlet>
            <Footer />
        </div>
    </>
}
