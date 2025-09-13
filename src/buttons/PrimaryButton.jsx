import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrimaryButton({ text, path, className }) {

    const navigate = useNavigate()

    return <>
        <button className={`bg-primary hover:bg-white hover:text-primary transition-all duration-300 ease-in-out  px-8 py-3 text-xl text-white font-bold ${className} w-full lg:w-fit rounded-lg`} onClick={() => navigate(path)} >{text}</button>
    </>
}
