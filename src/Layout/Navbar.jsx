import React, { useEffect, useRef, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { BiCodeAlt } from 'react-icons/bi';
import { ImLinkedin } from 'react-icons/im';
import { FaSquareWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/Logo.png'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const leftNavRef = useRef(null);
    const rightNavRef = useRef(null);


    useEffect(() => {
        const left = leftNavRef.current;
        const right = rightNavRef.current;

        if (left && right) {
            if (right.offsetWidth > left.offsetWidth) {
                left.style.width = `${right.offsetWidth}px`;
            } else {
                right.style.width = `${left.offsetWidth}px`;
            }
        }
    }, []);

    const { data: jobs } = useQuery({
        queryKey: ['jobs'],
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/jobs')
        }
    })

    const navItems = [
        {
            name: 'Home',
            path: '/home',
        },
        {
            name: 'About us',
            path: '/about-us',
        },
        {
            name: 'Contact',
            path: '/contact',
        },
        {
            name: 'Services',
            path: '/services',
        },
        {
            name: 'Projects',
            path: '/projects',
        },
        {
            name: 'Blogs',
            path: '/blogs',
        },
        {
            name: 'Jobs',
            path: '/jobs',
            dot: jobs?.data?.data?.length > 0
        },
    ];



    const socialIcons = [
        { icon: <FaGithub />, path: 'https://github.com/YoussefShafiq' },
        { icon: <ImLinkedin />, path: 'https://www.linkedin.com/in/youssefshafek' },
        { icon: <FaSquareWhatsapp />, path: 'https://wa.me/+201145528803' },
    ];

    // Animation variants
    const mobileMenuVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            transition: {
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const menuItemVariants = {
        hidden: {
            opacity: 0,
            x: -20
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                ease: "easeOut",
                duration: 0.2
            }
        }
    };

    const socialIconVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };


    return (
        <nav className="bg-primary bg-opacity-35 transition-colors shadow-sm backdrop-blur-md lg:top-5 lg:left-16 lg:right-16 top-3 left-5 right-5 z-50 fixed lg:w-[calc(100vw-128px)] w-[calc(100vw-40px)] rounded-lg">
            <div className="container !py-0 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Desktop Navigation */}
                    <div ref={leftNavRef} className="hidden md:ml-10 md:flex md:space-x-5  transition-colors text-white">
                        {navItems.slice(0, 3).map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-base font-normal transition-all duration-300 ext-gray-700 border-transparent hover:text-customBlue opacity-50`}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-24">
                            <Link to="/">
                                <img src={logo} className='w-full' alt="nexus logo" />
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div ref={rightNavRef} className="hidden md:ml-10 md:flex md:space-x-5  transition-colors text-white">
                        {navItems.slice(3, 7).map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={`relative inline-flex items-center px-1 pt-1 border-b-2 text-base font-normal transition-all duration-300 ext-gray-700 border-transparent hover:text-customBlue opacity-50`}
                            >
                                {item.name}
                                {item.dot && <div className="absolute w-1.5 h-1.5 bg-red-500 rounded-full top-0 right-0"></div>}
                            </NavLink>
                        ))}
                    </div>



                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 transition-colors dark:text-gray-50 hover:text-customBlue focus:outline-none duration-300"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <FiX className="block h-6 w-6" />
                            ) : (
                                <FiMenu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu with animations */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={mobileMenuVariants}
                        className="md:hidden overflow-hidden "
                    >
                        <motion.div className="px-2 pt-2 pb-3 space-y-1 text-gray-700 transition-colors dark:text-gray-50">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={menuItemVariants}
                                >
                                    <NavLink
                                        to={item.path}
                                        className={
                                            `block px-3 py-2 rounded-md text-base font-medium transition duration-300   hover:text-customBlue 
                                            }`
                                        }
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </NavLink>
                                </motion.div>
                            ))}

                            <motion.div
                                className="pt-4 border-t border-gray-200"
                                variants={menuItemVariants}
                            >
                                <motion.div className="flex justify-center space-x-6 py-3">
                                    {socialIcons.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.path}
                                            className="text-gray-500 transition-colors dark:text-gray-50 hover:text-customBlue duration-300 text-lg"
                                            variants={socialIconVariants}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}