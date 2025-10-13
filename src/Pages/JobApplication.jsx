import React, { useState } from 'react'
import { PageSEO } from '../seo/SEO'
import ReusableHeroSection from '../reusableComponents/ReusableHeroSection'
import { useParams } from 'react-router-dom'
import logo from '../assets/images/Logo.png'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { BsWhatsapp } from 'react-icons/bs'
import { MdOutlineWork, MdOutlineWorkOutline } from 'react-icons/md'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import { PiSealCheckFill } from 'react-icons/pi'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'

export function HeroSection({ job }) {
    return <>
        <ReusableHeroSection name={job?.title || 'Careers at NEXUS '} />
    </>
}

// Validation schema
const applicationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^[+]?[0-9\s\-\(\)]{10,}$/, 'Invalid phone number'),
    years_of_experience: Yup.number()
        .required('Years of experience is required')
        .min(0, 'Experience cannot be negative')
        .max(50, 'Experience seems too high')
        .typeError('Please enter a valid number'),
    message: Yup.string()
        .max(200, 'Message must be less than 200 characters')
        .required('Message is required'),
    cv: Yup.mixed()
        .required('CV is required')
        .test('fileSize', 'File size too large (max 5MB)', (value) => {
            if (!value) return false;
            return value.size <= 5 * 1024 * 1024;
        })
        .test('fileType', 'Unsupported file format', (value) => {
            if (!value) return false;
            const supportedFormats = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];
            return supportedFormats.includes(value.type);
        }),
    availability: Yup.string()
        .required('Availability is required')
        .oneOf(['immediately', '1-week', '2-weeks', '1-month', '2-months', '3-months_plus'], 'Please select a valid availability option')
});

export function JobDetails({ job, isLoading }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            years_of_experience: '',
            message: '',
            cv: null,
            availability: ''
        },
        validationSchema: applicationSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true);

            try {
                const formData = new FormData();

                // Append all form fields to FormData
                Object.keys(values).forEach(key => {
                    if (key === 'cv' && values[key]) {
                        formData.append('cv', values[key]);
                    } else {
                        formData.append(key, values[key]);
                    }
                });

                await axios.post(
                    `https://nexus-consults.com/api/public/api/public/jobs/${job.slug}/apply`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                );

                toast.success('Application submitted successfully!');
                resetForm();
            } catch (error) {
                console.error('Application error:', error);
                const errorMessage = error.response?.data?.message || 'Failed to submit application. Please try again.';
                toast.error(errorMessage);
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    // Handle file input change
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('cv', file);
    };

    // Availability options
    const availabilityOptions = [
        { value: 'immediately', label: 'Immediately' },
        { value: '1-week', label: 'Within 1 week' },
        { value: '2-weeks', label: 'Within 2 weeks' },
        { value: '1-month', label: 'Within 1 month' },
        { value: '2-months', label: 'Within 2 months' },
        { value: '3-months_plus', label: '3 months or more' }
    ];

    return <>
        <div className="container grid lg:grid-cols-2 grid-cols-1 gap-8">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="backdrop-blur-3xl"
            >
                {isLoading ?
                    <div className="bg-primary flex flex-col gap-6 p-8 lg:p-10 rounded-lg h-screen animate-pulse">

                    </div>
                    :
                    <form
                        onSubmit={formik.handleSubmit}
                        className='bg-primary flex flex-col gap-6 p-8 lg:p-10 rounded-lg'
                    >
                        <div className="w-32 m-auto">
                            <img src={logo} alt="Nexus logo" className='w-full' />
                        </div>

                        {/* Name */}
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="name" className='text-white font-semibold text-lg'>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={`w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300 ${formik.touched.name && formik.errors.name ? 'border-2 border-red-400' : ''
                                    }`}
                                placeholder="Your full name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-red-200 text-sm mt-1">{formik.errors.name}</div>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="email" className='text-white font-semibold text-lg'>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300 ${formik.touched.email && formik.errors.email ? 'border-2 border-red-400' : ''
                                    }`}
                                placeholder="Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-200 text-sm mt-1">{formik.errors.email}</div>
                            )}
                        </div>

                        {/* Years of Experience */}
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="years_of_experience" className='text-white font-semibold text-lg'>Years of Experience</label>
                            <input
                                type="number"
                                id="years_of_experience"
                                name="years_of_experience"
                                min="0"
                                max="50"
                                className={`w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300 ${formik.touched.years_of_experience && formik.errors.years_of_experience ? 'border-2 border-red-400' : ''
                                    }`}
                                placeholder="Years of experience"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.years_of_experience}
                            />
                            {formik.touched.years_of_experience && formik.errors.years_of_experience && (
                                <div className="text-red-200 text-sm mt-1">{formik.errors.years_of_experience}</div>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="phone" className='text-white font-semibold text-lg'>Phone number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className={`w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300 ${formik.touched.phone && formik.errors.phone ? 'border-2 border-red-400' : ''
                                    }`}
                                placeholder="Phone number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <div className="text-red-200 text-sm mt-1">{formik.errors.phone}</div>
                            )}
                        </div>

                        {/* Availability */}
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="availability" className='text-white font-semibold text-lg'>Availability</label>
                            <select
                                id="availability"
                                name="availability"
                                className={`w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300 ${formik.touched.availability && formik.errors.availability ? 'border-2 border-red-400' : ''
                                    }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.availability}
                            >
                                <option className='bg-primary' value="">Select availability</option>
                                {availabilityOptions.map(option => (
                                    <option className='bg-primary' key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.availability && formik.errors.availability && (
                                <div className="text-red-200 text-sm mt-1">{formik.errors.availability}</div>
                            )}
                        </div>

                        {/* File Attachment */}
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="cv" className='text-white font-semibold text-lg'>
                                CV (PDF, DOC, DOCX, XLS, XLSX)
                            </label>
                            <input
                                type="file"
                                id="cv"
                                name="cv"
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                className={`w-full rounded-lg bg-white/15 px-4 py-3 text-white file:text-white file:bg-white/25 file:border-none file:rounded-md file:px-3 file:py-1 cursor-pointer outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300 ${formik.touched.cv && formik.errors.cv ? 'border-2 border-red-400' : ''
                                    }`}
                                onChange={handleFileChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.cv && formik.errors.cv && (
                                <div className="text-red-200 text-sm mt-1">{formik.errors.cv}</div>
                            )}
                            {formik.values.cv && (
                                <div className="text-green-200 text-sm mt-1 break-words">
                                    Selected file: {formik.values.cv.name}
                                </div>
                            )}
                            <div className="text-white/70 text-xs mt-1">
                                Maximum file size: 5MB
                            </div>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="message" className='text-white font-semibold text-lg'>Message</label>
                            <textarea
                                maxLength={200}
                                id="message"
                                name="message"
                                className={`w-full rounded-lg bg-white/15 px-4 py-3 text-white outline-transparent focus:outline-white focus:shadow-2xl transition-all duration-300 min-h-40 ${formik.touched.message && formik.errors.message ? 'border-2 border-red-400' : ''
                                    }`}
                                placeholder="Message (max 200 characters)"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                            />
                            <div className="flex justify-between text-sm">
                                {formik.touched.message && formik.errors.message ? (
                                    <div className="text-red-200">{formik.errors.message}</div>
                                ) : (
                                    <div></div>
                                )}
                                <div className="text-white/70">
                                    {formik.values.message.length}/200
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className='bg-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-in-out px-8 py-3 text-xl text-primary font-bold w-full rounded-lg capitalize disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </form>}

            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-xl backdrop-blur-3xl"
            >
                {isLoading ?
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-xl border border-primary/20 shadow-lg backdrop-blur-3xl h-screen animate-pulse">
                    </div>
                    : <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-xl h-full border border-primary/20 shadow-lg backdrop-blur-3xl flex flex-col gap-6">
                        <h2 className="text-3xl font-bold text-primary transition-colors">{job?.title}</h2>
                        {job?.key_responsibilities && <div id='responsibilities'>
                            <h3 className="text-xl font-semibold text-primary transition-colors mb-2 flex items-center gap-3"> <MdOutlineWork /> Key Responsibilities</h3>
                            <div className="text-primary transition-colors content" dangerouslySetInnerHTML={{ __html: job?.key_responsibilities || '' }}></div>
                        </div>}

                        {job?.preferred_qualifications && <div id='qualifications'>
                            <h3 className="text-xl font-semibold text-primary transition-colors mb-2 flex items-center gap-3"> <PiSealCheckFill /> Qualifications</h3>
                            <div className="text-primary transition-colors content" dangerouslySetInnerHTML={{ __html: job?.preferred_qualifications || '' }}></div>
                        </div>}

                    </div>}
            </motion.div>
        </div>
    </>
}

export default function JobApplication() {
    const { jobSlug } = useParams();

    const { data: job, isLoading, isError, error } = useQuery({
        queryKey: ['job', jobSlug],
        queryFn: () => {
            return axios.get(`https://nexus-consults.com/api/public/api/public/jobs/${jobSlug}`)
        },
        enabled: !!jobSlug, // Only run if jobSlug exists
    })



    if (isError) {
        return (
            <>
                <PageSEO
                    title="Job Not Found — Careers at NEXUS"
                    description="The job you are looking for might not exist or has been removed."
                    image="/Logo.png"
                />
                <ReusableHeroSection name="Job Not Found" />
                <div className="container flex justify-center items-center min-h-64">
                    <div className="text-red-600 bg-red-200 px-10 py-2 rounded-lg text-lg">
                        {error?.response?.data?.message || 'Job not found or an error occurred.'}
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <PageSEO
                title={`Apply — ${job?.data?.data?.title || 'Careers at NEXUS'}`}
                description="Submit your application to join NEXUS Engineering Consultancy. Fill out the form and our team will get back to you."
                image="/Logo.png"
            />
            <HeroSection job={job?.data?.data} />
            <JobDetails job={job?.data?.data} isLoading={isLoading} />
        </>
    )
}