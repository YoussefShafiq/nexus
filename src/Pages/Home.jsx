import React from 'react'
import heroImg from '../assets/images/HeroImage.png'
import PrimaryButton from '../buttons/PrimaryButton'
import Slider from 'react-slick';
import serviceimg from '../assets/images/services/marine.png'

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

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
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
                    <div key={index} className='px-3 pb-8'>
                        <div className="bg-primary rounded-2xl p-2 flex flex-col text-white cursor-pointer">
                            <div className="overflow-hidden rounded-lg">
                                <img src={s.img} alt={s.title} className='hover:scale-105 transition-all' />
                            </div>
                            <div className="p-5">
                                <h2 className='font-bold text-2xl'>{s.title}</h2>
                                <p className='text-sm opacity-90'>{s.subtitle}</p>
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

    

    return <>
        <div className="container py-14">

            <div className="text-center pb-10 space-y-5">
                <h1 className='font-bold text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center' >About Us</h1>
                <div className="space-y-2">
                    <p className='font-semibold text-xl opacity-60'>Engineering Excellence Since 1991</p>
                    <p className='font-base lg:w-2/3 m-auto text-center'>With 32+ years of experience, NEXUS delivers precision engineering solutions for oil & gas, industrial, and architectural projects—combining cutting-edge BIM technology with strict compliance to global standards.</p>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3">

            </div>


            <PrimaryButton text={'Meet Our Team'} key={'Meet Our Team button'} path={'/about-us'} className={'!m-auto block'} />
        </div>
    </>
}

export default function Home() {
    return <>
        <HeroSection />
        <OurServices />
        <Aboutus />

    </>
}
