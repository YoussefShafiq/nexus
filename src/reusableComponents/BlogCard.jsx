import { Dot } from 'lucide-react'
import { Link } from 'react-router-dom'


export default function BlogCard({ blog }) {


    return <>
        <Link to={'/blogs/' + blog.slug} className="bg-white rounded-xl p-3 pb-8 flex flex-col gap-3 group">
            <div className="rounded-xl aspect-[16/9] overflow-hidden flex items-center justify-center">
                <img src={blog.cover_photo} alt="Blog 1" title='Blog 1' content='Blog 1' className='w-full h-auto group-hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer' />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className='text-2xl font-bold'>{blog.title}</h3>
                <div className="flex items-center">
                    <p className='text-black/50 text-sm' >{blog.created_at.slice(0, 10)}</p>
                    <span className='text-black/50' ><Dot /></span>
                    <p className='text-primary text-sm font-bold capitalize' >{blog.author?.name}</p>
                </div>
                {/* <p className='text-black/50'>{blog.desc}</p> */}
                <div className='text-primary underline font-bold text-md capitalize'>read more</div>
            </div>
        </Link>
    </>
}