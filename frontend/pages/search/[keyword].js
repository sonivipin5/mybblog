import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Image from 'next/future/image';
import qs from 'qs';

const Search = (props) => {
  const { API_URL } = process.env
  const router = useRouter()
  const { keyword } = router.query;

  const [Search, setSearch] = useState(`${keyword}`);
  // const [data, setData] = useState();
  const query = qs.stringify({
    populate: '*',
    filters: {
      "*":
      {
        $containsi: `${Search}`,
      },
    },


  }, { encodeValuesOnly: true }, // prettify URL  
  )

  return (
    <div >
    <div className="max-w-[1150px] m-auto mt-7">
      <div className="">
        {/* Search Result */}
          <p className='my-5 mx-10'>Search Result : ({props.post.data.length}) Result found</p>
        <div className="lg:flex ">
        <div className=' grid grid-cols-1 md:flex mx-3  md:mx-4 lg:w-[70%] lg:mx-3 '>
      <div className='w-full mb-16 lg:mx-0  '>
        {props.post.data.map((i, key) => {
          return <div key={key} className="flex mb-10 flex-col sm:flex-row sm:mx-3 lg:mx-0">
            {/* Article Image */}
            <div className="flex w-full mb-8 sm:w-1/5   ">
              <Image src={i.attributes.Img.data[0].attributes.url + '?format=webp&embed'} alt={i.attributes.Img.data[0].attributes.url} width={1000} height={1000}/>
            </div>

            <div className=" sm:w-3/5 sm:ml-8 ">

              {/* Article Tags */}

              {<div className='flex text-[10px] space-x-2 '>{i.attributes.tags.data.map((i, key) => {
                return <Link  key={key} href={`/tags/${i.attributes.Slug}`}><a className='border  border-black p-[1px] px-2'>{i.attributes.Name}</a></Link>
              })}</div>}

              {/* Article Title */}

              <h1> <Link href={`/blog/${i.attributes.Slug}`}><a className='my-3 inline-block leading-5 text-lg font-bold '>{i.attributes.Title}</a></Link></h1>
              <Link href={`/blog/${i.attributes.Slug}`}><a className='mb-3 text-xs inline-block '>{i.attributes.Content.slice(0, 180)} [...]</a></Link>
            </div>
          </div>
        })}

      

      </div>

    </div>

          <Sidebar data={props.data}/>
          
        </div>
      </div>
    </div>
  </div>
   
  )
}

export async function getServerSideProps(e) {

  const header = {
    Authorization:
    `bearer ${process.env.GET_DATA_API}`,
  };

  const { API_URL } = process.env

  const query = qs.stringify({
    populate: '*',
    filters: {
      "*":
      {
        $containsi: `${e.query.keyword}`,
      },
    },
  }, { encodeValuesOnly: true }, // prettify URL  
  )

  const response = await fetch(`${API_URL}/v1/posts?${query}`, { headers: header });
  let post = await response.json()

  return { props: { post } }
}

export default Search
