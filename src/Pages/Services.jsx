import React from 'react'
import serviceimg from '../assets/images/services/marine.png'
import PaginationCarousel from '../reusableComponents/PaginationCarousel';
import { useNavigate } from 'react-router-dom';
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection';
import { PageSEO } from '../seo/SEO';


export function HeroSection() {
    return <>
        <ReusableHeroSection name="Our Services" subtitle={'Precision-driven solutions from concept to construction'} backgroundclass="bg-ServicesHeroImage" />
    </>
}

export function ServicesPagination() {
    const services = [
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
    ]
    const navigate = useNavigate();
    return (
        <div className="bg-bg2 bg-cover bg-center bg-fixed">
            <div className="container">
                <h1 className='font-bold mb-8 w-fit text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center' >Our Services</h1>

                <PaginationCarousel
                    items={services}
                    itemsPerPage={4}
                    ItemsPerLine={4}
                    renderItem={(s, index) => (
                        <div className="bg-primary rounded-lg p-2 flex flex-col text-white hover:scale-[1.02] transition-all duration-300 cursor-pointer" onClick={() => navigate('/services/' + s.slug)}>
                            <div className="overflow-hidden rounded-md">
                                <img
                                    src={s.img}
                                    alt={s.title}
                                    className="hover:scale-105 transition-all duration-300 w-full"
                                />
                            </div>
                            <div className="p-3 sm:p-5">
                                <h2 className="font-bold text-xl sm:text-2xl">{s.title}</h2>
                                <p className="text-xs sm:text-sm opacity-90">{s.subtitle}</p>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export default function Services() {
    return <>
        <PageSEO
            title="Services — NEXUS Engineering Consultancy"
            description="Explore NEXUS services across marine & offshore, oil & gas, industrial, and architectural sectors. Precision-driven solutions from concept to construction."
            image="/Logo.png"
        />
        <HeroSection />
        <ServicesPagination />
    </>
}
