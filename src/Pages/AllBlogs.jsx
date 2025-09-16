import React from 'react'
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection'
import { useNavigate } from 'react-router-dom';
import BlogCard from '../reusableComponents/BlogCard';
import serviceimg from '../assets/images/services/marine.png'
import PaginationCarousel from '../reusableComponents/PaginationCarousel';
import SectionHeading from '../reusableComponents/SectionHeading';

export function HeroSection() {
    return <>
        <ReusableHeroSection name={'All Blogs'} backgroundclass='bg-BlogsHeroImage' />
    </>
}

export function AllBlogsPagination() {

    const blogs = [
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            author: 'youssef lawendy',
            date: 'September 11,2025',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            author: 'youssef lawendy',
            date: 'September 11,2025',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            author: 'youssef lawendy',
            date: 'September 11,2025',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            author: 'youssef lawendy',
            date: 'September 11,2025',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },
        {
            img: serviceimg,
            title: 'Marine & Offshore',
            author: 'youssef lawendy',
            date: 'September 11,2025',
            slug: 'Marine-&-Offshore',
            subtitle: 'Reliable solutions for harsh marine environments',
            desc: 'Robust solutions for fixed platforms, jetties, and dredging, engineered to withstand harsh marine environments and optimize offshore operations.'
        },

    ]

    const navigate = useNavigate();
    return (
        <div className="bg-bg2 bg-cover bg-center bg-fixed">
            <div className="container">
                <SectionHeading title={'All Blogs'}/>

                <PaginationCarousel
                    items={blogs}
                    itemsPerPage={3}
                    ItemsPerLine={3}
                    renderItem={(b, i) => (
                        <BlogCard blog={b} key={i} />
                    )}
                />
            </div>
        </div>
    );
}

export default function AllBlogs() {
    return <>
        <HeroSection />
        <AllBlogsPagination />
    </>
}
