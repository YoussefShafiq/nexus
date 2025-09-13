import React from 'react'
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection'
import logo from '../assets/images/icon.png'
import { useNavigate } from 'react-router-dom'
import { Dot } from 'lucide-react'
import PrimaryButton from '../buttons/PrimaryButton'


export function HeroSection() {
    return <>
        <ReusableHeroSection name="Careers at NEXUS" />
    </>
}

export function AvilableJobs() {
    const navigate = useNavigate()

    const jobs = [
        {
            title: "BIM Manager",
            jobType: "Full Time",
            location: "Onsite",
            date: "Posted 2 days ago",
            slug: "bim-manager",
        },
        {
            title: "Civil Engineer",
            jobType: "Full Time",
            location: "Onsite",
            date: "Posted 5 days ago",
            slug: "civil-engineer",
        },
        {
            title: "Mechanical Engineer",
            jobType: "Full Time",
            location: "Hybrid",
            date: "Posted 1 week ago",
            slug: "mechanical-engineer",
        },
        {
            title: "Electrical Engineer",
            jobType: "Full Time",
            location: "Remote",
            date: "Posted 3 days ago",
            slug: "electrical-engineer",
        },
        {
            title: "Project Coordinator",
            jobType: "Part Time",
            location: "Onsite",
            date: "Posted 4 days ago",
            slug: "project-coordinator",
        },
        {
            title: "Structural Engineer",
            jobType: "Full Time",
            location: "Onsite",
            date: "Posted 6 days ago",
            slug: "structural-engineer",
        },
    ];


    return <>
        <div className="container">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                {jobs.map((j, i) => (<>
                    <div className="group flex gap-6 p-4 rounded-lg bg-white hover:shadow-inner hover:shadow-primary shadow-lg  transition-all duration-300 hover:scale-[99.2%] cursor-pointer overflow-hidden" key={i} onClick={() => { navigate('/jobs/' + j.slug) }} content={`Apply for the position of ${j.title}`}>
                        <div className=" p-4 bg-primary rounded-lg w-24 overflow-hidden">
                            <img src={logo} alt="Nexus logo" title='Nexus logo' content='Nexus logo' className='w-ful' />
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex items-center justify-between">
                                <h3 className='text-xl font-bold text-primary' >{j.title}</h3>
                                <p className='text-xs font-semibold text-black/50' >{j.date}</p>
                            </div>
                            <div className="flex items-center flex-wrap">
                                <p className='text-xs font-semibold text-black/50' >{j.jobType}</p>
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
        <HeroSection />
        <div className="bg-bg2 bg-cover bg-fixed bg-center">
            <AvilableJobs />
        </div>
    </>
}
