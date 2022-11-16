import { useState } from "react";
import React from "react";
import Link from "next/link";
import Allpost from "../../components/AllPost";
import Sidebar from "../../components/Sidebar";

const Index = (props) => {

  const {API_URL} = process.env
  const frontFe = props.post.data.filter((e, key) => {
    return (e.attributes.tags.data[0].attributes.Slug == 'front-feature')
  })
  
  return (
    <div id="top">
      <div className="max-w-[1150px] m-auto mt-7">
        <div className="">
          <div className="lg:flex ">
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
  const res = await fetch(`${API_URL}/v1/posts?populate=*`, { headers: header });
  const post = await res.json();
  // Pass data to the page via props
  return {
    props: {
      post: post,
    },
  };
}

export default Index;
