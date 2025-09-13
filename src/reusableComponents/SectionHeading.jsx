import React from 'react'

export default function SectionHeading({ title, subtitle, desc, pbFlag = true, descClassName, subtitleClassName }) {
    return <>
        <div className={`text-center ${pbFlag && 'pb-10'} space-y-5`}>
            <h1 className='font-bold text-4xl relative after:absolute after:w-20 after:h-1 after:-bottom-3 after:left-1/2 m-auto after:bg-primary after:-translate-x-1/2 after:text-center after:rounded-full' >{title}</h1>
            <div className="">
                <p className={`font-semibold text-xl opacity-60 ${subtitleClassName}`}>{subtitle}</p>
                <p className={`font-base lg:w-2/3 m-auto text-center ${descClassName}`}>{desc}</p>
            </div>
        </div>
    </>
}
