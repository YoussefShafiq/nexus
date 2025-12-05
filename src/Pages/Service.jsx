import React from 'react'
import { PageSEO } from '../seo/SEO'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function HeroSection({ service }) {
    return <>
        <div className={"bg-cover bg-center"} style={{ backgroundImage: `url(${service?.cover_photo})` }}>
            <div className="h-full w-full flex flex-col justify-center items-center text-white text-center gap-3 py-[200px] bg-black/75">
                <h1 className='text-3xl lg:text-5xl font-extrabold '>{service?.title}</h1>
            </div>
        </div>
    </>
}

export function ServiceContent({ service }) {
    return <>
        <div className="container ">
            <div className="flex flex-col gap-8">
                {service?.sections.map((s, i) => (
                    <>
                        <div className="flex flex-col w-full lg:flex-row gap-8">
                            <div className={`content w-full ${s.image ? 'lg:w-[60%]' : 'lg:w-full'} `}
                                dangerouslySetInnerHTML={{ __html: s.content || '' }}
                            >
                            </div>
                            {s.image && <div className="lg:w-[40%] w-full">
                                <img src={s.image} alt={s.title} className='rounded-xl' />
                                <div className="p-3 text-center font-bold italic text-sm">{s.caption}</div>
                            </div>}
                        </div>
                    </>
                ))}

            </div>
        </div>

    </>
}


export default function Service() {
    const { serviceSlug } = useParams()
    const { data: service, isLoading, isError, error } = useQuery({
        queryKey: ['service', serviceSlug],
        queryFn: () => {
            return axios.get(`https://nexus-consults.com/api/public/api/public/services/${serviceSlug}`)
        }
    })
    return <>
        {service?.data?.data && <PageSEO
            title={`${service?.data?.data?.title} — Services | NEXUS`}
            description={service?.data?.data?.desc}
            image={service?.data?.data?.cover_photo}
        />}
        <HeroSection service={service?.data?.data} />
        <ServiceContent service={service?.data?.data} />
    </>
}
