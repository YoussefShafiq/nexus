import React, { useEffect, useState, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import { FaArrowUp, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { DefaultSEO } from '../seo/SEO';
import '../Content.scss'

export default function Layout({ children }) {
    const { pathname } = useLocation();
    const [isTop, setIsTop] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const isTopCheck = useCallback(() => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;

        if (scrollPosition > viewportHeight / 2) {
            setIsTop(false);
        } else {
            setIsTop(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', isTopCheck);
        isTopCheck();

        return () => {
            window.removeEventListener('scroll', isTopCheck);
        };
    }, [isTopCheck]);

    function scrollTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return <>
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

        {/* Social Media Links */}
        <motion.div
            className="fixed flex flex-col gap-2 top-2/3 right-0 bg-white/5 backdrop-blur-sm p-2 rounded-lg rounded-r-none text-white/40 text-xl"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
        >
            <a name='whatsapp contact' href="https://wa.me/+201143323484" target='_blank' rel='noreferrer'>
                <FaWhatsapp className='hover:text-green-100 transition-colors duration-300 cursor-pointer hover:bg-green-500 rounded-full hover:shadow-lg hover:scale-105' />
            </a>
            <a name='linkedin account' href="https://www.linkedin.com/company/nexus-for-engineering-consultancy-bim-solutions" target='_blank'>
                <FaLinkedin className='hover:text-blue-800 transition-colors duration-300 cursor-pointer hover:bg-white rounded-sm hover:shadow-lg hover:scale-105' />
            </a>
        </motion.div>

        {/* Scroll to Top Button with Animation */}
        <AnimatePresence>
            {!isTop && (
                <motion.button
                    onClick={scrollTop}
                    className="fixed bottom-5 right-5 h-10 aspect-square bg-primary rounded-full flex items-center justify-center hover:scale-105 transition-all z-50"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                    }}
                    exit={{
                        scale: 0,
                        opacity: 0,
                        transition: { duration: 0.3 }
                    }}
                    whileHover={{
                        scale: 1.1,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        animate={{
                            y: [0, -2, 0],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <FaArrowUp className='text-white' />
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    </>
}