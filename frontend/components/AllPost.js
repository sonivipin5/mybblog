import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import Image from 'next/future/image'


const Allpost = (props) => {
const {API_URL} = process.env

const [jump_to_page, setJump_to_page] = useState(1);

const btn = (e) => {
  setJump_to_page(e.target.value)
}


 //  Pagination
 const dataArr = props.data.post.data
 const total_page = Math.ceil(dataArr.length / 3)
 const pageSize = 3
//  const jump_to_page = 1
 const slice_index_to  = (jump_to_page - 1) * pageSize
 const slice_index = jump_to_page * pageSize
 const page = dataArr.slice(slice_index_to, slice_index)


 const number_of_page = []
 for (let i = 1; i < total_page+1; i++) {
  
  number_of_page.push(i)
 }

  return (
    <div className=' grid grid-cols-1 md:flex mx-3  md:mx-4 lg:w-[70%] lg:mx-3 '>
      <div className='w-full mb-16 lg:mx-0  '>
        {page.map((i, key) => {
          return <div key={key} className="flex mb-10 flex-col sm:flex-row sm:mx-3 lg:mx-0">
            {/* Article Image */}
            <div className="flex w-full mb-8 sm:w-2/5   ">
              <Image src={i.attributes.Img.data[0].attributes.url + '?format=webp&embed'} alt={i.attributes.Img.data[0].attributes.name} width={1000} height={1000} />
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

        {/* pagination */}
        <div className="page w-full flex m-auto">
        <div className="flex m-auto">
          {number_of_page.map((i, key) => {
            return <div key={key} className="flex m-auto">
              <div className="w-8">
              <div  className=" border flex justify-center items-center w-6 h-6">
              <button onClick={btn} value={i} >  {i}</button>
            </div>
              </div>
            </div>
          })}
        </div>
        </div>

      </div>

    </div>
  )
}


export default Allpost

