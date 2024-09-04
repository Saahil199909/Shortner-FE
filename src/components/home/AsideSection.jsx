import React from "react";
import { useNavigate } from "react-router-dom";


export default function AsideSection() {

  const navigation = useNavigate();

  return (
    <div className="h-full bg-white flex flex-col border border-grey-900">
      <button
        style={{ fontFamily: "Roboto, sans-serif" }}
        className="flex items-center hover:bg-gray-100 hover:text-[#382F8E] border border-b-grey-900 text-custom-gray text-[16px] pr-[6.5rem] py-4 font-semibold"
        onClick={() => navigation('/home/')}
      >
        {" "}
        <i className="fa-sharp fa-solid fa-house-chimney ml-2 mr-4 mr-3"></i> HOME
      </button>
      <button
        style={{ fontFamily: "Roboto, sans-serif" }}
        className="flex items-center hover:bg-gray-100 hover:text-[#382F8E] border border-b-grey-900 text-custom-gray text-[16px] pr-[6.5rem] py-4 font-semibold"
        onClick={() => navigation('/home/link')}
      >
        {" "}
        <i class="fa-solid fa-link ml-2 mr-4 mr-3"></i> LINKS
      </button>
      <button
        style={{ fontFamily: "Roboto, sans-serif" }}
        className=" flex items-center hover:bg-gray-100 hover:text-[#382F8E] border border-b-grey-900 text-custom-gray text-[16px] pr-[4rem] py-4 font-semibold"
        onClick={() => navigation('/home/analytics')}
      >
        {" "}
        <i class="fa-duotone fa-solid fa-chart-line ml-2 mr-4 mr-3"></i> ANALYTICS
      </button>
      <button
        style={{ fontFamily: "Roboto, sans-serif" }}
        className="flex items-center hover:bg-gray-100 hover:text-[#382F8E] border border-b-grey-900 text-custom-gray text-[16px] pr-[6.5rem] py-4 font-semibold"
        onClick={() => navigation('/home/admin')}
      >
        {" "}
        <i class="fa-sharp fa-solid fa-gear ml-2 mr-4 mr-3"></i> ADMIN
      </button>
      <button
        style={{ fontFamily: "Roboto, sans-serif" }}
        className="flex items-center hover:bg-gray-100 hover:text-[#382F8E] border border-b-grey-900 text-custom-gray text-[16px] pr-[7rem] py-4 font-semibold"
      >
        {" "}
        <i className="fa-duotone fa-solid fa-circle-question ml-2 mr-4 mr-3"></i> HELP
      </button>


      <button
        style={{ fontFamily: "Roboto, sans-serif" }}
        className="flex items-center hover:bg-gray-100 hover:text-[#382F8E] border border-b-grey-900 text-custom-gray text-[16px] pr-[7rem] py-4 font-semibold text-center"
      >
        <i className="fa-sharp fa-solid fa-gear ml-2 mr-4 sm:mr-3"></i> HELP
      </button>
    </div>
  );
}
