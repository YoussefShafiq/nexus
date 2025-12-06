import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Simplified Reusable Lightbox Component
 * @param {Object} props
 * @param {string} props.imageSrc - Current image source
 * @param {string[]} props.images - Array of all images for navigation
 * @param {number} props.currentIndex - Current image index
 * @param {Function} props.onClose - Function to close lightbox
 * @param {Function} props.onNext - Function to go to next image
 * @param {Function} props.onPrev - Function to go to previous image
 * @param {boolean} props.showNavigation - Whether to show prev/next buttons
 */
export default function Lightbox({
    imageSrc,
    images = [],
    currentIndex = 0,
    onClose,
    onNext,
    onPrev,
    showNavigation = true
}) {
    // Keyboard shortcuts
    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Escape':
                onClose?.()
                break
            case 'ArrowLeft':
                onPrev?.()
                break
            case 'ArrowRight':
                onNext?.()
                break
        }
    }

    // Prevent body scroll and add event listeners
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow
        document.body.style.overflow = 'hidden'

        const handleKeyDownEvent = (e) => handleKeyDown(e)
        document.addEventListener('keydown', handleKeyDownEvent)

        return () => {
            document.body.style.overflow = originalStyle
            document.removeEventListener('keydown', handleKeyDownEvent)
        }
    }, [onClose, onNext, onPrev])

    if (!imageSrc) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 select-none"
                onClick={(e) => e.target === e.currentTarget && onClose?.()}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 z-10 p-3 text-white hover:bg-white/20 rounded-full transition-colors"
                    onClick={onClose}
                    aria-label="Close lightbox"
                    title="Close (Esc)"
                >
                    <X size={24} />
                </button>

                {/* Navigation Buttons */}
                {showNavigation && images.length > 1 && (
                    <>
                        <button
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full transition-colors"
                            onClick={onPrev}
                            aria-label="Previous image"
                            title="Previous (←)"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full transition-colors"
                            onClick={onNext}
                            aria-label="Next image"
                            title="Next (→)"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {showNavigation && images.length > 1 && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}

                {/* Image Container */}
                <div className="relative max-w-[90vw] max-h-[90vh] h-full">
                    <motion.img
                        src={imageSrc}
                        alt="Enlarged view"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="select-none h-full"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                        draggable="false"
                    />
                </div>

                {/* Help Text */}
                {showNavigation && images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white/70 text-xs px-3 py-2 rounded-lg hidden md:block">
                        <div>←/→: Navigate • Esc: Close</div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    )
}