import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Navbar(props) {
  const { toggleAside } = props;
  const navigate = useNavigate();

  const handleNewLink = () => {
    navigate('/newlink');
  }

  return (
    <div className="h-full flex items-center border border-grey-900">
      <h1 className="text-slate-600 text-[1.4rem] sm:text-[2rem] ml-[0.5rem] md:ml-[2rem] ">
        ACCULYNC
      </h1>
      <button className="hidden ml-auto lg:flex lg:text-[1.5rem] justify-center items-center h-12 text-center px-4 border border-gray-400 rounded-md mr-[1rem]">
        acculy.nc
      </button>
      <button 
        className="h-10 lg:h-[50px] ml-auto lg:ml-0 text-[0.8rem] lg:text-[1.5rem] text-center text-white lg:mr-[0.5rem] px-4 bg-green-500 border rounded-md"
        onClick={handleNewLink}
        >
        New Link
      </button>
      <button
        onClick={toggleAside}
        className="lg:hidden h-11 text-center px-4 mr-[0.1rem] bg-gray-700 text-slate-600 border border-white rounded-md bg-white text-[2rem]"
      >
        ☰
      </button>
      <div className="flex flex-col">
        <button
          className="hidden lg:flex justify-center items-center px-4 text-center lg:h-[50px] lg:mr-[0.8rem] bg-slate-300 border rounded-md"
        >
          sahil chettiar <i className="fa-solid fa-angle-down ml-[0.5rem]"></i>
        </button>
      </div>
    </div>
  );
}
