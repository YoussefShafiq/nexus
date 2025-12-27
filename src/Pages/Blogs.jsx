import React, { useEffect, useRef } from 'react'
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection'
import { Dot } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BiRightArrowAlt } from 'react-icons/bi'
import BlogCard from '../reusableComponents/BlogCard'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'



export function HeroSection() {
    return <>
        <ReusableHeroSection name={'Blogs'} backgroundclass='bg-BlogsHeroImage' overloay={true} />
    </>
}

export function LatestAndTopBlogs({ blogs, isLoading }) {
    const latestBlogRef = useRef(null);
    const topBlogsRef = useRef(null);

    useEffect(() => {
        const latest = latestBlogRef.current;
        const top = topBlogsRef.current;

        if (!latest || !top) return;

        const syncHeight = () => {
            const height = latest.offsetHeight;
            top.style.height = `${height}px`;
            top.style.overflowY = "auto"; // enable scroll when content is taller
        };

        syncHeight();

        // Watch resize
        window.addEventListener("resize", syncHeight);

        // Watch image loads
        const images = latest.querySelectorAll("img");
        images.forEach((img) => img.addEventListener("load", syncHeight));

        return () => {
            window.removeEventListener("resize", syncHeight);
            images.forEach((img) => img.removeEventListener("load", syncHeight));
        };
    }, []);

    return <>

        <div className="container flex flex-col lg:flex-row gap-8">
            {/* latest post */}
            <div className="lg:w-3/5 space-y-8">
                <h2 className='capitalize text-3xl font-bold'>latest post</h2>
                <div ref={latestBlogRef}>
                    <BlogCard blog={blogs[0]} />
                </div>
            </div>
            {/* top posts */}
            <div className="lg:w-2/5 space-y-8">
                <h2 className='capitalize text-3xl font-bold'>top posts</h2>
                <div ref={topBlogsRef} className="flex flex-col gap-5">
                    {blogs.filter((b, i) => i !== 0).length === 0 && !isLoading && <p className='text-black/60' >No top posts available at the moment.</p>}
                    {blogs.filter((b) => b.category == 'trending').map((b, i) => (<>
                        <div className="bg-white rounded-xl flex gap-4 p-3 cursor-pointer shadow-lg transition-all duration-300 group" key={i} content={`Read blog about ${b.title}`}>
                            <div className="w-1/3 flex items-center">
                                <div className="rounded-lg overflow-hidden aspect-video">
                                    <img src={b.cover_photo} alt={b.title} title={b.title} content={b.title} className='w-full h-full object-cover group-hover:scale-105 transition-all duration-300' />
                                </div>
                            </div>
                            <div className="w-2/3 flex flex-col justify-start ">
                                <h3 className='text-md lg:text-xl font-bold'>{b.title}</h3>
                                <div className="flex items-center ">
                                    <p className='text-black/50 text-xs' >{b.created_at.slice(0, 10)}</p>
                                    <span className='text-black/50' ><Dot /></span>
                                    <p className='text-primary text-xs font-bold capitalize' >{b.author?.name}</p>
                                </div>
                                <Link className='text-primary underline font-bold text-md capitalize' to={'/blogs/' + b.slug} >read more</Link>
                            </div>
                        </div>
                    </>))}
                </div>
            </div>
        </div>
    </>
}

export function RecentBlogs({ blogs, isLoading }) {


    return <>
        {isLoading ? '' : <div className="container grid lg:grid-cols-3 grid-cols-1 gap-5">
            <div className="lg:col-span-3 flex justify-between items-center">
                <h2 className='capitalize text-3xl font-bold'>Recent Posts</h2>
                <Link className='hover:text-primary font-bold text-md capitalize flex items-center gap-1 hover:underline transition-all duration-300' to={'/blogs/all'} >view all <BiRightArrowAlt size={20} /></Link>
            </div>
            {blogs.slice(0, 6).map((b, i) => (<>
                <BlogCard blog={b} key={i} />
            </>))}
        </div>}
    </>
}

export function BlogCardSkeleton() {
    return (
        <div className="bg-white rounded-xl p-3 pb-8 flex flex-col gap-3 animate-pulse">
            <div className="rounded-xl aspect-[16/9] overflow-hidden bg-gray-200 flex items-center justify-center">
                <div className="w-full h-full bg-gray-300"></div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
        </div>
    );
}

// Skeleton for Top Blog Item
export function TopBlogItemSkeleton() {
    return (
        <div className="bg-white rounded-xl flex gap-4 p-3 shadow-lg animate-pulse">
            <div className="w-1/3 flex items-center">
                <div className="rounded-lg overflow-hidden aspect-video bg-gray-200 w-full">
                    <div className="w-full h-full bg-gray-300"></div>
                </div>
            </div>
            <div className="w-2/3 flex flex-col justify-start gap-2">
                <div className="h-5 bg-gray-200 rounded w-full"></div>
                <div className="flex items-center gap-1">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
        </div>
    );
}


export default function Blogs() {
    const { data: blogs, isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/api/public/blogs');
        }
    })



    return <>
        <HeroSection />
        {isLoading && <>
            <div className="container flex gap-8">
                <div className="lg:w-3/5 space-y-8">
                    <h2 className='capitalize text-3xl font-bold'>latest post</h2>
                    <BlogCardSkeleton />
                </div>
                <div className="lg:w-2/5 space-y-8">
                    <h2 className='capitalize text-3xl font-bold'>Top posts</h2>
                    <TopBlogItemSkeleton />
                    <TopBlogItemSkeleton />
                </div>
            </div>
            <div className="container grid lg:grid-cols-3 grid-cols-1 gap-5">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
            </div>
        </>}
        {blogs?.data?.data && blogs?.data?.data.length > 0 && <LatestAndTopBlogs blogs={blogs?.data?.data} isLoading={isLoading} />}
        {blogs?.data?.data && blogs?.data?.data.length > 0 && <RecentBlogs blogs={blogs?.data?.data} isLoading={isLoading} />}
    </>
}
