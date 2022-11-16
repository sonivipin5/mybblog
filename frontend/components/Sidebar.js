import React from 'react'
import { FaCalendar } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/future/image';

const Sidebar = (props) => {
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
    
    return (
      <div className="mx-3 sm:mx-7 lg:mr-3 my-5 md:my-0 lg:w-[28%]  h-[inherit] space-y-4 mb-5">
        <Image src="/about-us-image.jpg" alt="" width={1000} height={1000}/>

        <h1 className="text-lg">Hi! i'm a designer of Myblog</h1>

        <p>
          Aliquam varius euismod orci venenatis tincidunt. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. I was created by ThemeFreesia.
        </p>

        {/* Popular Post  */}
        <div className=" uppercase">
          <p className="font-bold block">popular post</p>
          <p className="border-b-2 relative w-full my-2 after:w-10 after:h-[2px] after:bg-black  after:absolute "></p>
          <div className="w-full ">
            {newPopPost.map((item, key) => {
              return (
                <div key={key} className="my-4 ">
                  <div className="flex">
                    <div className="  ">
                      <Image
                        className="w-20 h-12 "
                        src={item.attributes.Img.data[0].attributes.url+'?format=webp&embed'}
                        alt={item.attributes.Img.data[0].attributes.name}
                        width={1000}
                        height={1000}
                      />
                    </div>
                    <div className="w-[70%] flex flex-col ml-5 normal-case">
                      <Link href={`/blog/` + item.attributes.Slug}>
                        <a className="text-sm font-mono mb-1">
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
          <p className="font-bold block">image gallery</p>
          <p className="border-b-2 relative w-full my-2 after:w-10 after:h-[2px] after:bg-black  after:absolute "></p>
          <div className="grid grid-cols-3 mb-7">
            {imgUrl.map((e, key) => {
              return (
                <div key={key}>
                  <a href={ e} target="_blank" rel="noreferrer">
                    {" "}
                    <Image
                      className="w-full h-full p-[2px]"
                      src={e+'?format=webp&embed'}
                      alt={e.name}
                      width={1000}
                      height={1000}
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
}


export default Sidebar