import Link from 'next/link'
import React,{useState,useEffect} from 'react'
import { RiCloseLine } from 'react-icons/ri'
import axios from 'axios'
import { useRouter } from 'next/router';

import qs from 'qs'

const OnclickSearch = (props) => {
const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);


  const closeSearch = (e) => {
    let searchBtn = document.querySelector('.closeBtn')
    searchBtn.classList.toggle('-translate-y-full')
    setSearchQuery('')
  }
  
 
  useEffect(() => {
    const result = async ()=>{
      const header = {
        Authorization:
        `bearer ${process.env.GET_DATA_API}`,
      };
    
 
      const query = qs.stringify({
        populate: '*',
        filters: {
          "*":
          {
            $containsi: `${searchQuery}`,
          },
        },
      }, { encodeValuesOnly: true }, // prettify URL  
      )
    
      const response = await axios(`${process.env.API_URL}/v1/posts?${query}`, { headers: header });
      setSearchResult(response.data.data)

      
    }
    result()
    
  }, [searchQuery]);
  
  const handleSearch = (text) => {
    // let matches = searchResult.filter(e=>{
    //   const regex = new RegExp(`${text}`, 'gi')
    // })
    setSearchQuery(text)
    router.push('/search/'+`${text}`)
  }
  

 
  return (
    <div >
      <div  className={`closeBtn z-[11] -translate-y-full transition-all fixed  w-full h-screen flex left-0 top-0 bg-opacity-20 bg-gray-800 justify-center`}>
        <div className="transition-all relative w-full sm:w-3/4 m-5 mt-20 py-10 sm:p-10 flex justify-center flex-col items-center h-fit bg-white space-x-3 ">
         <Link href={`/search/${searchQuery}`}>
          <form className="transition-all flex flex-col items-center sm:flex-row space-y-2 sm:space-x-3 m-auto">
            <label htmlFor="search">Search</label>
            <div className="space-x-3 mx-3 flex justify-center ">
              <input className='input border w-[70%] pl-0 border-gray-500 ml-[0px] rounded-xl outline-none indent-3 ' type="text" name="search" id="search" onChange={e=>handleSearch(e.target.value)} value={searchQuery} />
              <button onClick={closeSearch} className='w-10 bg-slate-400 rounded-2xl text-white' type="submit">Go</button>
            </div>
            </form>
         </Link>
         <div className='max-h-[30vh] overflow-hidden overflow-y-scroll'>
          {searchResult.map((e,i)=>{
             return <div key={i} className='mt-3 ' >
                      {searchQuery!=0?
                      <Link  href={`/blog/${e && e.attributes.Slug}`}><a  onClick={closeSearch} className='inline-block border '>{e && e.attributes.Title ||e.attributes.Content}</a></Link>
                    :""}
                  </div>
          })}
        </div>
              <RiCloseLine  onClick={closeSearch} className='absolute cursor-pointer text-3xl right-3 top-3'/>
        </div>
      </div>
    </div>
  )
}


export default OnclickSearch
