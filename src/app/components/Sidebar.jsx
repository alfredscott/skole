"use client";
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link'

const Sidebar = () => {
  const [isOpen, setOpen] = useState(true)
  return (
    <div style={{marginLeft: (isOpen ? "0vw" : "-20vw")}} className="w-[20vw] h-full bg-white mr-[2vw] shadow-lg flex flex-row justify-between duration-500">
      <div>
        <div className='p-1 text-[#3DA1FB] font-[700] px-[2.5vw] pt-[2vw] text-[1.2vw]'>Menu</div>
        <div className='w-full h-[15vh] flex flex-row pl-[4vw]'>
          <div className='flex flex-col gap-[1.2vh] border-l-[#525252] border-l-[0.2vw] h-fit'>
            <Link href="/" className='px-[2vw] h-fit text-[#525252] font-[500] text-[1vw]'>Hjem</Link> 
            <Link href="/pages/assignments" className='px-[2vw] h-fit text-[#525252] font-[500] text-[1vw]'>Opgaver</Link> 
            <Link href="/pages/calender" className='px-[2vw] h-fit text-[#525252] font-[500] text-[1vw]'>Kalender</Link> 
            <Link href="/pages/settings" className='px-[2vw] h-fit text-[#525252] font-[500] text-[1vw]'>Indstillinger</Link> 
          </div>
        </div>
      </div>
      <div className='h-screen flex flex-col justify-center'>
        <div onClick={() => {setOpen(!isOpen)}} style={{marginRight: (isOpen ? "0.5vw" : "-1.9vw"), rotate: (isOpen ? "0deg" : "180deg")}} className='mr-[0.5vw] h-[4vw] flex flex-col justify-center hover:cursor-pointer duration-500'>
          <ChevronLeft className='text-[#595959]'/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
