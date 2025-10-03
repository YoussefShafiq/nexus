import React from 'react'
import PaginationCarousel from '../reusableComponents/PaginationCarousel';
import { useNavigate } from 'react-router-dom';
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection';
import { PageSEO } from '../seo/SEO';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


export function HeroSection() {
    return <>
        <ReusableHeroSection name="Our Services" subtitle={'Precision-driven solutions from concept to construction'} backgroundclass="bg-ServicesHeroImage" />
    </>
}

export function ServicesPagination() {
    const { data: services, isLoading, isError } = useQuery({
        queryKey: 'services',
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/services')
        }
    })

    const navigate = useNavigate();
    return (
        <div className="bg-bg2 bg-cover bg-center bg-fixed">
            <div className="container">
                <h1 className='font-bold mb-8 w-fit text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center' >Our Services</h1>
                {isLoading ? <div className='grid lg:grid-cols-4 grid-cols-1 gap-8'>
                    <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
                </div> :
                    <PaginationCarousel
                        items={services?.data?.data}
                        itemsPerPage={4}
                        ItemsPerLine={4}
                        renderItem={(s, index) => (
                            <div className="bg-primary rounded-lg p-2 flex flex-col text-white hover:scale-[1.02] transition-all duration-300 cursor-pointer" onClick={() => navigate('/services/' + s.slug)}>
                                <div className="overflow-hidden rounded-md">
                                    <img
                                        src={s.cover_photo}
                                        alt={s.title}
                                        title={s.title}
                                        className="hover:scale-105 transition-all duration-300 w-full h-44 object-cover"
                                    />
                                </div>
                                <div className="p-3 sm:p-5">
                                    <h2 className="font-bold text-xl sm:text-2xl">{s.title}</h2>
                                    <p className='text-xs sm:text-sm opacity-90'>{s.description.slice(0, 60)} {s.description.length > 59 && '...'}</p>
                                </div>
                            </div>
                        )}
                    />
                }
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
