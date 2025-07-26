import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from "motion/react"

const Testimonials = () => {
    return (
        <motion.div
            initial={{ opacity: 1, y: 100 }}
            transition={{ duration: 1 }}
            whileHover={{ duration: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col items-center justify-center my-20 p-12 '>
            <h1 className='text-3xl sm:text-4xl font-semibold'>Customer Testimonials</h1>
            <p className='text-gray-500 mb-8'>What our Users Are Saying</p>
            <div className='flex flex-wrap gap-6'>
                {testimonialsData.map((testimonial, index) => (
                    <div className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all ' key={index} >
                        <div className='flex flex-col items-center'> <img className='rounded-full w-14' src={testimonial.image} alt="" /> </div>
                        <h2 className='text-xl font-semiboldmt-3'>{testimonial.name}</h2>
                        <p className='text-gray-500'>{testimonial.role}</p>
                        <div className='flex mb-4'>
                            {Array(testimonial.stars).fill().map((item, index) => (
                                <img className='' key={index} src={assets.rating_star} ></img>
                            ))}

                        </div>
                        <p className='text-center text-sm text-gray-600'>{testimonial.text}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default Testimonials