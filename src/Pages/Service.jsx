import Lightbox from '../reusableComponents/Lightbox'
import { useLightbox } from '../hooks/useLightbox'
import React from 'react'
import { PageSEO } from '../seo/SEO'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function HeroSection({ service, onImageClick }) {
    return (
        <div
            className="relative bg-cover bg-center"
            style={{ backgroundImage: `url(${service?.cover_photo})` }}
        >
            <div className="h-full w-full flex flex-col justify-center items-center text-white text-center gap-3 py-[200px] bg-black/75">
                <h1 className='text-3xl lg:text-5xl font-extrabold'>{service?.title}</h1>

            </div>
        </div>
    )
}

export function ServiceContent({ service, onImageClick }) {
    // Process HTML content to make all images clickable
    const processContent = (content) => {
        if (!content) return ''

        return content.replace(
            /<img([^>]+)>/g,
            '<img$1 class="cursor-zoom-in hover:opacity-90 transition-all duration-200 hover:shadow-lg" />'
        )
    }

    return (
        <div className="container">
            <div className="flex flex-col gap-8">
                {service?.sections?.map((s, i) => (
                    <div key={i} className="flex flex-col w-full lg:flex-row gap-8">
                        <div
                            className={`content w-full ${s.image ? 'lg:w-[60%]' : 'lg:w-full'}`}
                            onClick={(e) => onImageClick(e, service)}
                            dangerouslySetInnerHTML={{
                                __html: processContent(s.content)
                            }}
                        />
                        {s.image && (
                            <div className="lg:w-[40%] w-full">
                                <div className="relative group">
                                    <img
                                        src={s.image}
                                        alt={s.title}
                                        className='w-full rounded-[12px] border-[2px] border-[#1d1e1f] cursor-zoom-in hover:opacity-90 transition-all duration-200 hover:shadow-lg'
                                        onClick={(e) => {
                                            // Pass the event directly
                                            onImageClick(e, service)
                                        }}
                                    />
                                </div>
                                {s.caption && (
                                    <div className="p-3 text-center font-bold text-base text-[#334155]">
                                        {s.caption}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function Service() {
    const { serviceSlug } = useParams()
    const { data: service, isLoading, isError, error } = useQuery({
        queryKey: ['service', serviceSlug],
        queryFn: () => {
            return axios.get(`https://nexus-consults.com/api/public/api/public/services/${serviceSlug}`)
        }
    })

    const {
        lightboxState,
        openLightbox,
        closeLightbox,
        goToNext,
        goToPrev,
        handleImageClick
    } = useLightbox()

    // For hero section - pass image src directly
    const handleHeroImageClick = (imageSrc, serviceData) => {
        openLightbox(imageSrc, serviceData)
    }

    // For content section - pass event object
    const handleContentImageClick = (e, serviceData) => {
        handleImageClick(e, serviceData)
    }

    return (
        <>
            {service?.data?.data && (
                <PageSEO
                    title={`${service?.data?.data?.title} — Services | NEXUS`}
                    description={service?.data?.data?.desc}
                    image={service?.data?.data?.cover_photo}
                />
            )}

            <HeroSection
                service={service?.data?.data}
                onImageClick={handleHeroImageClick}
            />

            <ServiceContent
                service={service?.data?.data}
                onImageClick={handleContentImageClick}
            />

            {/* Reusable Lightbox Component */}
            {lightboxState.isOpen && lightboxState.images.length > 0 && (
                <Lightbox
                    imageSrc={lightboxState.images[lightboxState.currentIndex]}
                    images={lightboxState.images}
                    currentIndex={lightboxState.currentIndex}
                    onClose={closeLightbox}
                    onNext={goToNext}
                    onPrev={goToPrev}
                    showControls={true}
                    showNavigation={lightboxState.images.length > 1}
                    enableDownload={true}
                    enableFullscreen={true}
                />
            )}
        </>
    )
}