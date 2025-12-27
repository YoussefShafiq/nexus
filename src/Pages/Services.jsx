import React, { useEffect, useState } from 'react'
import PaginationCarousel from '../reusableComponents/PaginationCarousel';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection';
import { PageSEO } from '../seo/SEO';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Custom Select Dropdown Component
const AnimatedSelectDropdown = ({
    options,
    selectedValue,
    onSelect,
    isLoading
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Fixed: Correct logic for finding selected label
    const selectedLabel = options?.find(opt => {
        const optionValue = opt.title.toLowerCase() === 'all' ? 'all' : opt.title;
        return optionValue === selectedValue;
    })?.title || 'Select Discipline';


    return (
        <div className="relative w-full mx-auto mb-6">
            {/* Custom Select Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={isLoading}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
                <span className={`font-medium ${isLoading ? 'text-gray-400' : 'text-gray-800'}`}>
                    {isLoading ? 'Loading...' : selectedLabel}
                </span>
                <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Options */}
            <div
                className={`absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="max-h-60 overflow-y-auto">
                    {options?.map((option, index) => {
                        const optionValue = option.title.toLowerCase() === 'all' ? 'all' : option.title;
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => {
                                    onSelect(optionValue);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors duration-200 ${selectedValue === optionValue
                                    ? 'bg-primary/20 text-primary font-semibold'
                                    : 'text-gray-700'
                                    } ${index !== options.length - 1 ? 'border-b border-gray-100' : ''}`}
                            >
                                {option.title}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Backdrop Click to Close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export function ServicesPagination() {
    const [filteredServices, setfilteredServices] = useState([])
    const [selectedDiscipline, setSelectedDiscipline] = useState('all')
    const [isMobile, setIsMobile] = useState(false)
    const [searchParams] = useSearchParams();
    const {discipline} = useParams();
    

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

    const processContent = (content) => {
        if (!content) return ''

        return content.replace(
            /<img([^>]+)>/g,
            '<img$1 class="cursor-zoom-in hover:opacity-90 transition-all duration-200 hover:shadow-lg" />'
        )
    }

    return (
        <div className="bg-bg2 bg-cover bg-center bg-fixed">
            <div className="container">
                <h1 className='font-bold mb-8 w-fit text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center' >
                    Our Services
                </h1>



                {/* Loading State */}
                {isLoading ? (
                    <div className='grid lg:grid-cols-4 grid-cols-1 gap-5'>
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
                    <div className="mb-8">
                        {filteredServices.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-600">No services found for the selected discipline.</p>
                            </div>
                        ) : (
                            <PaginationCarousel
                                items={filteredServices}
                                itemsPerPage={isMobile ? 1 : 4}
                                ItemsPerLine={isMobile ? 1 : 4}
                                renderItem={(s, index) => (
                                    <div
                                        key={s.id || index}
                                        className="bg-primary rounded-lg p-2 flex flex-col text-white hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full"
                                        onClick={() => navigate('/services/' + s.slug)}
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
                                            <h2 className="font-bold text-xl sm:text-2xl mb-2">{s.title}</h2>
                                            <p className='text-xs sm:text-sm opacity-90'>
                                                {s.description?.slice(0, 60) || ''}
                                                {(s.description?.length || 0) > 59 && '...'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            />
                        )}
                    </div>
                )}

                {/* disciplie sections */}
                <div className="space-y-5">
                    {disciplinesData?.data?.data && selectedDiscipline ? (
                        <>
                            {disciplinesData.data.data.find((d) =>
                                d.title?.toLowerCase() === selectedDiscipline.toLowerCase()
                            )?.sections.map((s, i) => (
                                <div key={i} className="flex flex-col w-full lg:flex-row gap-8">
                                    <div
                                        className={`content w-full ${s.image ? 'lg:w-[60%]' : 'lg:w-full'}`}
                                        dangerouslySetInnerHTML={{
                                            __html: processContent(s.content)
                                        }}
                                    />
                                    {s.image && (
                                        <div className="lg:w-[40%] w-full">
                                            <div className="relative group">
                                                <img
                                                    src={s.image}
                                                    alt={s.title}
                                                    className='w-full rounded-[12px] border-[2px] border-[#1d1e1f] transition-all duration-200 hover:shadow-lg'

                                                />
                                            </div>
                                            {s.caption && (
                                                <div className="p-3 text-center font-bold text-base text-[#334155]">
                                                    {s.caption}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : null}
                </div>


            </div>
        </div>
    );
}

export function HeroSection() {
    return <>
        <ReusableHeroSection
            name="Our Services"
            subtitle={'Precision-driven solutions from concept to construction'}
            backgroundclass="bg-ServicesHeroImage"
        />
    </>
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