import React, { useState, useRef } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function PaginationCarousel({ items, itemsPerPage = 6, ItemsPerLine = 3, renderItem }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const navigate = useNavigate();
    const totalSlides = Math.ceil((items?.length || 0) / itemsPerPage);

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
            {/* Carousel */}
            <div
                ref={carouselRef}
                className="flex transition-transform duration-300 ease-in-out py-5"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {groupedItems.map((page, pageIndex) => (
                    <div key={pageIndex} className="w-full flex-shrink-0">
                        <div className="flex flex-wrap gap-y-5">
                            {page.map((item, index) => (
                                <div key={index} className={`w-full lg:w-1/4 px-2`}>
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
