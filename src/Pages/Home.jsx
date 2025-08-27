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
            <div className=""></div>
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
        // arrows: false
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
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

            <div className="text-center pb-10">
                <h1 className='font-bold text-4xl'>Our Services</h1>
                <p className='font-semibold text-xl opacity-60'>Precision engineering solutions for complex industrial challenges</p>

            </div>
            <Slider {...settings}>
                {services.map((s, index) => (
                    <div key={index} className='px-3'>
                        <div className="bg-primary rounded-2xl  flex flex-col text-white cursor-pointer">
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
        </div>
    </>
}

export default function Home() {
    return <>
        <HeroSection />
        <OurServices />

    </>
}
