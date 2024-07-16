"use client";
import { Plus } from 'lucide-react';
import { createElement } from 'react';

export default function Assignments() {
  function createTodo() {
    var item = createElement("div")
    
  }

  return (
    <main>
      <div className="flex flex-col w-full h-full mt-[4vh] pr-[2vw]">
        <div className="bg-white shadow-lg w-full h-[40vw] rounded-lg p-[1.5vw] flex flex-row gap-[2vw]">
          <div id="todoContainer" className="bg-[#ECEDF1] h-full w-1/3 flex flex-col p-[1vw] rounded-lg shadow-inner">
            <div className="text-[1.25vw] font-[500] bg-white rounded-lg p-[0.5vw] shadow-lg flex flex-row items-center justify-between px-[0.75vw]"><div>Skal laves:</div><Plus onClick={createTodo} className='bg-[#3DA1FB] rounded-[0.5vw] text-white w-[1.5vw] h-[1.5vw] hover:cursor-pointer'/></div>
          </div>
          <div id="doingContainer" className="bg-[#ECEDF1] h-full w-1/3 flex flex-col p-[1vw] rounded-lg shadow-inner">
            <div className="text-[1.25vw] font-[500] bg-white rounded-lg p-[0.5vw] shadow-lg">Laver:</div>
          </div>
          <div id="doneContainer" className="bg-[#ECEDF1] h-full w-1/3 flex flex-col p-[1vw] rounded-lg shadow-inner">
            <div className="text-[1.25vw] font-[500] bg-white rounded-lg p-[0.5vw] shadow-lg">Har lavet:</div>
          </div>
        </div>
      </div> 
    </main>
  );
}
