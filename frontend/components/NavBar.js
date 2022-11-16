import React from "react";
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
import Link from 'next/link'
import Sidenav from "./Sidenav";
import OnclickSearch from "./onclickSearch";



const NavBar = (props) => {

  const {API_URL}= process.env
  const popPost = props.data.post.data;

  const newPopPost = []
  for (let i = 0; i < 5; i++) {
      const e = popPost[i];
      newPopPost.push(e)
  }
  const urls= props.data.post.data.map(e=>(e.attributes.Img.data.map(e=>(e.attributes.url))));
  const imgUrl=[]
  for (let i = 1; i < 7; i++) {
      const e = urls[i];
      imgUrl.push(e)
  }

  const toggleNav = (e) => {
    const bars = document.querySelector('.icon svg')
    const close = document.querySelector('.icon span svg')
        const navbar = document.querySelector('.navbar')
        navbar.classList.toggle('mobileNav')    
       bars.classList.toggle('hidden')
       close.classList.toggle('hidden')
       
  }

  const toggleLeft = (e) => {
      const divCover = document.querySelector('.divCover')
      const sidenav = document.querySelector('.sidenav')
      divCover.classList.toggle('hidden')
      sidenav.classList.toggle('translate-x-full')
  }

  const closeNav = (e) => {
    
    const navbar = document.querySelector('.navbar')
        navbar.classList.toggle('mobileNav')   
  }
  let translateY = '-translate-y-full'
  const search = (e) => {
   
    let searchBtn = document.querySelector('.closeBtn')
    let input = document.querySelector('.input')
    input.select()
    searchBtn.classList.toggle('-translate-y-full')
  }
  

  return (
    <>
      <div className={` relative   sm:h-[unset]  flex-col items-center sm:min-h-fit w-full`}>
        <div className="flex justify-center relative items-center w-full">
          {/* Navbar */}
          <div className="w-11/12 sm:h-40 h-40 sm:flex sm:justify-between items-center trans transition-all">
            {/* Icon Section */}
            <div className="flex sm:w-1/4 text-xs space-x-3 my-4">
              <FaFacebookF /><FaTwitter /><FaPinterestP /><FaInstagram /><FaLinkedinIn />
            </div>

            {/* Title Section */}
            <div className="title sm:w-2/4 flex justify-center items-center w-full h-20 sm:h-fit ">
              <h1 className="text-3xl  " >MyBlog</h1>
            </div>
            {/* side Menu And Search */}
            <div className="sm:w-1/4 text-sm flex justify-end items-center space-x-3 sm:space-x-5 absolute sm:relative top-3 sm:top-0 right-6 sm:right-0">
              <FaSearch onClick={search} className="sm:order-last  sm:mx-3  cursor-pointer" />
              
              <FaBars onClick={toggleLeft} className="cursor-pointer text-lg " />
            </div>
            {/* OnclickSearch */}
              <OnclickSearch result={props.data.post.data} />
            {/* Main Menu */}
          </div>
        </div>
        <div className="static">
        <div className="mainMenu">
          <hr className=" mb-2" />
          <div className=" ">
            <div className="  ">
              <div className="icon ">
                <FaBars
                  onClick={toggleNav}
                  className="bars m-auto mt-1 cursor-pointer sm:hidden text-lg transition-all"
                />
                <span onClick={toggleNav}>
                  <FaTimes className="bars m-auto mt-1 hidden cursor-pointer sm:hidden text-lg " />
                </span>
              </div>
              <nav className="navbar transition-all h-0 sm:h-6 sm:flex overflow-hidden ">
                <ul className="sm:space-x-5 mt-10 sm:mt-0 text-xl sm:text-sm  sm:flex items-center m-auto">
                  <Link href="/">
          <a onClick={toggleNav} className="block text-center my-4 sm:my-0 ">
              Home
          </a></Link><span className="hidden sm:inline">|</span><Link href="/blog">
          <a onClick={toggleNav} className="block text-center my-4 sm:my-0">
              Blog
          </a></Link><span className="hidden sm:inline">|</span><Link href="/about">
          <a onClick={toggleNav} className="block text-center my-4 sm:my-0">
              About
          </a></Link><span className="hidden sm:inline">|</span><Link href="/contact">
          <a onClick={toggleNav} className="block text-center my-4 sm:my-0">
              Contect Us
          </a></Link>

                </ul>
              </nav>
            </div>
          </div>
          <hr className="my-1 w-full mt-2" />
        </div>
        </div>
      </div>
      {/* side Navbar */}
      <Sidenav newPopPost={newPopPost} toggleLeft={toggleLeft}/>
    </>
  );

};


export async function getServerSideProps(e) {
  const header = {
    Authorization:
    `bearer ${process.env.GET_DATA_API}`,
  };
  // Fetch data from external API
  const {API_URL} = process.env
  const res = await fetch(`${API_URL}/v1/posts?populate=*`, { headers: header });
  const post = await res.json();
  // Pass data to the page via props
  console.log(post);
  return {
    props: {
      post: post,
    },
  };
}
export default NavBar;
