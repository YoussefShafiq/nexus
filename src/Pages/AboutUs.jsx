import React from 'react'
import serviceimg from '../assets/images/services/marine.png'
import PaginationCarousel from '../reusableComponents/PaginationCarousel';
import { useNavigate } from 'react-router-dom';
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection';
import SectionHeading from '../reusableComponents/SectionHeading';
import visionImg from '../assets/images/aboutus/vissionandmission.png'
import { TbMessageFilled, TbTargetArrow } from 'react-icons/tb';
import { BsFillRocketTakeoffFill, BsShieldFillCheck } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa6';
import { HiBadgeCheck } from 'react-icons/hi';
import { PageSEO } from '../seo/SEO';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Download } from 'lucide-react';


export function HeroSection() {
    return <>
        <ReusableHeroSection name="About Us" backgroundclass="bg-ServicesHeroImage" overloay={true} />
    </>
}

export function WhoWeAre() {
    const content = `
        <h2>Overview</h2>
        <p>
            <strong>Nexus for Engineering Consultancy</strong> is a multidisciplinary engineering firm delivering
            high-quality, code-compliant solutions for the <strong>Oil &amp; Gas</strong>, 
            <strong>Industrial</strong>, and <strong>Infrastructure</strong> sectors across 
            <strong>North Africa</strong> and the <strong>Arabian Gulf</strong>.
        </p>
        <p>
            Our experienced team supports projects from <strong>FEED</strong> to 
            <strong>detailed design</strong> and <strong>shop drawings</strong>.
        </p>

        <h3>Core Capabilities</h3>
        <ul>
            <li>
                <strong>Process Engineering:</strong>
                Process design for oil, gas &amp; petrochemicals, simulations, hydraulic studies,
                PFDs, P&amp;IDs, UFDs, HMB, control narratives, and Cause &amp; Effect.
            </li>
            <li>
                <strong>Piping &amp; Pipeline:</strong>
                3D modeling, routing, isometrics, MTO, stress analysis, GRE/HDPE/CS systems,
                crossings, and buried pipeline simulations.
            </li>
            <li>
                <strong>Storage Tanks:</strong>
                Design of fixed, floating &amp; dome roof tanks per AWWA/API/ASME,
                with FEA and CFD evaluations.
            </li>
            <li>
                <strong>Static Equipment:</strong>
                Design of pressure vessels, columns, bullets, and heat exchangers (ASME/TEMA),
                with lifting and transport studies.
            </li>
            <li>
                <strong>Instrumentation &amp; Controls:</strong>
                Complete I&amp;C design, loop and wiring diagrams, cable routing,
                and DCS/ESD integration.
            </li>
            <li>
                <strong>Steel Structures:</strong>
                Design of pipe racks, industrial buildings, bridges, and process structures,
                including seismic and wind analysis.
            </li>
            <li>
                <strong>Steel Detailing:</strong>
                Tekla modeling, shop drawings, CNC outputs, bolt lists, BIM coordination,
                and clash detection.
            </li>
            <li>
                <strong>Marine &amp; Offshore:</strong>
                Analysis of fixed platforms, jetties, quay walls, breakwaters,
                and metocean/hydrodynamic studies.
            </li>
            <li>
                <strong>Concrete &amp; Architecture:</strong>
                Structural design for foundations, frames, mixed structures,
                and architectural/BIM integration.
            </li>
        </ul>

        <h3>Why Nexus?</h3>
        <ul>
            <li>Strong multidisciplinary team with solid Oil &amp; Gas expertise.</li>
            <li>Proven delivery of FEED, detailed design, and shop drawings.</li>
            <li>Advanced engineering software capabilities.</li>
            <li>Fast response, accurate deliverables, and strict timelines.</li>
            <li>Flexible pricing and scalable engineering support.</li>
        </ul>
    `
    return <>
        <div className="container flex flex-col justify-center items-center gap-4">
            <SectionHeading title="Who We Are?" pbFlag={false} />
            <div
                className={`content w-full`}
                dangerouslySetInnerHTML={{
                    __html: content
                }}
            />
        </div>

    </>
}

export function VisionAndMission({ data }) {
    return <>
        <div className="container">
            <SectionHeading title="Vision & Mission" />
            <div className="flex flex-col lg:flex-row gap-20 items-center">
                <div className="lg:w-1/2 flex flex-col gap-6">
                    <div className="bg-white/80 p-8 rounded-lg border-b-4 border-b-primary space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                            <div className="flex items-center justify-center text-primary w-8 h-8 rounded-full">
                                <TbTargetArrow className='text-2xl' />
                            </div>
                            <h2 className='text-2xl font-bold'>Our Mission</h2>
                        </div>
                        <p>{data?.our_mission}</p>
                    </div>
                    <div className="bg-white/80 p-8 rounded-lg border-t-4 border-t-primary space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                            <div className="flex items-center justify-center bg-primary/10 w-8 h-8 rounded-full">
                                <BsFillRocketTakeoffFill className='text-' />
                            </div>
                            <h2 className='text-2xl font-bold'>Our Vission</h2>
                        </div>
                        <p>{data?.our_vision}</p>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    {data?.image && <img src={data?.image} alt="Vision And Mission image" loading='lazy' className='lg:p-8' />}
                </div>
            </div>
        </div>
    </>
}

export function OurExpertise({ data }) {

    const experties = [
        {
            title: 'Years',
            count: `${data?.years || ''}+`,
            desc: 'Years of Excellence in Engineering Consultancy'
        },
        {
            title: 'Projects',
            count: `${data?.projects || ''}+`,
            desc: 'Successfully Delivered Projects Across Various Industries'
        },
        {
            title: 'Clients',
            count: `${data?.clients || ''}+`,
            desc: 'Satisfied Clients Worldwide'
        },
        {
            title: 'Engineers',
            count: `${data?.engineers || ''}+`,
            desc: 'Skilled Engineers and Technical Experts'
        }
    ]

    return <>
        <div className="container">
            <SectionHeading title="Our Expertise" />
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
                {experties.map((e, index) => (<>
                    <div key={index} className="text-center flex flex-col gap-0 justify-center items-center bg-white/80 p-6 rounded-full border-[5px] border-primary/70 shadow-lg aspect-square w-32 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300" title={e.desc}>
                        <h2 className='text-2xl font-extrabold text-primary'>{e.count}</h2>
                        <p className='text-sm text-black/50 font-bold'>{e.title}</p>
                    </div>
                </>))}
            </div>
        </div>
    </>
}

export function WhyChooseUs() {

    const whychooseus = [
        {
            icon: <FaUsers />,
            title: 'Experienced Team',
            desc: 'Our multidisciplinary team includes experts in process, structural, and piping engineering.'
        },
        {
            icon: <TbMessageFilled />,
            title: 'Fast Communication',
            desc: 'We ensure quick communication to meet tight deadlines with real-time updates for stakeholders.'
        },
        {
            icon: <HiBadgeCheck />,
            title: 'Proven Record',
            desc: 'With a strong history in oil, gas, and industrial projects, we excel under challenging conditions.'
        },
        {
            icon: <BsShieldFillCheck />,
            title: 'Commitment to Safety',
            desc: 'With a strong history in oil, gas, and industrial projects, we excel under challenging conditions.'
        },
    ]

    return <>
        <div className="container flex flex-col justify-center items-center gap-4">
            <SectionHeading title="Why Choose Us" pbFlag={false} />
            <p className='text-lg lg:w-4/5 text-center' ><strong >NEXUS</strong> provides comprehensive engineering solutions that span from initial concept to final construction. Our focus is on precision, cost-efficiency, and adherence to international standards.  </p>

            <div className="grid lg:grid-cols-4 grid-cols-1 gap-8 mt-10">
                {whychooseus.map((w, i) => (<>
                    <div className="flex flex-col items-center bg-white/80 rounded-lg p-8">
                        <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full text-3xl mb-4">
                            {w.icon}
                        </div>
                        <h2 className='font-bold text-xl mb-2 text-center'>{w.title}</h2>
                        <p className='text-black/60 text-sm text-center'>{w.desc}</p>
                    </div>
                </>))}
            </div>
        </div>

    </>
}


export function DownloadPortfolio({ data }) {

    return <>
        <div className="container">
            <SectionHeading title="View Our Portfolio" pbFlag={false} />
            <p className='text-lg lg:w-4/5 text-center m-auto' >Get a closer look at our engineering expertise, featured projects, and capabilities. View our company portfolio to explore how we deliver reliable, innovative solutions.</p>
            <a href={data?.portfolio} className="flex justify-center mt-8">
                <button className={`bg-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out px-8 py-3 text-xl text-white font-bold w-full lg:w-fit rounded-lg capitalize`} >view now</button>
            </a>
        </div>
    </>
}


export default function AboutUs() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['aboutus'],
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/api/public/about')
        }
    })

    return <>
        <PageSEO
            title="About NEXUS — Engineering Excellence Since 1991"
            description="Learn about NEXUS Engineering Consultancy: 32+ years delivering precision, code-compliant engineering for oil & gas, industrial, and architectural projects."
            image="/Logo.png"
        />
        <HeroSection />
        <div className="bg-bg2 bg-cover bg-fixed bg-center">
            <WhoWeAre />
            <VisionAndMission data={data?.data?.data} />
            <OurExpertise data={data?.data?.data} />
            <WhyChooseUs />
            <DownloadPortfolio data={data?.data?.data} />
        </div>
    </>
}
