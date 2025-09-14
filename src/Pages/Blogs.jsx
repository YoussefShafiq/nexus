import React from 'react'
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection'
import serviceimg from '../assets/images/services/marine.png'
import { Dot } from 'lucide-react'
import { Link } from 'react-router-dom'


export function HeroSection() {
    return <>
        <ReusableHeroSection name={'Blogs'} backgroundclass='bg-BlogsHeroImage' />
    </>
}

export function LatestAndTopBlogs() {


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


    return <>
        <div className="container flex flex-col lg:flex-row gap-8">
            {/* latest post */}
            <div className="w-3/5 space-y-8">
                <h2 className='capitalize text-3xl font-bold'>latest post</h2>
                <div className="bg-white rounded-xl p-5 pb-8 flex flex-col gap-3">
                    <div className="rounded-xl aspect-[16/9] overflow-hidden flex items-center justify-center">
                        <img src={serviceimg} alt="Blog 1" title='Blog 1' content='Blog 1' className='w-full h-auto hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className='text-2xl font-bold'>Innovative technologies for advanced aerospace applications</h3>
                        <div className="flex items-center">
                            <p className='text-black/50 text-sm' >September 11,2025</p>
                            <span className='text-black/50' ><Dot /></span>
                            <p className='text-primary text-sm font-bold capitalize' >youssef lawendy</p>
                        </div>
                        <p className='text-black/50'>State-of-the-art solutions designed for aerospace and defense industries, ensuring safety, reliability, and performance in critical missions.</p>
                        <Link className='text-primary underline font-bold text-md capitalize' >read more</Link>

                    </div>
                </div>
            </div>
            {/* top posts */}
            <div className="w-2/5 space-y-8">
                <h2 className='capitalize text-3xl font-bold'>top posts</h2>
                <div className="flex flex-col gap-5">
                    {blogs.splice(0, 5).map((b, i) => (<>
                        <div className="bg-white rounded-xl flex gap-4 p-3 cursor-pointer shadow-lg transition-all duration-300 group" key={i} content={`Read blog about ${b.title}`}>
                            <div className="w-1/3">
                                <div className="rounded-lg overflow-hidden aspect-video">
                                    <img src={b.img} alt={b.title} title={b.title} content={b.title} className='w-full h-auto group-hover:scale-105 transition-all duration-300' />
                                </div>
                            </div>
                            <div className="w-2/3 flex flex-col justify-start ">
                                <h3 className='text-xl font-bold'>{b.title}</h3>
                                <div className="flex items-center">
                                    <p className='text-black/50 text-xs' >{b.date}</p>
                                    <span className='text-black/50' ><Dot /></span>
                                    <p className='text-primary text-xs font-bold capitalize' >{b.author}</p>
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

export function BlogCard({ blog }) {

    return <>
        <div className="bg-white rounded-xl p-3 pb-8 flex flex-col gap-3 group">
            <div className="rounded-xl aspect-[16/9] overflow-hidden flex items-center justify-center">
                <img src={serviceimg} alt="Blog 1" title='Blog 1' content='Blog 1' className='w-full h-auto group-hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer' />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className='text-2xl font-bold'>{blog.title}</h3>
                <div className="flex items-center">
                    <p className='text-black/50 text-sm' >{blog.date}</p>
                    <span className='text-black/50' ><Dot /></span>
                    <p className='text-primary text-sm font-bold capitalize' >{blog.author}</p>
                </div>
                <p className='text-black/50'>{blog.desc}</p>
                <Link className='text-primary underline font-bold text-md capitalize' to={'/blogs/' + blog.slug} >read more</Link>

            </div>
        </div>
    </>

}

export function LatestBlogs() {

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
    return <>
        <div className="container grid lg:grid-cols-3 grid-cols-1 gap-5">
            {blogs.splice(0, 6).map((b, i) => (<>
                <BlogCard blog={b} key={i} />
            </>))}
        </div>
    </>
}


export default function Blogs() {
    return <>
        <HeroSection />
        <LatestAndTopBlogs />
        <LatestBlogs />
    </>
}
