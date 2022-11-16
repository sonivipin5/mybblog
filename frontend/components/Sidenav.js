import Link from 'next/link';
import React from 'react'
import {
    FaFacebookF,
    FaTwitter,
    FaPinterestP,
    FaInstagram,
    FaLinkedinIn,
    FaSearch,
    FaBars,
    FaTimes,
    FaCalendar,
  } from "react-icons/fa";
  import Image from 'next/future/image';

const Sidenav = (props) => {
    const {API_URL}= process.env

    const toggleLeft = (e) => {
        const divCover = document.querySelector('.divCover')
        const sidenav = document.querySelector('.sidenav')
        divCover.classList.toggle('hidden')
        sidenav.classList.toggle('translate-x-full')
    }
  return (
    <div>
      <div className=" sideNav scroll">
        <div onClick={toggleLeft} className="divCover hidden w-full fixed top-0 z-[9] opacity-75 h-full bg-black transition-all  "></div>
        <div className="sidenav fixed z-10 top-0 right-0 w-[60vw] sm:w-[40%] md:w[30%] lg:w-[25%] h-[100%] overflow-y-scroll bg-white translate-x-full transition-all ">
          <FaTimes onClick={toggleLeft} className="my-4 mx-3 cursor-pointer" />
          <nav>
            <ul className="text-end mx-10 space-y-2 ">
              <Link href={'/'}><li className="text-2xl cursor-pointer">
                <a onClick={toggleLeft}>Home</a>
              </li></Link>
              <Link href={'/blog'}><li className="text-lg cursor-pointer">
                <a onClick={toggleLeft}>Blog</a>
              </li></Link>
              <Link href={'/about'}><li className="text-xl cursor-pointer">
                <a onClick={toggleLeft}>About</a>
              </li></Link>
              <Link href={'/contact'}><li className="text-sm cursor-pointer">
                <a onClick={toggleLeft}>Contact Us</a>
              </li></Link>
            </ul>
            <div className="flex justify-center text-xs my-10 space-x-4">
              <FaFacebookF className="hover:text-[#4267B2] cursor-pointer" />
              <FaTwitter className="hover:text-[#1DA1F2] cursor-pointer" />
              <FaPinterestP className="hover:text-[#E60023] cursor-pointer" />
              <FaInstagram className="hover:text-[#405DE6] cursor-pointer" />
              <FaLinkedinIn className="hover:text-[#0A66C2] cursor-pointer" />
            </div>
          </nav>

          {/* Popular Post  */}
          <div className="mx-5 uppercase">
            <p className=" text-sm block">popular post</p>
            <p className="border-b-2 relative w-full my-2 after:w-10 after:h-[2px] after:bg-black  after:absolute "></p>
            <div className="w-full ">
              {props.newPopPost.map((item, key) => {
                return (
                  <div key={key} className="my-4 ">
                    <div className="flex flex-col sm:flex-row">
                      <div className=" m-auto ">
                        <Image
                          className="w-20 h-12 "
                          src={item.attributes.Img.data[0].attributes.url+'?format=webp&embed'}
                          alt={item.attributes.Img.data[0].attributes.name}
                          width={1000}
                          height={1000}
                        />
                      </div>
                      <div className="w-[70%] flex flex-col  ml-5 normal-case">
                        <Link href={`/blog/` + item.attributes.Slug}>
                          <a onClick={toggleLeft} className="text-sm font-mono mb-1">
                            {item.attributes.Title}
                          </a>
                        </Link>
                        <div className="flex space-x-2 items-center">
                          <span className="text-sm">
                            <FaCalendar />
                          </span>
                          <span className="text-sm">
                            {item.attributes.Author.data[0].attributes.createdAt
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("-")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-slate-300 mt-4"></div>
                  </div>
                );
              })}
            </div>           
          </div>
        </div>
      </div>
    </div>
    // <></>
  )
}

export default Sidenav
