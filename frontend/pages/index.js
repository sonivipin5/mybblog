
import React from "react";
import Link from "next/link";
import Image from "next/future/image";
import Allpost from "../components/AllPost";
import Sidebar from "../components/Sidebar";


const Home = (props) => {


  const {API_URL} = process.env
  const frontFe = props.post.data.filter((e, key) => {
    return (e.attributes.tags.data[0].attributes.Slug == 'front-feature')
  })
  

  return (
    <div >
      <div className="max-w-[1150px] m-auto ">
        <div className="m-7 sm:m-7 lg:max-w-[1150px] lg:m-auto lg:my-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:mx-3 ">
          {frontFe.map((item, key) => {
            return <div key={key} className="w-full lg:px-[10v] relative flex after:block  after:pb-[100%] border justify-center items-center  ">
              <Image className="w-full h-full absolute" src={item.attributes.Img.data[0].attributes.url+ '?format=webp&embed'} alt="" width={1000} height="1000" />

              <Link href={`/blog/${item.attributes.Slug}`}>
                <div className="absolute cursor-pointer flex justify-center w-[90%] h-[90%] border border-white hover:border-4  transition-all duration-700 ease-in-out group ">
                  <h1 className="absolute bottom-[5vh] md:bottom-[4vh] bg-white px-[0.9vw] text-sm group-hover:bottom-[6vh] transition-all duration-700 ease-in-out">{item.attributes.Title}</h1>
                </div>
              </Link>
            </div>
          })}
        </div>
        <div className="">
          <div className="lg:flex  ">
            <Allpost data={props} />

            <Sidebar data={props}/>
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
  const res = await fetch(`${API_URL}/v1/posts?populate=*&sort[0]=createdAt%3Adesc`, { headers: header });
  const post = await res.json();
  // Pass data to the page via props

  return {
    props: {
      post: post,
    },
  };
}

export default Home;
