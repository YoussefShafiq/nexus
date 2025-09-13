import React from 'react'
import { Link } from 'react-router-dom'
import { NoIndex, PageSEO } from '../seo/SEO'

export default function Notfound() {
    return <>
        <NoIndex />
        <PageSEO title="404 — Page Not Found | Nexus" description="The page you are looking for could not be found." />
        <div className="min-h-[60vh] flex items-center justify-center bg-bg2 bg-cover bg-fixed">
            <div className="bg-white/80 p-10 rounded-xl text-center shadow-lg">
                <h1 className="text-5xl font-extrabold text-primary mb-4">404</h1>
                <p className="text-black/70 mb-6">The page you are looking for could not be found.</p>
                <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">Go Home</Link>
            </div>
        </div>
    </>
}
