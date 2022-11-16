import React from 'react'
import Image from 'next/future/image'

const About = (props) => {
  return (
    <div className='flex justify-center my-7'>
      <div className="w-full flex flex-col sm:flex-row m-auto max-w-[1150px]">
        <div className="w-4/5 m-auto">
        <img className='w-full rounded-full' src="/vipin.png" alt="" />
        </div>
       <div className="m-auto w-full">
      <div className="text-center sm:text-start">
      <h1 className=' text-4xl mb-7 relative border-4 inline-block px-4 py-2 border-[#bb9f88] after:absolute after:border-4 after:border-[#bb9f88] after:w-[104.5%] after:h-full  after:py-[28px] after:top-1 after:left-1' > About Me</h1>
      </div>
     <div className="flex flex-col text-center sm:text-start justify-center">
        <h1 className='text-4xl font-extrabold'> 
        H<span className='text-[#d89c19]'>!</span> I am, <span className='name'>Vipin Soni</span>
        <span className='text-[]'> And,</span></h1>
        <p className='sm:ml-16 text-xl m-1 sm:my-3'>I Am Full Stack Developer </p>
        <p className='sm:ml-24 text-xl m-1 sm:mb-3'> I am working with these technology</p>
     </div>
       <div className="">
        <Image className='w-[80%] m-auto sm:ml-10' src="/technology.png" alt="" width={1000} height={1000} />
       </div>
       </div>
      </div>
      
    </div>
  )
}


export default About
