import React from 'react'
import logo from '../assets/images/icon.png'
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Footer() {
    return <>
        <div className="bg-bg2 bg-cover bg-fixed bg-center">
            <div className="h-[1px] bg-black/5"></div>
            <div className="container !py-0">
                <div className="flex flex-col items-center gap-4 py-10">
                    <h2 className='text-4xl font-bold text-primary text-center'>NEXUS Company. We’re here</h2>
                    <p className=' text-primary'>Hello, we are NEXUS. trying to make an effort to put the right people for you to get the best results. Just insight</p>
                    <div className="flex items-center lg:gap-16 gap-5">
                        {/* <div className="rounded-xl bg-primary px-3 py-1 text-white">👀  Insights</div> */}
                        <Link to={'/contact'} className="rounded-xl bg-primary px-3 py-1 text-white flex items-center gap-2"><MdEmail className='text-yellow-500' />  Contact Us</Link>
                    </div>
                </div>
                <div className="w-full h-[2px] bg-black/10 my-5"></div>
                <div className="flex justify-between items-center lg:py-5">
                    <div className="bg-primary  w-[40px] lg:w-[50px] p-2.5 rounded-lg">
                        <img src={logo} alt="" />
                    </div>
                    <p className='text-black/40 text-xs hidden lg:block'>&copy; 2024 NEXUS. All rights reserved.</p>
                    <div className="flex items-center gap-2 text-primary text-2xl w-[50px]">
                        <a href="https://wa.me/+201284222917" target='_blank' rel='noreferrer'>
                            <FaWhatsapp className='hover:text-green-100 transition-colors duration-300 cursor-pointer hover:bg-green-500 rounded-full hover:shadow-lg hover:scale-105' />
                        </a>
                        <a href="https://www.linkedin.com/company/nexus-for-engineering-consultancy-bim-solutions">
                            <FaLinkedin className='hover:text-blue-800 transition-colors duration-300 cursor-pointer hover:bg-white rounded-sm hover:shadow-lg hover:scale-105' />
                        </a>
                    </div>
                </div>
                <p className='text-black/40 text-xs lg:hidden m-auto text-center pb-2'>&copy; 2024 NEXUS. All rights reserved.</p>
            </div>
        </div>
    </>
}
