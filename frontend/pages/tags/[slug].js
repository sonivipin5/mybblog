import React, { useState } from "react";
import Image from "next/future/image";
import { useRouter } from "next/router";

import {
  FaCalendar,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import Allpost from "../../components/AllPost";
import Sidebar from "../../components/Sidebar";



const Tags = (props) => {
  const { API_URL } = process.env;

  const router = useRouter();
  
  const { slug } = router.query;


  return (
    <div >
    <div className="max-w-[1150px] m-auto my-7 ">
      
      <div className="">
        <div className="lg:flex  ">
        <div className=' grid grid-cols-1 md:flex mx-3  md:mx-4 lg:w-[70%] lg:mx-3 '>
      <div className='w-full mb-16 lg:mx-0  '>
        {props.obj.tags.data.map((i, key) => {
          return <div key={key} className="flex mb-10 flex-col sm:flex-row sm:mx-3 lg:mx-0">
            {/* Article Image */}
            <div className="flex w-full mb-8 sm:w-2/5   ">
              <Image src={i.attributes.Img.data[0].attributes.url + '?format=webp&embed'} alt={i.attributes.Img.data[0].attributes.name} width={1000} height={1000} />
            </div>

            <div className=" sm:w-3/5 sm:ml-8 ">

              {/* Article Tags */}

              {<div className='flex text-[10px] space-x-2 '>{i.attributes.tags.data.map((i, key) => {
                return <Link key={key} href={`/tags/${i.attributes.Slug}`}><a  className='border  border-black p-[1px] px-2'>{i.attributes.Name}</a></Link>
              })}</div>}

              {/* Article Title */}

              <h1> <Link href={`/blog/${i.attributes.Slug}`}><a className='my-3 inline-block leading-5 text-lg font-bold '>{i.attributes.Title}</a></Link></h1>
              <Link href={`/blog/${i.attributes.Slug}`}><a className='mb-3 text-xs inline-block '>{i.attributes.Content.slice(0, 180)} [...]</a></Link>
            </div>
          </div>
        })}

              </div>

    </div>

          <Sidebar data={props.obj}/>
        </div>
      </div>
    </div>
  </div>

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

  const tag = await fetch(`${API_URL}/v1/posts?filters[tags][slug][$eq]=${e.query.slug}&populate=*`, { headers: header });
  const tags = await tag.json();

  let obj ={ post: post, tags:tags}
  // Pass data to the page via props
  return {
    props: {
        obj
    },
  };
}

export default Tags;
