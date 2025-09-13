import React from 'react'

export default function ReusableHeroSection({ name, subtitle, className, backgroundclass = 'bg-ServicesHeroImage' }) {
    return <>
        <div className={`${backgroundclass} ${className} py-[200px] bg-cover bg-center flex flex-col justify-center items-center text-white text-center gap-3`}>
            {name && <h1 className='text-3xl lg:text-5xl font-extrabold '>{name}</h1>}
            {subtitle && <p className='text-lg lg:text-xl'>{subtitle}</p>}
        </div>
    </>
}