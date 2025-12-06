import React, { useState, useRef, useEffect, useMemo } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function PaginationCarousel({
    items,
    itemsPerPage = 6,
    ItemsPerLine = 3,
    itemsPerLine,
    renderItem,
    maxPageNumbers = 5 // Maximum page numbers to show at once
}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const navigate = useNavigate();
    const totalSlides = Math.ceil((items?.length || 0) / itemsPerPage);
    const perLine = itemsPerLine ?? ItemsPerLine ?? 3;

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Calculate visible page numbers
    const visiblePages = useMemo(() => {
        if (totalSlides <= 1) return [];

        const pages = [];
        let startPage = Math.max(0, currentSlide - Math.floor(maxPageNumbers / 2));
        let endPage = startPage + maxPageNumbers - 1;

        // Adjust if we're near the end
        if (endPage >= totalSlides) {
            endPage = totalSlides - 1;
            startPage = Math.max(0, endPage - maxPageNumbers + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    }, [currentSlide, totalSlides, maxPageNumbers]);

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        }
    };

    const goToSlide = (slideIndex) => {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            setCurrentSlide(slideIndex);
        }
    };

    // Touch events
    useEffect(() => {
        const handleTouchStart = (e) => {
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchMove = (e) => {
            touchEndX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            const delta = touchStartX.current - touchEndX.current;

            if (delta > 50) {
                // Swiped left → next slide
                nextSlide();
            } else if (delta < -50) {
                // Swiped right → previous slide
                prevSlide();
            }
        };

        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener("touchstart", handleTouchStart);
            carousel.addEventListener("touchmove", handleTouchMove);
            carousel.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            if (carousel) {
                carousel.removeEventListener("touchstart", handleTouchStart);
                carousel.removeEventListener("touchmove", handleTouchMove);
                carousel.removeEventListener("touchend", handleTouchEnd);
            }
        };
    }, [currentSlide, totalSlides]);

    // Group items into pages
    const groupedItems = [];
    if (items?.length) {
        for (let i = 0; i < items.length; i += itemsPerPage) {
            groupedItems.push(items.slice(i, i + itemsPerPage));
        }
    }

    // Pagination UI with all page numbers
    const renderPagination = () => {
        if (totalSlides <= 1) return null;

        return (
            <div className="flex items-center gap-1 md:gap-2">
                {/* Show first page and ellipsis if needed */}
                {visiblePages[0] > 0 && (
                    <>
                        <button
                            onClick={() => goToSlide(0)}
                            className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-sm md:text-base 
                                ${0 === currentSlide ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            aria-label="Go to first page"
                        >
                            1
                        </button>
                        {visiblePages[0] > 1 && (
                            <span className="text-gray-400 px-1">...</span>
                        )}
                    </>
                )}

                {/* Visible page numbers */}
                {visiblePages.map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => goToSlide(pageNum)}
                        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-sm md:text-base font-medium transition-all
                            ${pageNum === currentSlide
                                ? 'bg-blue-600 text-white shadow-md scale-110'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}
                        aria-label={`Go to page ${pageNum + 1}`}
                        aria-current={pageNum === currentSlide ? "page" : undefined}
                    >
                        {pageNum + 1}
                    </button>
                ))}

                {/* Show last page and ellipsis if needed */}
                {visiblePages[visiblePages.length - 1] < totalSlides - 1 && (
                    <>
                        {visiblePages[visiblePages.length - 1] < totalSlides - 2 && (
                            <span className="text-gray-400 px-1">...</span>
                        )}
                        <button
                            onClick={() => goToSlide(totalSlides - 1)}
                            className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-sm md:text-base 
                                ${totalSlides - 1 === currentSlide ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            aria-label="Go to last page"
                        >
                            {totalSlides}
                        </button>
                    </>
                )}
            </div>
        );
    };

    // Alternative: Show all pages at once (if not too many)
    const renderAllPages = () => {
        if (totalSlides <= 1) return null;

        // If there are many pages, use the visiblePages approach instead
        if (totalSlides > 10) {
            return renderPagination();
        }

        return (
            <div className="flex items-center gap-1 md:gap-2 flex-wrap justify-center">
                {Array.from({ length: totalSlides }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`w-5 aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all
                            ${i === currentSlide
                                ? 'bg-blue-600 text-white shadow-md scale-110'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}
                        aria-label={`Go to page ${i + 1}`}
                        aria-current={i === currentSlide ? "page" : undefined}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="relative overflow-hidden">
            {/* Responsive per-line styles */}
            <style>
                {`
                .pc-item { flex: 0 0 100%; max-width: 100%; }
                @media (min-width: 1024px) {
                  .pc-item { flex: 0 0 calc(100% / var(--per-line)); max-width: calc(100% / var(--per-line)); }
                }
                `}
            </style>

            {/* Carousel */}
            <div
                ref={carouselRef}
                className="flex transition-transform duration-300 ease-in-out py-5"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {items?.length === 0 && <div className="text-black/60 text-center w-full">No items to display.</div>}
                {groupedItems.map((page, pageIndex) => (
                    <div key={pageIndex} className="w-full flex-shrink-0" style={{ ['--per-line']: perLine }}>
                        <div className="flex flex-wrap gap-y-5">
                            {page.map((item, index) => (
                                <div key={index} className={`px-2 pc-item`}>
                                    {renderItem(item, index)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-6 px-2">
                <div className="flex items-center gap-2 order-2 lg:order-1">
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all
                            ${currentSlide === 0
                                ? "cursor-not-allowed opacity-50 bg-gray-200 text-gray-500"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
                        aria-label="Previous slide"
                    >
                        <FaArrowLeftLong /> Previous
                    </button>

                    <span className="text-sm text-gray-600 hidden sm:block">
                        Page {currentSlide + 1} of {totalSlides}
                    </span>
                </div>

                {/* Pagination - centered on mobile, right on desktop */}
                <div className="order-1 lg:order-2 mb-4 lg:mb-0">
                    {totalSlides <= 10 ? renderAllPages() : renderPagination()}
                </div>

                <div className="flex items-center gap-2 order-3 pb-2">
                    <span className="text-sm text-gray-600 hidden sm:block">
                        {Math.min((currentSlide * itemsPerPage) + 1, items?.length || 0)}-
                        {Math.min((currentSlide + 1) * itemsPerPage, items?.length || 0)} of {items?.length || 0} items
                    </span>

                    <button
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all
                            ${currentSlide === totalSlides - 1
                                ? "cursor-not-allowed opacity-50 bg-gray-200 text-gray-500"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
                        aria-label="Next slide"
                    >
                        Next <FaArrowRightLong />
                    </button>
                </div>
            </div>
        </div>
    );
}