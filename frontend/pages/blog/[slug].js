import React, { useState } from "react";
import Image from 'next/future/image'
// import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import {
  FaCalendar,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCalendarTimes,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";

const Slug = (props) => {

  const router = useRouter();
  
  const { slug } = router.query;

  const postObj = props.post.data
  const postObjBySlug = props.post.data.find((e,) => e.attributes.Slug === slug)
  const postSlug = postObjBySlug.attributes.Slug

  let nextPage ;
  let bySlug ;
  let previousPage ;
  

  for (const i in props.post.data) {
    if (postObj[i].attributes.Slug === postSlug) {
      bySlug = postObj[i];
      if (i <= postObj.length) {     
        nextPage = postObj[parseInt(i) + 1];
        previousPage = postObj[parseInt(i) - 1];
      }
      break;
    }
  }
let img =  bySlug.attributes.Img.data[0].attributes.url+'?format=webp&embed'

  const css = { maxWidth: '100%', height: 'auto' }
  return (
    <div className=" max-w-[1150px] flex flex-col  md:m-auto my-7 md:my-7 lg:flex-row lg:my-7 ">
      <div className="lg:w-[70%] flex flex-col mx-3 md:mx-7 ">

        <div className="">
          
          {/* Post Image */}
        
        <Image src={img}  width={1000} height={1000}/>
       
   

          {/* Article Tags */}

          {<div className='inline-block my-5 '>{bySlug.attributes.tags.data.map((i, key) => {
                return <Link  key={key} href={`/tags/${i.attributes.Slug}`}><a className='border p-[1px] px-2 mr-3'>{i.attributes.Name}</a></Link>
              })}</div>}

          {/* Title */}
          <h1 className="text-2xl my-0">{bySlug.attributes.Title}</h1>

          {/* Author and Date */}
          <p className="my-5">
            <span className="inline-block mr-2 text-sm">
              <FaUser />
            </span>
            <span>{bySlug.attributes.Author.data[0].attributes.firstname}</span>
            <span className="inline-block ml-6 text-sm">
              <FaCalendarAlt />
            </span>
            <span className="inline-block ml-2 text-sm">
              {bySlug.attributes.Author.data[0].attributes.createdAt
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}{" "}
            </span>
          </p>
          
          {/* content */}
          <p className=" text-justify inline-block mb-5">
            {bySlug.attributes.Content}{" "}
          </p>
         
        </div>
        
        <div className="flex justify-between mb-5">


          {/* Previous Button */}
          
          <Link  href={`/blog/${previousPage== undefined?previousPage: previousPage.attributes.Slug}`}>
            <button  className={` bg-slate-600 text-white p-1 ${previousPage === undefined ? "invisible":''}`}>
                Previous
            </button>
          </Link>

          {/* Next Button */}
    
          <Link  href={`/blog/${nextPage== undefined?nextPage: nextPage.attributes.Slug}`}>
            <button className={` bg-slate-600 text-white p-1 ${nextPage === undefined ? "invisible":''}`}>
              Next
            </button>
          </Link>
        </div>
      </div>

      {/* SiderBar */}
     
     
      <Sidebar data={props}/>
      
     
    </div>
  );

};

export async function getServerSideProps(e) {
    const header = {
      Authorization:
      `bearer ${process.env.GET_DATA_API}`,
    };
    // Fetch data from external API
        const res = await fetch(`${process.env.API_URL}/v1/posts?populate=*&sort[0]=createdAt%3Adesc`, { headers: header });
    const post = await res.json();
    // Pass data to the page via props

    
    return {
      props: {
        post: post,
      },
    };
  }

export default Slug;
