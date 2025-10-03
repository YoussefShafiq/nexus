import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { DefaultSEO } from '../seo/SEO';
import '../Content.scss'

export default function Layout({ children }) {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return <>
        {/* Default site-wide SEO */}
        <DefaultSEO
            siteName="Nexus"
            defaultTitle="Nexus — Engineering Consultancy"
            description="NEXUS delivers precision engineering solutions for oil & gas, industrial, and architectural projects."
            image="/Logo.png"
        />
        <Navbar />
        <div className="text-black bg-gradient-to-br from-[#dadfe2] via-[#dadfe2] to-[#6087a1] bg-fixed font-montserrat">
            <Outlet>
                {children}
            </Outlet>
            <Footer />
        </div>
        <div className="fixed flex flex-col gap-2 top-2/3 right-0 bg-white/5 backdrop-blur-sm p-2 rounded-lg rounded-r-none text-white/40 text-xl">
            <a href="https://wa.me/+201284222917" target='_blank' rel='noreferrer'>
                <FaWhatsapp className='hover:text-green-100 transition-colors duration-300 cursor-pointer hover:bg-green-500 rounded-full hover:shadow-lg hover:scale-105' />
            </a>
            <a href="https://www.linkedin.com/company/nexus-for-engineering-consultancy-bim-solutions">
                <FaLinkedin className='hover:text-blue-800 transition-colors duration-300 cursor-pointer hover:bg-white rounded-sm hover:shadow-lg hover:scale-105' />
            </a>
        </div>
    </>
}