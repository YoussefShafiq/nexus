import React from 'react'
import { PageSEO } from '../seo/SEO'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function HeroSection({ project }) {
    return <>
        <div className={"bg-cover bg-center"} style={{ backgroundImage: `url(${project?.cover_photo})` }}>
            <div className="h-full w-full flex flex-col justify-center items-center text-white text-center gap-3 py-[200px] bg-black/75">
                <h1 className='text-3xl lg:text-5xl font-extrabold '>{project?.title}</h1>
            </div>
        </div>
    </>
}

export function ProjectContent({ project }) {
    return <>
        <div className="container ">
            <div className="flex flex-col gap-8">
                {project?.sections.map((s, i) => (
                    <>
                        <div className="flex flex-col w-full lg:flex-row gap-8">
                            <div className={`content ${s.image ? 'w-2/3' : 'w-full'} `}
                                dangerouslySetInnerHTML={{ __html: s.content || '' }}
                            >
                            </div>
                            {s.image && <div className="w-1/3">
                                <img src={s.image} alt={s.title} className='rounded-xl' />
                            </div>}
                        </div>
                    </>
                ))}
            </div>
        </div>

    </>
}


export default function project() {
    const { projectSlug } = useParams()
    const { data: project, isLoading, isError, error } = useQuery({
        queryKey: ['project', projectSlug],
        queryFn: () => {
            return axios.get(`https://nexus-consults.com/api/public/api/public/projects/${projectSlug}`)
        }
    })
    return <>
        {project?.data?.data && <PageSEO
            title={`${project?.data?.data?.title} — projects | NEXUS`}
            description={project?.data?.data?.desc}
            image={project?.data?.data?.cover_photo}
        />}
        <HeroSection project={project?.data?.data} />
        <ProjectContent project={project?.data?.data} />
    </>
}
