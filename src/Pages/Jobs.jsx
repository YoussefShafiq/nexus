import React from 'react'
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection'
import logo from '../assets/images/icon.png'
import { useNavigate } from 'react-router-dom'
import { Dot } from 'lucide-react'
import PrimaryButton from '../buttons/PrimaryButton'
import { PageSEO } from '../seo/SEO'


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
            responsibilities: `
            <ul>
                <li>Oversee the implementation and management of BIM processes across projects.</li>
                <li>Coordinate with design teams to ensure accurate and up-to-date models.</li>
                <li>Maintain and manage project BIM documentation.</li>
            </ul>
        `,
            qualifications: `
            <ul>
                <li>Bachelor’s degree in Architecture or Engineering.</li>
                <li>5+ years of BIM management experience.</li>
                <li>Proficiency in Revit and Navisworks.</li>
                <li>Strong leadership and communication skills.</li>
            </ul>
        `
        },
        {
            title: "Civil Engineer",
            jobType: "Full Time",
            location: "Onsite",
            date: "Posted 5 days ago",
            slug: "civil-engineer",
            responsibilities: `
            <ul>
                <li>Design and supervise civil infrastructure projects.</li>
                <li>Ensure compliance with safety and quality standards.</li>
                <li>Prepare technical reports, cost estimates, and project documentation.</li>
            </ul>
        `,
            qualifications: `
            <ul>
                <li>Bachelor’s degree in Civil Engineering.</li>
                <li>Proficiency in AutoCAD and structural design software.</li>
                <li>Strong problem-solving and analytical skills.</li>
                <li>3+ years of field experience in construction projects.</li>
            </ul>
        `
        },
        {
            title: "Mechanical Engineer",
            jobType: "Full Time",
            location: "Hybrid",
            date: "Posted 1 week ago",
            slug: "mechanical-engineer",
            responsibilities: `
            <ul>
                <li>Develop and test mechanical systems and components.</li>
                <li>Collaborate with design and cross-functional teams on projects.</li>
                <li>Ensure compliance with engineering standards and regulations.</li>
            </ul>
        `,
            qualifications: `
            <ul>
                <li>Bachelor’s degree in Mechanical Engineering.</li>
                <li>Proficiency in SolidWorks or AutoCAD.</li>
                <li>Knowledge of HVAC and manufacturing processes.</li>
                <li>Excellent analytical and problem-solving abilities.</li>
            </ul>
        `
        },
        {
            title: "Electrical Engineer",
            jobType: "Full Time",
            location: "Remote",
            date: "Posted 3 days ago",
            slug: "electrical-engineer",
            responsibilities: `
            <ul>
                <li>Design and review electrical systems for construction projects.</li>
                <li>Perform load calculations and prepare technical drawings.</li>
                <li>Ensure adherence to local codes, safety, and quality standards.</li>
            </ul>
        `,
            qualifications: `
            <ul>
                <li>Bachelor’s degree in Electrical Engineering.</li>
                <li>Experience with power distribution and control systems.</li>
                <li>Proficiency in AutoCAD Electrical or similar tools.</li>
                <li>Strong communication and teamwork skills.</li>
            </ul>
        `
        },
        {
            title: "Project Coordinator",
            jobType: "Part Time",
            location: "Onsite",
            date: "Posted 4 days ago",
            slug: "project-coordinator",
            responsibilities: `
            <ul>
                <li>Assist project managers with scheduling and resource allocation.</li>
                <li>Track project progress and prepare status reports.</li>
                <li>Communicate effectively with stakeholders and team members.</li>
            </ul>
        `,
            qualifications: `
            <ul>
                <li>Bachelor’s degree in Project Management or related field.</li>
                <li>Strong organizational and communication skills.</li>
                <li>Proficiency in MS Project and MS Excel.</li>
                <li>Attention to detail and multitasking abilities.</li>
            </ul>
        `
        },
        {
            title: "Structural Engineer",
            jobType: "Full Time",
            location: "Onsite",
            date: "Posted 6 days ago",
            slug: "structural-engineer",
            responsibilities: `
            <ul>
                <li>Design and analyze structural systems and components.</li>
                <li>Review technical drawings and perform safety checks.</li>
                <li>Ensure stability, durability, and compliance with building codes.</li>
            </ul>
        `,
            qualifications: `
            <ul>
                <li>Bachelor’s degree in Structural or Civil Engineering.</li>
                <li>Proficiency in STAAD Pro, ETABS, or similar software.</li>
                <li>Knowledge of local and international building codes.</li>
                <li>3+ years of structural design and analysis experience.</li>
            </ul>
        `
        }
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
