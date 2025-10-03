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
        <ReusableHeroSection name={'Blogs'} backgroundclass='bg-BlogsHeroImage' />
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


    console.log('blogs in latest and top', blogs[0]);




    return <>

        <div className="container flex flex-col lg:flex-row gap-8">
            {/* latest post */}
            <div className="lg:w-3/5 space-y-8">
                <h2 className='capitalize text-3xl font-bold'>latest post</h2>
                <div ref={latestBlogRef}>
                    {console.log('latest blog before card', blogs[0])}
                    <BlogCard blog={blogs[0]} />
                </div>
            </div>
            {/* top posts */}
            <div className="lg:w-2/5 space-y-8">
                <h2 className='capitalize text-3xl font-bold'>top posts</h2>
                <div ref={topBlogsRef} className="flex flex-col gap-5">
                    {blogs.filter((b) => b.category == 'trending').map((b, i) => (<>
                        <div className="bg-white rounded-xl flex gap-4 p-3 cursor-pointer shadow-lg transition-all duration-300 group" key={i} content={`Read blog about ${b.title}`}>
                            <div className="w-1/3">
                                <div className="rounded-lg overflow-hidden lg:aspect-video">
                                    <img src={b.img} alt={b.title} title={b.title} content={b.title} className='w-full h-auto group-hover:scale-105 transition-all duration-300' />
                                </div>
                            </div>
                            <div className="w-2/3 flex flex-col justify-start ">
                                <h3 className='text-md lg:text-xl font-bold'>{b.title}</h3>
                                <div className="flex items-center ">
                                    <p className='text-black/50 text-xs' >{b.created_at}</p>
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


export default function Blogs() {
    const { data: blogs, isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: () => {
            return axios.get('https://nexus-consults.com/api/public/blogs');
        }
    })



    return <>
        <HeroSection />
        {blogs?.data?.data && blogs?.data?.data.length > 0 && <LatestAndTopBlogs blogs={blogs?.data?.data} isLoading={isLoading} />}
        {blogs?.data?.data && blogs?.data?.data.length > 0 && <RecentBlogs blogs={blogs?.data?.data} isLoading={isLoading} />}
    </>
}
