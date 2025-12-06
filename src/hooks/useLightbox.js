import { useState, useCallback } from 'react'

/**
 * Custom hook to manage lightbox state
 * @returns {Object} Lightbox state and control functions
 */
export function useLightbox() {
    const [lightboxState, setLightboxState] = useState({
        isOpen: false,
        currentIndex: 0,
        images: []
    })

    /**
     * Extract all images from service data
     */
    const extractAllImages = useCallback((service) => {
        if (!service) return []

        const images = new Set()

        // Add cover photo
        if (service?.cover_photo) {
            images.add(service.cover_photo)
        }

        // Add section images and parse HTML content
        service?.sections?.forEach(section => {
            if (section.image) {
                images.add(section.image)
            }
            if (section.content) {
                const parser = new DOMParser()
                const doc = parser.parseFromString(section.content, 'text/html')
                const imgs = doc.querySelectorAll('img')
                imgs.forEach(img => {
                    if (img.src) images.add(img.src)
                })
            }
        })

        return Array.from(images)
    }, [])

    /**
     * Open lightbox with a specific image
     */
    const openLightbox = useCallback((imageSrc, service) => {
        const images = extractAllImages(service)
        const index = images.indexOf(imageSrc)

        setLightboxState({
            isOpen: true,
            currentIndex: index !== -1 ? index : 0,
            images
        })
    }, [extractAllImages])

    /**
     * Close lightbox
     */
    const closeLightbox = useCallback(() => {
        setLightboxState(prev => ({ ...prev, isOpen: false }))
    }, [])

    /**
     * Go to next image
     */
    const goToNext = useCallback(() => {
        setLightboxState(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex + 1) % prev.images.length
        }))
    }, [])

    /**
     * Go to previous image
     */
    const goToPrev = useCallback(() => {
        setLightboxState(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex + prev.images.length - 1) % prev.images.length
        }))
    }, [])

    /**
     * Handle image click in content
     */
    const handleImageClick = useCallback((e, service) => {
        // Check if e is an event object
        if (e && e.preventDefault && e.stopPropagation) {
            if (e.target.tagName === 'IMG') {
                e.preventDefault()
                e.stopPropagation()
                openLightbox(e.target.src, service)
            }
        }
        // If e is just a string (image source) or object with src
        else if (typeof e === 'string' || (e && e.src)) {
            const imageSrc = typeof e === 'string' ? e : e.src
            openLightbox(imageSrc, service)
        }
    }, [openLightbox])

    /**
     * Direct open function for manual triggers
     */
    const openLightboxDirectly = useCallback((imageSrc, service) => {
        openLightbox(imageSrc, service)
    }, [openLightbox])

    return {
        lightboxState,
        openLightbox: openLightboxDirectly,
        closeLightbox,
        goToNext,
        goToPrev,
        handleImageClick,
        extractAllImages
    }
}