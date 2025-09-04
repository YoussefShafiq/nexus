import React, { useState, useEffect } from 'react'
import heroImg from '../assets/images/HeroImage.png'
import PrimaryButton from '../buttons/PrimaryButton'
import Slider from 'react-slick';
import serviceimg from '../assets/images/services/marine.png'
import { PiCertificate } from 'react-icons/pi';
import { RiBox3Line } from 'react-icons/ri';
import { FaLeaf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
    return <>
        <div className="bg-homeHero bg-no-repeat bg-cover min-h-[700px] lg:pt-40 pt-32 pb-32 text-white">
            <div className="container flex items-center flex-col lg:flex-row gap-16 ">
                <div className="lg:w-1/2 flex flex-col gap-5">
                    <h1 className='font-extrabold text-4xl'>NEXUS:  Where Expertise Meets Innovation</h1>
                    <p className='text-xl'>Delivering advanced, reliable engineering solutions for oil & gas, industrial, and residential projects.</p>
                    <p className='text-xl'>32+ years of experience</p>
                    <PrimaryButton text={'Explore Our Projects'} path={'/projects'} />
                </div>
                <div className="lg:w-1/2 flex justify-center items-center">
                    <img src={heroImg} alt="" />
                </div>
            </div>
        </div>
    </>
}

export function OurServices() {
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setSlidesToShow(1);
            } else if (width < 1024) {
                setSlidesToShow(2);
            } else if (width < 1280) {
                setSlidesToShow(3);
            } else {
                setSlidesToShow(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        adaptiveHeight: true,
        variableWidth: false
    };

    const services = [
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
    ]

    return <>
        <div className="container py-14">

            <div className="text-center pb-10 space-y-5">
                <h1 className='font-bold text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center' >Our Services</h1>
                <div className="">
                    <p className='font-semibold text-xl opacity-60'>Precision engineering solutions for complex industrial challenges</p>
                </div>
            </div>
            <Slider {...settings} className='mb-14'>
                {services.map((s, index) => (
                    <div key={index} className='px-2 sm:px-3 py-8'>
                        <div className="bg-primary rounded-lg p-2 flex flex-col text-white cursor-pointer mx-1 sm:mx-0 hover:scale-[1.02] transition-all duration-300">
                            <div className="overflow-hidden rounded-md">
                                <img src={s.img} alt={s.title} className='hover:scale-105 transition-all duration-300 w-full' />
                            </div>
                            <div className="p-3 sm:p-5">
                                <h2 className='font-bold text-xl sm:text-2xl'>{s.title}</h2>
                                <p className='text-xs sm:text-sm opacity-90'>{s.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <PrimaryButton text={'See More'} key={'Services See more button'} path={'/services'} className={'!m-auto block'} />
        </div>
    </>
}

export function Aboutus() {

    const AboutUsPoints = [
        {
            icon: <PiCertificate />,
            title: 'Code-Compliant Engineering',
            desc: 'Design of oil/gas facilities, storage tanks & pressure vessels'
        },
        {
            icon: <RiBox3Line />,
            title: 'Code-Compliant Engineering',
            desc: 'Design of oil/gas facilities, storage tanks & pressure vessels'
        },
        {
            icon: <FaLeaf />,
            title: 'Code-Compliant Engineering',
            desc: 'Design of oil/gas facilities, storage tanks & pressure vessels'
        },
    ]

    return <>
        <div className="container py-14">

            <div className="text-center pb-10 space-y-5">
                <h1 className='font-bold text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center' >About Us</h1>
                <div className="space-y-2">
                    <p className='font-semibold text-xl opacity-60'>Engineering Excellence Since 1991</p>
                    <p className='font-base lg:w-2/3 m-auto text-center'>With 32+ years of experience, NEXUS delivers precision engineering solutions for oil & gas, industrial, and architectural projects—combining cutting-edge BIM technology with strict compliance to global standards.</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 mb-5">
                {AboutUsPoints.map((p, i) => (
                    <div key={i} className="bg-primary text-white p-8 rounded-md w-full md:w-1/3 flex flex-col gap-2">
                        <div className="text-5xl flex justify-center">
                            {p.icon}
                        </div>
                        <p className='text-center font-bold text-xl'>{p.title}</p>
                    </div>
                ))}
            </div>


            <PrimaryButton text={'Meet Our Team'} key={'Meet Our Team button'} path={'/about-us'} className={'!m-auto block'} />
        </div>
    </>
}

export function Testimonials() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        adaptiveHeight: true,
        variableWidth: false
    };

    const testimonials = [
        {
            name: 'Amr Shouman',
            img: serviceimg,
            sector: 'Oil & Gas Sector',
            // title: 'Project Manager',
            desc: 'NEXUS delivered API 650-compliant LPG storage terminals ahead of schedule, with zero non-conformities during ADNOC inspections'
        },
        {
            name: 'Amr Shouman',
            img: serviceimg,
            sector: 'Oil & Gas Sector',
            title: 'Project Manager',
            desc: 'NEXUS delivered API 650-compliant LPG storage terminals ahead of schedule, with zero non-conformities during ADNOC inspections'
        },

    ]

    return <>
        <div className="container py-14">

            <div className="text-center pb-10 space-y-5">
                <h1 className='font-bold text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center' >Testimonials</h1>
            </div>
            <Slider {...settings} className=' lg:w-2/3 m-auto rounded-lg overflow-hidden '>
                {testimonials.map((s, index) => (
                    <div key={index} className='px-2 sm:px-3 pb-8 '>
                        <div className="bg-primary min-h-[350px] rounded-lg p-8 flex flex-col items-center justify-between text-center text-white cursor-pointer mx-1 sm:mx-0 gap-3">
                            <div className="flex flex-col items-center gap-5">
                                <div className="overflow-hidden rounded-full w-24 aspect-square ">
                                    <img src={s.img} alt={s.title} className='hover:scale-105 transition-all w-full' />
                                </div>
                                <h2 className='font-base md:text-lg font-semibold italic'>{s.desc}</h2>
                            </div>
                            <div className="">
                                <h2 className='font-bold text-xl sm:text-2xl'>{s.name}</h2>
                                <p className='text-xs sm:text-sm opacity-90'>{s.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <PrimaryButton text={'See More'} key={'Services See more button'} path={'/services'} className={'!m-auto block'} />
        </div>
    </>
}

export function BestProjects() {

    const navigate = useNavigate()

    const projects = [
        {
            id: 1,
            img: serviceimg,
            name: 'Code-Compliant Engineering',
            slug: 'project-1',
        },
        {
            id: 1,
            img: serviceimg,
            name: 'Code-Compliant Engineering',
            slug: 'project-1',
        },
        {
            id: 1,
            img: serviceimg,
            name: 'Code-Compliant Engineering',
            slug: 'project-1',
        },
        {
            id: 1,
            img: serviceimg,
            name: 'Code-Compliant Engineering',
            slug: 'project-1',
        },
        {
            id: 1,
            img: serviceimg,
            name: 'Code-Compliant Engineering',
            slug: 'project-1',
        },
        {
            id: 1,
            img: serviceimg,
            name: 'Code-Compliant Engineering',
            slug: 'project-1',
        },

    ]

    return <>
        <div className="bg-bestProjecttsBackground bg-no-repeat bg-cover bg-fixed">
            <div className="container py-14">
                <div className="text-center pb-10 space-y-5">
                    <h1 className='font-bold text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center' >Best projects</h1>
                    <div className="space-y-2">
                        <p className='font-semibold text-xl opacity-60'>Delivering excellence in engineering across industries</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row flex-wrap mb-5">
                    {projects.map((p, i) => (
                        <div
                            key={p.id}
                            className="w-full md:w-1/3 p-3"
                            data-aos="fade-up"
                            data-aos-delay={(i % 3) * 150}
                        >
                            <div className="relative h-56 rounded-lg overflow-hidden group cursor-pointer" onClick={() => { navigate(`/project/${p.slug}`) }} >
                                <img
                                    src={p.img}
                                    alt={p.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h2 className="text-white font-bold text-lg text-center px-2">
                                        {p.name}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <PrimaryButton text={'See More'} key={'Our Projects'} path={'/our-projects'} className={'!m-auto block'} />
            </div>
        </div>
    </>
}

export default function Home() {
    return <>
        <HeroSection />
        <OurServices />
        <Aboutus />
        <Testimonials />
        <BestProjects />
    </>
}
