import React from 'react'

export default function ReusableHeroSection({ name, subtitle, className, backgroundclass = 'bg-BlogsHeroImage', overloay = true }) {
    return <>
        <div className={`${backgroundclass} ${className} py-[200px] bg-cover bg-center relative flex flex-col justify-center items-center text-white text-center gap-3`}>
            {overloay && <div className="absolute inset-0 bg-black/60"></div>}
            <div className="relative z-10">
                {name && <h1 className='text-3xl lg:text-5xl font-extrabold mb-5'>{name}</h1>}
                {subtitle && <p className='text-lg lg:text-xl'>{subtitle}</p>}
            </div>
        </div>
    </>
}