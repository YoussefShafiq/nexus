import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function PaginationCarousel({ items, itemsPerPage = 6, ItemsPerLine = 3, itemsPerLine, renderItem }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const navigate = useNavigate();
    const totalSlides = Math.ceil((items?.length || 0) / itemsPerPage);
    // Prefer camelCase prop if provided, fallback to the original prop
    const perLine = itemsPerLine ?? ItemsPerLine ?? 3;

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

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

    // Pagination UI
    const renderPagination = () => {
        if (totalSlides <= 1) return null;
        return (
            <div className="flex items-center gap-1">
                {currentSlide > 0 && <span className="text-gray-400">...</span>}
                <span className="px-2 py-1 rounded bg-blue-500 text-white">
                    {currentSlide + 1}
                </span>
                {currentSlide < totalSlides - 1 && <span className="text-gray-400">...</span>}
            </div>
        );
    };

    return (
        <div className="relative overflow-hidden">
            {/* Responsive per-line styles: 1-per-line by default, switch at lg */}
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
            <div className="flex justify-between items-center gap-4 mt-4">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className={`w-40 rounded-full flex items-center gap-3 ${currentSlide === 0 ? "cursor-not-allowed opacity-50" : ""
                        }`}
                >
                    <FaArrowLeftLong /> Previous
                </button>

                {renderPagination()}

                <button
                    onClick={nextSlide}
                    disabled={currentSlide === totalSlides - 1}
                    className={`w-40 rounded-full flex items-center gap-3 justify-end ${currentSlide === totalSlides - 1 ? "cursor-not-allowed opacity-50" : ""
                        }`}
                >
                    Next <FaArrowRightLong />
                </button>
            </div>
        </div>
    );
}
