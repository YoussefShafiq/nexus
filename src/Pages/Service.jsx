import React from 'react'
import { PageSEO } from '../seo/SEO'

export function HeroSection({ service }) {
    return <>
        <div className={"bg-cover bg-center"} style={{ backgroundImage: `url(${service.image})` }}>
            <div className="h-full w-full flex flex-col justify-center items-center text-white text-center gap-3 py-[200px] bg-black/75">
                <h1 className='text-3xl lg:text-5xl font-extrabold '>{service.title}</h1>
                {/* <p className='text-lg lg:text-xl'>{service.subtitle}</p> */}
            </div>
        </div>
    </>
}


export default function Service() {
    const service = {
        image: 'https://media.istockphoto.com/id/1197308344/photo/oil-storage-tank-in-the-port-in-tsing-yi-hong-kong.jpg?s=2048x2048&w=is&k=20&c=VbgheA5iFp9msebvur0mQXN_vWmMRjjoS-D16KN5znQ=',
        title: 'Marine & Offshore',
        slug: 'Marine-&-Offshore',
        subtitle: 'Reliable solutions for harsh marine environments',
        desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations'
    }
    return <>
        <PageSEO
            title={`${service.title} — Services | NEXUS`}
            description={service.desc}
            image={service.image}
        />
        <HeroSection service={service} />
    </>
}
