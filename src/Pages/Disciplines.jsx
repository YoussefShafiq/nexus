import React, { useEffect, useState } from 'react'
import PaginationCarousel from '../reusableComponents/PaginationCarousel';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection';
import { PageSEO } from '../seo/SEO';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


export function ServicesPagination() {
    const [filteredServices, setfilteredServices] = useState([])
    const [selectedDiscipline, setSelectedDiscipline] = useState('all')
    const [isMobile, setIsMobile] = useState(false)
    const [searchParams] = useSearchParams();
    const discipline = searchParams.get('discipline');

    // Detect mobile screen
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { data: disciplinesData, isLoading: isDisciplinesLoading } = useQuery({
        queryKey: ['disciplines'],
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/api/public/disciplines');
        }
    })

    const { data: services, isLoading, isError } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await axios.get('https://nexus-consults.com/api/public/api/public/services');
            return response.data;
        }
    })

    useEffect(() => {
        if (services?.data) {
            const filtered = services.data.filter(p => {
                if (selectedDiscipline === 'all' || !selectedDiscipline) {
                    return true;
                }
                // Check if the service has the selected discipline
                return p.disciplines?.some(d => d.title === selectedDiscipline);
            });
            setfilteredServices(filtered);
        }
    }, [services?.data, selectedDiscipline])

    useEffect(() => {
        if (discipline) {
            setSelectedDiscipline(discipline);
        }
        setTimeout(() => {
            if (discipline) {
                setSelectedDiscipline(discipline);
            }
        }, 1);
    }, [discipline])




    const navigate = useNavigate();


    return (
        <div className="bg-bg2 bg-cover bg-center bg-fixed">
            <div className="container">
                <h1 className='font-bold mb-8 w-fit text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center' >
                    Our Disciplines
                </h1>

                {disciplinesData?.data?.data?.length === 0 ? (
                    <></>
                ) : (
                    <div className="flex flex-row justify-center flex-wrap gap-6">
                        {disciplinesData?.data?.data?.map((s,index)=>(
                             <div
                                key={s.id || index}
                                className="lg:w-[calc(100%/4-24px)] md:w-[calc(100%/2-24px)] w-[calc(100%)] bg-primary rounded-lg p-2 flex flex-col text-white hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                                onClick={() => { setSelectedDiscipline(s.title.toLowerCase() === 'all' ? 'all' : s.title); navigate('/services/' + s.title.replace('&', 'AND')) }}
                            >
                                <div className="overflow-hidden rounded-md">
                                    <img
                                        src={s.cover_photo}
                                        alt={s.title}
                                        title={s.title}
                                        className="hover:scale-105 transition-all duration-300 w-full h-44 object-cover"
                                    />
                                </div>
                                <div className="p-3 sm:p-5 flex-grow">
                                    <h2 className="font-bold text-xl sm:text-xl mb-2">{s.title}</h2>
                                    <p className='text-xs sm:text-sm opacity-90'>
                                        {s.description?.slice(0, 67) || ''}
                                        {(s.description?.length || 0) > 67 && '...'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}



            </div>
        </div>
    );
}

export function HeroSection() {
    return <>
        <ReusableHeroSection
            name="Our Disciplines"
            subtitle={'Precision-driven solutions from concept to construction'}
            backgroundclass="bg-ServicesHeroImage"
        />
    </>
}

export default function Disciplines() {
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