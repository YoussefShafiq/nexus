import React from 'react'
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection'
import logo from '../assets/images/icon.png'
import { useNavigate } from 'react-router-dom'
import { Dot } from 'lucide-react'
import PrimaryButton from '../buttons/PrimaryButton'
import { PageSEO } from '../seo/SEO'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


export function HeroSection() {
    return <>
        <ReusableHeroSection name="Careers at NEXUS" />
    </>
}

export function AvilableJobs() {
    const navigate = useNavigate()

    const { data: jobs, isLoading, isError, error } = useQuery({
        queryKey: ['jobs'],
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/api/public/jobs')
        }
    })

    if (isError) {
        return (
            <>
                <div className="container flex justify-center items-center min-h-64">
                    <div className="text-red-600 bg-red-200 px-10 py-2 rounded-lg text-lg">
                        {error?.response?.data?.message || 'an error occurred.'}
                    </div>
                </div>
            </>
        )
    }

    return <>
        <div className="container">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                {isLoading &&
                    <>
                        <div className="h-32 w-full bg-gray-200 animate-pulse rounded-xl"></div>
                        <div className="h-32 w-full bg-gray-200 animate-pulse rounded-xl"></div>
                        <div className="h-32 w-full bg-gray-200 animate-pulse rounded-xl"></div>
                        <div className="h-32 w-full bg-gray-200 animate-pulse rounded-xl"></div>
                    </>
                }
                {jobs && jobs.data && jobs.data.data && jobs.data.data.length === 0 && !isLoading && <>
                    <div className="col-span-2 flex flex-col justify-center items-center min-h-52">
                        <h2 className='text-2xl font-bold mb-4' >No job openings available at the moment.</h2>
                        <p className='text-black/60 mb-4' >Please check back later for new opportunities.</p>
                        {/* <PrimaryButton text={'Go to Home'} onClick={() => { navigate('/') }} /> */}
                    </div>
                </>}
                {jobs?.data?.data.map((j, i) => (<>
                    <div key={j.id} className="group flex gap-6 p-4 rounded-lg bg-white hover:shadow-inner hover:shadow-primary shadow-lg  transition-all duration-300 hover:scale-[99.2%] cursor-pointer overflow-hidden" onClick={() => { navigate('/jobs/' + j.slug) }} content={`Apply for the position of ${j.title}`}>
                        <div className=" p-4 bg-primary rounded-lg w-24 overflow-hidden">
                            <img src={logo} alt="Nexus logo" title='Nexus logo' content='Nexus logo' className='w-ful' />
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex items-center justify-between">
                                <h3 className='text-xl font-bold text-primary' >{j.title}</h3>
                                <p className='text-xs font-semibold text-black/50' >{j.created_at.slice(0, 10)}</p>
                            </div>
                            <div className="flex items-center flex-wrap">
                                <p className='text-xs font-semibold text-black/50' >{j.type}</p>
                                <span className='text-xs font-semibold text-black/50' ><Dot /></span>
                                <p className='text-xs font-semibold text-black/50' >{j.location}</p>
                            </div>

                            <button className={`bg-[#c6d1d6] opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out px-5 py-2 text-sm text-primary font-bold w-full lg:w-fit rounded-lg capitalize self-end shadow-lg`} oncli >apply</button>

                        </div>

                    </div>
                </>))}
            </div>
        </div>
    </>
}

export default function Jobs() {
    return <>
        <PageSEO
            title="Careers — Join NEXUS Engineering Consultancy"
            description="Explore current job openings at NEXUS. We're hiring BIM managers, civil, mechanical, electrical, and structural engineers. Apply today."
            image="/Logo.png"
        />
        <HeroSection />
        <div className="bg-bg2 bg-cover bg-fixed bg-center">
            <AvilableJobs />
        </div>
    </>
}
