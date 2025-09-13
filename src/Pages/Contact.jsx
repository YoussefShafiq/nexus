import React from 'react'
import logo from '../assets/images/logo.png'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { BsWhatsapp } from 'react-icons/bs'

export function HeroSection() {
    return <>
        <div className="bg-ServicesHeroImage py-[200px] bg-cover bg-center flex flex-col justify-center items-center text-white text-center gap-3">
            <h1 className='text-3xl lg:text-5xl font-extrabold '>Contact Us</h1>
        </div>
    </>
}

export function ContactForm() {

    const contactData = {
        email: 'support@nexus-consults.com',
        phone: '+20 1284222917',
        whatsapp: 'https://wa.me/+201284222917'
    }

    return <>
        <div className="bg-bg2 py-20 bg-cover bg-center bg-fixed">
            <div className="container flex lg:flex-row flex-col gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2  backdrop-blur-3xl"
                >
                    <form action="" className='bg-primary flex flex-col gap-6 p-8 lg:p-10 rounded-lg'>
                        <div className="w-32 m-auto">
                            <img src={logo} alt="Nexus logo" content='Nexus logo' title='Nexus logo' className='w-full' />
                        </div>
                        <div className="flex flex-col lg:flex-row lg:gap-7 w-full ">
                            <div className="flex flex-col gap-1 w-1/2">
                                <label htmlFor="first_name" className='text-white font-semibold text-lg'>First name</label>
                                <input type="text" id='first_name' name='first_name' className='w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300' placeholder='First name' />
                            </div>
                            <div className="flex flex-col gap-1 w-1/2">
                                <label htmlFor="last_name" className='text-white font-semibold text-lg'>Last name</label>
                                <input type="text" id='last_name' name='last_name' className='w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300' placeholder='Last name' />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="email" className='text-white font-semibold text-lg'>Email</label>
                            <input type="email" id='email' name='email' className='w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300' placeholder='Email' />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="phone" className='text-white font-semibold text-lg'>Phone number</label>
                            <input type="tel" id='phone' name='phone' className='w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300' placeholder='phone' />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="message" className='text-white font-semibold text-lg'>Message</label>
                            <textarea maxLength={200} id='message' name='message' className='w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300 min-h-40' placeholder='Message' />
                        </div>
                        <button className={`bg-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-in-out px-8 py-3 text-xl text-primary font-bold w-full rounded-lg capitalize`} >Submit</button>
                    </form>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 rounded-xl backdrop-blur-3xl"
                >
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-xl h-full border border-primary/20 shadow-lg backdrop-blur-3xl">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-primary transition-colors">We Here to help you</h2>
                            <p className="text-primary transition-colors">please feel free to reach out to us</p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="bg-primary/10 p-4 rounded-xl">
                                    <Mail className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm lg:text-xl text-primary transition-colors mb-1">Email</h3>
                                    <a href={`mailto:${contactData.email}`} className="text-sm lg:text-base text-black hover:text-primary transition-colors">
                                        {contactData.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="bg-primary/10 p-4 rounded-xl">
                                    <Phone className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm lg:text-xl text-primary transition-colors mb-1">Phone</h3>
                                    <a href={`tel:${contactData.phone.replace(/\s/g, '')}`} className="text-sm lg:text-base text-black hover:text-primary transition-colors">
                                        {contactData.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="bg-primary/10 p-4 rounded-xl">
                                    <BsWhatsapp className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm lg:text-xl text-primary transition-colors mb-1">Whatsapp</h3>
                                    <a href={`${contactData.whatsapp}`} className="text-sm lg:text-base text-black hover:text-primary transition-colors">
                                        {contactData.whatsapp}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="font-semibold text-xl text-primary transition-colors mb-4">Let's Connect</h3>
                            <p className="text-primary leading-relaxed">
                                Have a project in mind or want to discuss potential opportunities?
                                Feel free to reach out through the contact form or directly via email or phone.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </>
}

export default function Contact() {
    return <>
        <HeroSection />
        <ContactForm />
    </>
}
