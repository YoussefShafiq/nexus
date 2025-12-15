import React, { useState, useEffect } from 'react'
import img1 from '../assets/images/cab_home-1080x675.jpg'
import img2 from '../assets/images/Piping-Design.png'
import PrimaryButton from '../buttons/PrimaryButton'
import Slider from 'react-slick';
import serviceimg from '../assets/images/services/marine.png'
import { PiCertificate } from 'react-icons/pi';
import { RiBox3Line } from 'react-icons/ri';
import { FaLeaf } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ImageIcon } from 'lucide-react';
import SectionHeading from '../reusableComponents/SectionHeading';
import { PageSEO } from '../seo/SEO';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export function HeroSection() {
    return <>
        <div className="bg-homeHero bg-no-repeat bg-cover min-h-[700px] lg:pt-40 pt-32 pb-32 text-white relative">
            <div className="absolute h-full inset-0 bg-black/60"></div>
            <div className="container flex items-center flex-col lg:flex-row gap-16 relative z-10">
                <div className="lg:w-1/2 flex flex-col gap-5">
                    <h1 className='font-extrabold text-4xl'>NEXUS:  Where Expertise Meets Innovation</h1>
                    <p className='text-xl'>Delivering advanced, reliable engineering solutions for oil & gas, industrial, and residential projects.</p>
                    <p className='text-xl'>32+ years of experience</p>
                    <PrimaryButton text={'Explore Our Projects'} path={'/projects'} />
                </div>
                <div className="lg:w-1/2 flex justify-center items-center relative">
                    <div className="pb-16 ps-12">
                        <img src={img1} className='w-full h-full object-cover rounded-xl' />
                    </div>
                    <div className="absolute w-1/2 bottom-0 left-0">
                        <img src={img2} className='w-full h-full object-cover rounded-xl' />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export function OurServices({ services, isLoading }) {
    const [slidesToShow, setSlidesToShow] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            // Set isMobile to true only for screens smaller than 1024px
            setIsMobile(width < 1024);

            // Adjust slidesToShow based on mobile screen sizes
            if (width < 768) {
                setSlidesToShow(1);
            } else if (width < 1024) {
                setSlidesToShow(2); // For tablets
            }
            // We don't need else cases since slider is only for mobile/tablet
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2500,
        cssEase: "linear",
        adaptiveHeight: true,
        variableWidth: false
    };

    const navigate = useNavigate();


    const { data: disciplinesData, isLoading: isDisciplinesLoading } = useQuery({
        queryKey: ['disciplines'],
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/api/public/disciplines');
        }
    })

    useEffect(() => {
        console.log(disciplinesData?.data?.data?.filter(d => d.show_on_home == true));

    }, [disciplinesData])



    return (
        <div className="bg-bg2 bg-no-repeat bg-cover bg-fixed">
            <div className="container">
                <SectionHeading
                    title="Our Services"
                    subtitle="Precision engineering solutions for complex industrial challenges"
                />

                {isLoading ? (
                    // Loading skeletons remain the same
                    <div className='grid lg:grid-cols-4 grid-cols-1 gap-5 mb-14'>
                        {/* Skeleton Cards - same as before */}
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg p-2 flex flex-col animate-pulse">
                                <div className="overflow-hidden rounded-md bg-gray-200 h-44 relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                                </div>
                                <div className="p-3 sm:p-5 space-y-3">
                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Grid layout for desktop (1024px and above) */}
                        <div className="hidden lg:grid grid-cols-3 max-w-[920px] m-auto mb-14 gap-y-5">
                            {disciplinesData?.data?.data?.filter(d => d.show_on_home == true).slice(0, 6).map((service, index) => (
                                <div
                                    key={service.id || index}
                                    onClick={() => navigate('/services/' + '?discipline=' + service.title.replace('&', 'AND'))}
                                    className='px-2 sm:px-3'
                                >
                                    <div className="bg-primary h-full backdrop-blur-lg rounded-lg p-2 flex flex-col text-white cursor-pointer mx-1 sm:mx-0 hover:scale-[1.02] transition-all duration-300">
                                        <div className="overflow-hidden rounded-md h-44">
                                            <img
                                                src={service.cover_photo}
                                                alt={service.title}
                                                className='hover:scale-105 transition-all duration-300 w-full h-full object-cover object-center'
                                            />
                                        </div>
                                        <div className="p-3 sm:p-5">
                                            <h2 className='font-bold text-xl sm:text-2xl'>{service.title}</h2>
                                            <p className='text-xs sm:text-sm opacity-90'>
                                                {service?.description?.slice(0, 60)}
                                                {service?.description?.length > 59 && '...'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Slider layout only for mobile/tablet (below 1024px) */}
                        {isMobile && (
                            <div className="lg:hidden mb-14">
                                <Slider {...sliderSettings}>
                                    {services?.map((service, index) => (
                                        <div
                                            key={service.id || index}
                                            onClick={() => navigate('/services/' + service.slug)}
                                            className='px-2 sm:px-3 py-8 focus:outline-none'
                                        >
                                            <div className="bg-primary backdrop-blur-lg rounded-lg p-2 flex flex-col text-white cursor-pointer mx-1 sm:mx-0 hover:scale-[1.02] transition-all duration-300 h-full">
                                                <div className="overflow-hidden rounded-md h-44">
                                                    <img
                                                        src={service.cover_photo}
                                                        alt={service.title}
                                                        className='hover:scale-105 transition-all duration-300 w-full h-full object-cover object-center'
                                                    />
                                                </div>
                                                <div className="p-3 sm:p-5">
                                                    <h2 className='font-bold text-xl sm:text-2xl'>{service.title}</h2>
                                                    <p className='text-xs sm:text-sm opacity-90'>
                                                        {service?.description?.slice(0, 60)}
                                                        {service?.description?.length > 59 && '...'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        )}
                    </>
                )}

                <PrimaryButton
                    text={'See More'}
                    key={'Services See more button'}
                    path={'/services'}
                    className={'!m-auto block'}
                />
            </div>
        </div>
    );
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
            title: 'Precision Digital Modeling',
            desc: 'BIM Coordination: Clash detection for admin buildings, pedestrian bridges'
        },
        {
            icon: <FaLeaf />,
            title: 'Sustainable Design Solutions',
            desc: 'LEED-certified admin/commercial buildings'
        },
    ]

    return <>
        <div className="bg-bridgeBg bg-no-repeat bg-cover bg-fixed">
            <div className="container">

                <SectionHeading title="About Us" subtitle="Engineering Excellence Since 1991" pbFlag={false} />
                <p className='text-lg lg:w-4/5 text-center m-auto'>With <strong>32+ years of experience</strong>, NEXUS delivers precision engineering solutions for oil & gas, industrial, and architectural projects—combining cutting-edge BIM technology with strict compliance to global standards.</p>

                <div className="flex flex-col md:flex-row gap-5 mb-5 mt-8">
                    {AboutUsPoints.map((p, i) => (
                        <div key={i} className="bg-white/40 backdrop-blur-sm shadow-lg text-primary p-8 rounded-md w-full md:w-1/3 flex flex-col gap-2">
                            <div className="text-5xl flex justify-center">
                                {p.icon}
                            </div>
                            <p className='text-center font-bold text-xl'>{p.title}</p>
                        </div>
                    ))}
                </div>


                <PrimaryButton text={'Meet Our Team'} key={'Meet Our Team button'} path={'/about-us'} className={'!m-auto block'} />
            </div>
        </div>
    </>
}

export function Testimonials({ testimonials, isLoading }) {

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


    return <>
        <div className="bg-bg2 bg-no-repeat bg-cover bg-fixed">
            <div className="container">

                <SectionHeading title="Testimonials" />

                <Slider {...settings} className=' lg:w-2/3 m-auto rounded-lg overflow-hidden '>
                    {testimonials?.map((s, index) => (
                        <div key={index} className='px-2 sm:px-3 pb-8 '>
                            <div className="bg-primary min-h-[350px] rounded-lg p-8 flex flex-col items-center justify-between text-center text-white cursor-pointer mx-1 sm:mx-0 gap-3">
                                <div className="flex flex-col items-center gap-5">
                                    <div className="overflow-hidden rounded-full w-24 aspect-square ">
                                        <img src={s.image} alt={s.title} className='hover:scale-105 transition-all w-full' />
                                    </div>
                                    <h2 className='font-base md:text-lg font-semibold italic'>{s.message}</h2>
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
        </div>
    </>
}

export function BestProjects({ projects, isLoading }) {

    const navigate = useNavigate()



    return <>
        <div className="bg-bridgeBg bg-no-repeat bg-cover bg-fixed">
            <div className="container">
                <SectionHeading title="Latest Projects" subtitle="Delivering excellence in engineering across industries" />

                <div className="flex flex-col md:flex-row flex-wrap mb-5">
                    {projects?.slice(0, 6).map((p, i) => (
                        <div
                            key={p.id}
                            className="w-full md:w-1/3 p-3"
                            data-aos="fade-up"
                            data-aos-delay={(i % 3) * 150}
                        >
                            <div className="relative h-56 rounded-lg overflow-hidden group cursor-pointer bg-primary/40 backdrop-blur-sm" onClick={() => { navigate(`/projects/${p.slug}`) }} >
                                <ImageIcon className='absolute -z-10 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white/50' size={50} />
                                <img
                                    src={p.cover_photo}
                                    alt={p.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h2 className="text-white font-bold text-lg text-center px-2">
                                        {p.title}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <PrimaryButton text={'See More'} key={'Our Projects'} path={'/projects'} className={'!m-auto block'} />
            </div>
        </div>
    </>
}

export default function Home() {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['home'],
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/api/public/home')
        }
    })

    return <>
        <PageSEO
            title="Nexus — Engineering Consultancy"
            description="NEXUS delivers precision engineering solutions across oil & gas, industrial, and architectural projects. Explore our services, projects, and client testimonials."
            image="/Logo.png"
        />
        <HeroSection />
        <OurServices services={data?.data?.data?.services} isLoading={isLoading} />
        <Aboutus />
        {data?.data?.data?.testimonials?.length > 0 && <Testimonials testimonials={data?.data?.data?.testimonials} />}
        <BestProjects projects={data?.data?.data?.projects} />
    </>
}
