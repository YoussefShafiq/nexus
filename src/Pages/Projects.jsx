import React from 'react'
import PaginationCarousel from '../reusableComponents/PaginationCarousel';
import { useNavigate } from 'react-router-dom';
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection';
import { PageSEO } from '../seo/SEO';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


export function HeroSection() {
    return <>
        <ReusableHeroSection name="Our projects" subtitle={'Precision-driven solutions from concept to construction'} backgroundclass="bg-ServicesHeroImage" />
    </>
}

export function ProjectsPagination() {
    const { data: projects, isLoading, isError } = useQuery({
        queryKey: 'projects',
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/projects')
        }
    })

    const navigate = useNavigate();
    return (
        <div className="bg-bg2 bg-cover bg-center bg-fixed">
            <div className="container">
                <h1 className='font-bold mb-8 w-fit text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center' >Our projects</h1>
                {isLoading ? <div className='grid lg:grid-cols-4 grid-cols-1 gap-8'>
                    <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
                </div> :
                    <PaginationCarousel
                        items={projects?.data?.data}
                        itemsPerPage={4}
                        ItemsPerLine={4}
                        renderItem={(s, index) => (
                            <div className="bg-primary rounded-lg p-2 flex flex-col text-white hover:scale-[1.02] transition-all duration-300 cursor-pointer" onClick={() => navigate('/projects/' + s.slug)}>
                                <div className="overflow-hidden rounded-md">
                                    <img
                                        src={s.cover_photo}
                                        alt={s.title}
                                        title={s.title}
                                        className="hover:scale-105 transition-all duration-300 w-full h-52 object-cover"
                                    />
                                </div>
                                <div className="p-3 sm:p-5">
                                    <h2 className="font-bold text-xl sm:text-2xl">{s.title}</h2>
                                    <p className="text-xs sm:text-sm opacity-50">{s.description}</p>
                                </div>
                            </div>
                        )}
                    />
                }
            </div>
        </div>
    );
}

export default function projects() {
    return <>
        <PageSEO
            title="projects — NEXUS Engineering Consultancy"
            description="Explore NEXUS projects across marine & offshore, oil & gas, industrial, and architectural sectors. Precision-driven solutions from concept to construction."
            image="/Logo.png"
        />
        <HeroSection />
        <ProjectsPagination />
    </>
}
