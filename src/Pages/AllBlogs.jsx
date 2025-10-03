import React from 'react'
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection'
import { useNavigate } from 'react-router-dom';
import BlogCard from '../reusableComponents/BlogCard';
import serviceimg from '../assets/images/services/marine.png'
import PaginationCarousel from '../reusableComponents/PaginationCarousel';
import SectionHeading from '../reusableComponents/SectionHeading';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export function HeroSection() {
    return <>
        <ReusableHeroSection name={'All Blogs'} backgroundclass='bg-BlogsHeroImage' />
    </>
}

export function AllBlogsPagination({ blogs, isLoading }) {


    const navigate = useNavigate();
    return (
        <div className="bg-bg2 bg-cover bg-center bg-fixed">
            <div className="container">
                <SectionHeading title={'All Blogs'} />

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
    const { data: blogs, isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/blogs');
        }
    })


    return <>
        <HeroSection />
        <AllBlogsPagination blogs={blogs?.data?.data} isLoading={isLoading} />
    </>
}
