import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterest, FaPinterestP, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className="w-full md:h-48 bg-[url('/Footer.jpg?format=webp&embed')] bg-no-repeat bg-cover  flex justify-center flex-col space-y-8 p-10 " >
            <div className=" flex flex-wrap text-xs justify-center uppercase ">

                <Link href="#" ><a className='w-25 h-8 shadow flex justify-center items-center bg-white px-3 grayscale hover:grayscale-0 m-1 text-[#4267B2] transition-all'><span className='mr-2'><FaFacebookF /></span>   Facebook</a></Link>
                <Link href="#" ><a className='w-25 h-8 shadow flex justify-center items-center bg-white px-3 grayscale hover:grayscale-0 m-1 text-[#1DA1F2] transition-all '><span className='mr-2'><FaTwitter /></span>   Twitter</a></Link>
                <Link href="#" ><a className='w-25 h-8 shadow flex justify-center items-center bg-white px-3 grayscale hover:grayscale-0 m-1 text-[#E60023] transition-all '><span className='mr-2'><FaPinterestP /></span>   Pinterest</a></Link>
                <Link href="#" ><a className='w-25 h-8 shadow flex justify-center items-center bg-white px-3 grayscale hover:grayscale-0 m-1 text-[#405DE6] transition-all '><span className='mr-2'><FaInstagram /></span>   Instagram</a></Link>
                <Link href="#" ><a className='w-25 h-8 shadow flex justify-center items-center bg-white px-3 grayscale hover:grayscale-0 m-1 text-[#0A66C2] transition-all '><span className='mr-2'><FaLinkedinIn /></span>   Linkdin</a></Link>
            </div>
            <div className='space-x-5 flex flex-wrap justify-center  ' >
                <Link className='w-22 h-10' href="/" ><a>MyBlog </a></Link><span>|</span>
                <Link className='w-22 h-10' href="#" ><a><strong className='text-gray-800'>Designed By : </strong> Vipin Soni </a></Link><span>|</span>
                <Link className='w-22 h-10' href="#" ><a>© Copyright All right reserved</a></Link>
            </div>
        </div>
    )
}

export default Footer   