import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
    return <>
        <Navbar />
        <div className="text-black bg-gradient-to-b from-[#dadfe2] to-[#6f8594] bg-fixed">
            <Outlet>
                {children}
            </Outlet>
            <Footer />
        </div>
    </>
}
