import React, { useEffect, useState } from 'react'
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
    const [filteredProjects, setfilteredProjects] = useState([])
    const [selectedDicipline, setselectedDicipline] = useState('all')
    const { data: disciplinesData, isLoading: isDisciplinesLoading } = useQuery({
        queryKey: 'disciplines',
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/api/public/disciplines')
        }
    })
    const { data: projects, isLoading, isError } = useQuery({
        queryKey: 'projects',
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/api/public/projects')
        }
    })

    useEffect(() => {
        if (projects?.data?.data) {
            setfilteredProjects(projects?.data?.data.filter(p => selectedDicipline === 'all' || selectedDicipline === '' ? true : p.disciplines?.map(d => d.title).includes(selectedDicipline)))
        }
    }, [projects, selectedDicipline])

    const navigate = useNavigate();

    return (
        <div className="bg-bg2 bg-cover bg-center bg-fixed">
            <div className="container">
                <h1 className='font-bold mb-8 w-fit text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center'>Our projects</h1>

                <div className="container !px-3 !py-2 flex flex-wrap justify-center gap-4 mb-5">
                    <button key={'all'} onClick={() => setselectedDicipline('all')} className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${selectedDicipline === 'all' ? 'bg-primary text-white' : 'bg-white/50 text-black hover:bg-primary/50 hover:text-white'}`}>
                        All
                    </button>
                    {disciplinesData?.data?.data.map((d, i) => (
                        <button key={i} onClick={() => setselectedDicipline(d.title.toLowerCase() === 'all' ? 'all' : d.title)} className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${selectedDicipline === (d.title.toLowerCase() === 'all' ? 'all' : d.title) ? 'bg-primary text-white' : 'bg-white/50 text-black hover:bg-primary/50 hover:text-white'}`}>
                            {d.title}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className='grid lg:grid-cols-4 grid-cols-1 gap-5'>
                        {/* Skeleton Card 1 */}
                        <div className="bg-white rounded-lg p-2 flex flex-col animate-pulse">
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

                        {/* Skeleton Card 2 */}
                        <div className="bg-white rounded-lg p-2 flex flex-col animate-pulse">
                            <div className="overflow-hidden rounded-md bg-gray-200 h-44 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                            </div>
                            <div className="p-3 sm:p-5 space-y-3">
                                <div className="h-6 bg-gray-200 rounded w-4/5"></div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            </div>
                        </div>

                        {/* Skeleton Card 3 */}
                        <div className="bg-white rounded-lg p-2 flex flex-col animate-pulse">
                            <div className="overflow-hidden rounded-md bg-gray-200 h-44 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                            </div>
                            <div className="p-3 sm:p-5 space-y-3">
                                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>

                        {/* Skeleton Card 4 */}
                        <div className="bg-white rounded-lg p-2 flex flex-col animate-pulse">
                            <div className="overflow-hidden rounded-md bg-gray-200 h-44 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                            </div>
                            <div className="p-3 sm:p-5 space-y-3">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                                    <div className="h-3 bg-gray-200 rounded w-3/5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {filteredProjects?.length > 0 ? <>
                            <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
                                {filteredProjects?.map((p, i) => (<>
                                    <div className="bg-primary rounded-lg p-2 flex flex-col text-white hover:scale-[1.02] transition-all duration-300 cursor-pointer" onClick={() => navigate('/projects/' + p.slug)}>
                                        <div className="overflow-hidden rounded-md">
                                            <img
                                                src={p.cover_photo}
                                                alt={p.title}
                                                title={p.title}
                                                className="hover:scale-105 transition-all duration-300 w-full h-44 object-cover"
                                            />
                                        </div>
                                        <div className="p-3 sm:p-5">
                                            <h2 className="font-bold text-xl sm:text-2xl">{p.title}</h2>
                                            <p className='text-xs sm:text-sm opacity-90'>{p.description.slice(0, 60)} {p.description.length > 59 && '...'}</p>
                                        </div>
                                    </div>
                                </>))}
                            </div>
                        </> : <div className='text-black/60 text-center'>No projects available in this dicipline.</div>}
                    </>

                )}
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
