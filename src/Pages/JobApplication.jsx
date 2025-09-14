import React, { use, useEffect, useState } from 'react'
import { PageSEO } from '../seo/SEO'
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection'
import { useParams } from 'react-router-dom'
import logo from '../assets/images/Logo.png'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { BsWhatsapp } from 'react-icons/bs'
import { MdOutlineWork, MdOutlineWorkOutline } from 'react-icons/md'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import { PiSealCheckFill } from 'react-icons/pi'

export function HeroSection({ job }) {
    return <>
        <ReusableHeroSection name={job?.title || 'Careers at NEXUS '} />
    </>
}

export function JobDetails({ job }) {
    return <>
        <div className="container grid lg:grid-cols-2 grid-cols-1 gap-8">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="backdrop-blur-3xl"
            >
                <form action="" className='bg-primary flex flex-col gap-6 p-8 lg:p-10 rounded-lg'>
                    <div className="w-32 m-auto">
                        <img src={logo} alt="Nexus logo" content='Nexus logo' title='Nexus logo' className='w-full' />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="name" className='text-white font-semibold text-lg'>Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className='w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300'
                            placeholder="Your full name"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className='text-white font-semibold text-lg'>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className='w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300'
                            placeholder="Email"
                        />
                    </div>

                    {/* Years of Experience */}
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="experience" className='text-white font-semibold text-lg'>Years of Experience</label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            min="0"
                            className='w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300'
                            placeholder="Years of experience"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="phone" className='text-white font-semibold text-lg'>Phone number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className='w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300'
                            placeholder="Phone number"
                        />
                    </div>

                    {/* File Attachment */}
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="attachment" className='text-white font-semibold text-lg'>Attachment</label>
                        <input
                            type="file"
                            id="attachment"
                            name="attachment"
                            className='w-full rounded-lg bg-white/15 px-4 py-3 text-white file:text-white file:bg-white/25 file:border-none file:rounded-md file:px-3 file:py-1 cursor-pointer outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300'
                        />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="message" className='text-white font-semibold text-lg'>Message</label>
                        <textarea
                            maxLength={200}
                            id="message"
                            name="message"
                            className='w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300 min-h-40'
                            placeholder="Message"
                        />
                    </div>

                    {/* Submit Button */}
                    <button className='bg-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-in-out px-8 py-3 text-xl text-primary font-bold w-full rounded-lg capitalize'>
                        Submit
                    </button>
                </form>

            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-xl backdrop-blur-3xl"
            >
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-xl h-full border border-primary/20 shadow-lg backdrop-blur-3xl flex flex-col gap-6">
                    <h2 className="text-3xl font-bold text-primary transition-colors">{job?.title}</h2>
                    <div id='responsibilities'>
                        <h3 className="text-xl font-semibold text-primary transition-colors mb-2 flex items-center gap-3"> <MdOutlineWork /> Key Responsibilities</h3>
                        <div className="text-primary transition-colors" dangerouslySetInnerHTML={{ __html: job?.responsibilities || '<p>No job selected. Please go back and select a job to see details.</p>' }}></div>
                    </div>
                    <div id='qualifications'>
                        <h3 className="text-xl font-semibold text-primary transition-colors mb-2 flex items-center gap-3"> <PiSealCheckFill /> Qualifications</h3>
                        <div className="text-primary transition-colors" dangerouslySetInnerHTML={{ __html: job?.qualifications || '<p>No job selected. Please go back and select a job to see details.</p>' }}></div>
                    </div>
                </div>
            </motion.div>
        </div>
    </>
}

export default function JobApplication() {
    const { jobSlug } = useParams();

    const [job, setjob] = useState(null)
    function GetJobBySlug(slug) {
        return setjob(jobs.find(j => j.slug === slug))
    }

    useEffect(() => {
        if (jobSlug) {
            GetJobBySlug(jobSlug);
        }
    }, []);

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


    return (
        <>
            <PageSEO
                title="Apply — Careers at NEXUS"
                description="Submit your application to join NEXUS Engineering Consultancy. Fill out the form and our team will get back to you."
                image="/Logo.png"
            />
            <HeroSection job={job} />
            <JobDetails job={job} />
        </>
    )
}
