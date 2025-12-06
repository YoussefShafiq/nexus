import React, { useEffect, useState } from 'react'
import PaginationCarousel from '../reusableComponents/PaginationCarousel';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection';
import { PageSEO } from '../seo/SEO';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Custom Select Dropdown Component (same as in Services)
const AnimatedSelectDropdown = ({
    options = [],
    selectedValue,
    onSelect,
    isLoading
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Add "All" option to the beginning for Projects
    const allOptions = [{ id: 'all', title: 'All' }, ...options];

    const selectedLabel = allOptions.find(opt => {
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
                    {allOptions.map((option, index) => {
                        const optionValue = option.title.toLowerCase() === 'all' ? 'all' : option.title;
                        return (
                            <button
                                key={option.id || index}
                                type="button"
                                onClick={() => {
                                    onSelect(optionValue);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors duration-200 ${selectedValue === optionValue
                                    ? 'bg-primary/20 text-primary font-semibold'
                                    : 'text-gray-700'
                                    } ${index !== allOptions.length - 1 ? 'border-b border-gray-100' : ''}`}
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

export function HeroSection() {
    return <>
        <ReusableHeroSection
            name="Our Projects"
            subtitle={'Precision-driven solutions from concept to construction'}
            backgroundclass="bg-ServicesHeroImage"
        />
    </>
}

export function ProjectsPagination() {
    const [filteredProjects, setFilteredProjects] = useState([])
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

    const { data: projects, isLoading, isError } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await axios.get('https://nexus-consults.com/api/public/api/public/projects');
            return response.data;
        }
    })

    useEffect(() => {
        if (projects?.data) {
            const filtered = projects.data.filter(p => {
                if (selectedDiscipline === 'all' || !selectedDiscipline) {
                    return true;
                }
                // Check if the project has the selected discipline
                return p.disciplines?.some(d => d.title === selectedDiscipline);
            });
            setFilteredProjects(filtered);
        }
    }, [projects?.data, selectedDiscipline])

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
                <h1 className='font-bold mb-8 w-fit text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center'>
                    Our Projects
                </h1>

                {/* Mobile Dropdown */}
                <div className="lg:hidden">
                    <AnimatedSelectDropdown
                        options={disciplinesData?.data?.data || []}
                        selectedValue={selectedDiscipline}
                        onSelect={setSelectedDiscipline}
                        isLoading={isDisciplinesLoading}
                    />
                </div>

                {/* Desktop Buttons */}
                <div className="hidden lg:flex container !px-3 !py-2 flex-wrap justify-center gap-4 mb-5">
                    <button
                        key={'all'}
                        onClick={() => setSelectedDiscipline('all')}
                        className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${selectedDiscipline === 'all'
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-white/50 text-black hover:bg-primary/50 hover:text-white hover:shadow-md'
                            }`}
                    >
                        All
                    </button>
                    {disciplinesData?.data?.data?.map((d, i) => {
                        const disciplineValue = d.title.toLowerCase() === 'all' ? 'all' : d.title;
                        return (
                            <button
                                key={i}
                                onClick={() => setSelectedDiscipline(disciplineValue)}
                                className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${selectedDiscipline === disciplineValue
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-white/50 text-black hover:bg-primary/50 hover:text-white hover:shadow-md'
                                    }`}
                            >
                                {d.title}
                            </button>
                        );
                    })}
                </div>

                <div className="text-center lg:w-2/3 m-auto text-primary font-semibold text-lg">
                    {disciplinesData?.data?.data && selectedDiscipline ? (
                        <>
                            {disciplinesData.data.data.find((d) =>
                                d.title?.toLowerCase() === selectedDiscipline.toLowerCase()
                            )?.description}
                        </>
                    ) : null}
                </div>

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
                    <>
                        {filteredProjects.length > 0 ? (
                            <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
                                {filteredProjects.map((p, i) => (
                                    <div
                                        key={p.id || i}
                                        className="bg-primary rounded-lg p-2 flex flex-col text-white hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full"
                                        onClick={() => navigate('/projects/' + p.slug)}
                                    >
                                        <div className="overflow-hidden rounded-md">
                                            <img
                                                src={p.cover_photo}
                                                alt={p.title}
                                                title={p.title}
                                                className="hover:scale-105 transition-all duration-300 w-full h-44 object-cover"
                                            />
                                        </div>
                                        <div className="p-3 sm:p-5 flex-grow">
                                            <h2 className="font-bold text-xl sm:text-2xl mb-2">{p.title}</h2>
                                            <p className='text-xs sm:text-sm opacity-90'>
                                                {p.description?.slice(0, 60) || ''}
                                                {(p.description?.length || 0) > 59 && '...'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='text-black/60 text-center py-8'>
                                No projects available in this discipline.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default function Projects() {
    return (
        <>
            <PageSEO
                title="Projects — NEXUS Engineering Consultancy"
                description="Explore NEXUS projects across marine & offshore, oil & gas, industrial, and architectural sectors. Precision-driven solutions from concept to construction."
                image="/Logo.png"
            />
            <HeroSection />
            <ProjectsPagination />
        </>
    );
}