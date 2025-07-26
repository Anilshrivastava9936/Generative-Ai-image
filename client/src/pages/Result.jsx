import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
// import { useNavigate } from 'react-router-dom'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('');
  const { generateImage, showLogin } = useContext(AppContext)
  // const navigate=useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // if (!showLogin) {
    //   navigate('/login')

    // }

    setLoading(true)
    if (input) {
      const image = await generateImage(input)
      console.log("image", image)
      if (image) {
        console.log("image1", image)

        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }


  return (


    <motion.form
      initial={{ opacity: 1, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ duration: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler} className=' flex flex-col min-h-[90vh] justify-center items-center'>
      <div>

        <div className='relative'>
          <img className='max-w-sm rounded' src={image} alt="" />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}></span>
        </div>
        <p className={!loading ? 'hidden' : ""}>Loading........</p>
      </div>
      {!isImageLoaded &&
        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full '>
          <input onChange={e => setInput(e.target.value)} value={input} className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' type="text" placeholder='Describe what you whant to generate ' name="" id="" />

          <button className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full ' type='submit'>Generate</button>
        </div>
      }
      {isImageLoaded && <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full '>
        <p onClick={() => { setIsImageLoaded(false) }} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
        <a download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer ' href={image} >Download</a>
      </div>
      }



    </motion.form>



  )
}

export default Result