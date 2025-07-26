import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"

const Description = () => {
  return (
    <motion.div 
     initial={{ opacity: 1,y:100 }}
                  transition={{  duration: 1}}
                    whileInView={{duration:1,y:0}}
                    viewport={{once:true}}
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>

        <h1 className='text-3xl sm:text-4xl font-semibold'>Create AI Images</h1>
        <p className='text-gray-500 mb-8'>Turn your imagination into visual</p>

<div className='flex flex-col gap-5 md:flex-row items-center'>
    <img  className='w-80 xl:w-96' src={assets.sample_img_1} alt="" />
    <div>
        <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to image Generator</h2>
        <p className='text-gray-500 mb-4'>Easily bring your ideas to life with our free AI image generator . Wheather you need stunning visuals or uniqe imagery , our tool transform your text into eye-catching images with just a few clicks . Imagine it, describe it , and come to life instantly.</p>
        <p className='text-gray-500 mb-4'>Simply type in a text prompt , and our cutting-edge Ai, Experience the future of creativity with our powerful AI image generator that effortlessly transforms your text prompts into breathtaking visuals in seconds, enabling you to design unique artwork, enhance your projects, and captivate your audience without any design skills—simply imagine, describe, and watch it come to life instantly.</p>
    </div>
</div>
    </motion.div>
  )
}

export default Description