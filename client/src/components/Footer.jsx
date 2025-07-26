import React from 'react'
import { assets } from '../assets/assets'
// import { PluginContainer } from 'vite'

const Footer = () => {
    return (
        <div className='flex items-center justify-between gap-4 py-3 mt-20'>
            {/* <img src={assets.logo} alt="" /> */}
            <div className="container flex flex-row items-center h-6 p-1.5 mt-5  px-4 sm:px-6 lg:px-10">
              <img
                src={assets.logo1}
                alt="Logo 1"
                className="w-6 sm:w-10 lg:w-16 "
              />
              <img
              src={assets.logo_Generative}
              alt="Generative Logo"
              className="w-28 sm:w-36 lg:w-56"
            />
            
            </div>
            <p className=' flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden ' >Copyright @Anil lala | All right reserved .</p>
            <div className=' flex gap-2.5'>
                <img src={assets.facebook_icon} width={35} alt="" />
                <img src={assets.twitter_icon} width={35} alt="" />
                <img src={assets.instagram_icon} width={35} alt="" />
            </div>
        </div>
    )
}

export default Footer