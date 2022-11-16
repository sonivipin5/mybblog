import React from 'react'
import { RiArrowUpSLine } from 'react-icons/ri'

const BottomToTop = () => {
    const arrow='fixed w-10 h-10 bg-black text-white flex justify-center items-center opacity-40 right-5 bottom-10 cursor-pointer rounded-sm'
  return (
    <div className=''>
      <a href="#top"><div className={arrow}><RiArrowUpSLine/></div></a>
    </div>
  )
}



export default BottomToTop
