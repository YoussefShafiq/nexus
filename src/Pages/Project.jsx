import React from 'react'
import { PageSEO } from '../seo/SEO'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Use the same Lightbox as Service
import Lightbox from '../reusableComponents/Lightbox'

// Create a simple hook for this component
function useProjectLightbox() {
    const [state, setState] = React.useState({
        isOpen: false,
        currentIndex: 0,
        images: []
    })

    const extractImages = (project) => {
        if (!project) return []
        const images = new Set()

        if (project.cover_photo) images.add(project.cover_photo)

        project.sections?.forEach(section => {
            if (section.image) images.add(section.image)
            if (section.content) {
                const parser = new DOMParser()
                const doc = parser.parseFromString(section.content, 'text/html')
                doc.querySelectorAll('img').forEach(img => {
                    if (img.src) images.add(img.src)
                })
            }
        })

        return Array.from(images)
    }

    const openLightbox = (src, project) => {
        const images = extractImages(project)
        const index = images.indexOf(src)
        setState({
            isOpen: true,
            currentIndex: index !== -1 ? index : 0,
            images
        })
    }

    const closeLightbox = () => {
        setState(prev => ({ ...prev, isOpen: false }))
    }

    const goToNext = () => {
        setState(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex + 1) % prev.images.length
        }))
    }

    const goToPrev = () => {
        setState(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex + prev.images.length - 1) % prev.images.length
        }))
    }

    return { state, openLightbox, closeLightbox, goToNext, goToPrev }
}

export default function Project() {
    const { projectSlug } = useParams()
    const { data: project } = useQuery({
        queryKey: ['project', projectSlug],
        queryFn: () => axios.get(`https://nexus-consults.com/api/public/api/public/projects/${projectSlug}`)
    })

    const { state, openLightbox, closeLightbox, goToNext, goToPrev } = useProjectLightbox()
    const projectData = project?.data?.data

    if (!projectData) return null

    return (
        <>
            <PageSEO
                title={`${projectData.title} — Projects | NEXUS`}
                description={projectData.desc}
                image={projectData.cover_photo}
            />

            {/* Hero */}
            <div
                className="relative bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${projectData.cover_photo})` }}
            >
                <div className="h-full w-full flex flex-col justify-center items-center text-white text-center gap-3 py-[200px] bg-black/75">
                    <h1 className='text-3xl lg:text-5xl font-extrabold'>{projectData.title}</h1>
                </div>
            </div>

            {/* Content */}
            <div className="container">
                {projectData.sections?.map((s, i) => (
                    <div key={i} className="flex flex-col lg:flex-row gap-8 my-8">
                        <div
                            className={`content ${s.image ? 'lg:w-2/3' : 'lg:w-full'}`}
                            onClick={(e) => {
                                if (e.target.tagName === 'IMG') {
                                    openLightbox(e.target.src, projectData)
                                }
                            }}
                            dangerouslySetInnerHTML={{
                                __html: s.content?.replace(
                                    /<img([^>]+)>/g,
                                    '<img$1 class="cursor-pointer" />'
                                ) || ''
                            }}
                        />
                        {s.image && (
                            <div className="lg:w-1/3">
                                <img
                                    src={s.image}
                                    alt={s.title}
                                    className="rounded-xl cursor-zoom-in"
                                    onClick={() => openLightbox(s.image, projectData)}
                                />
                                {s.caption && <div className="p-3 text-center font-bold">{s.caption}</div>}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {state.isOpen && state.images.length > 0 && (
                <Lightbox
                    imageSrc={state.images[state.currentIndex]}
                    images={state.images}
                    currentIndex={state.currentIndex}
                    onClose={closeLightbox}
                    onNext={goToNext}
                    onPrev={goToPrev}
                />
            )}
        </>
    )
}