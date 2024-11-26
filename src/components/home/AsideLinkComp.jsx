import React, { useEffect, useState } from "react";
import ModalComp from "./ModalComp";
import { apidomain } from "../../../config";
import ErrorModalComp from "./ErrorModalComp";


export default function AsideLinkComp(props) {
  const { handleIsModel, isModalOpen, errorModalOpen, errorData, shortLink, onclose } = props;

  const [generateUrlParams, setGenerateUrlParams] = useState({
    userId: 2,
    keyLength: 0,
    longUrl: "",
    domain: apidomain,
  });

  const handleInputChange = (e) => {
    const { name } = e.target;
    setGenerateUrlParams((prevstate) => ({
      ...prevstate,
      [name]: e.target.value,
    } ));
  };

  return (
    <div className="flex justify-center items-center h-full">
      <main
        className={`h-[97%] w-full md:h-[97%] md:w-full lg:w-[90%] xl:w-[80%] 2xl:w-[70%] border-[1.6px] border-gray-200 ${
          isModalOpen ? "opacity-30" : "opacity-100"
        }`}
      >
        <header className="flex items-center justify-between h-[10%] border-b border-gray-300 ">
          <h1
            style={{ fontFamily: "Roboto, sans-serif" }}
            className="text-[30px] text-gray-700 ml-[30px]"
          >
            Acculync
          </h1>
          <button
            style={{ fontFamily: "Roboto, sans-serif" }}
            className="bg-[#2FD4E0] text-white text-lg mr-[35px] p-2 border rounded-md "
            onClick={() => handleIsModel(generateUrlParams)}
          >
            Generate
          </button>
        </header>

        <fieldset className="flex flex-col w-full md:">
          <div className="w-full md:w-[105%] lg:w-[108%] xl:w-[106%] flex items-center mt-[3rem]">
            <i class="fa-regular fa-folder fa-2x text-gray-700 ml-[1.5rem] mr-[1.5rem] sm:ml-[4rem] sm:mr-8"></i>{" "}
            <input
              type="text"
              placeholder="Paste long link"
              name="longUrl"
              onChange={handleInputChange}
              className="border border-black p-3 w-[70%] border border-gray-500 rounded-md"
            />
          </div>

          <div className="w-[90%] md:w-[96%] lg:w-[99%] flex items-center mt-[3rem]">
            <i class="fa-sharp fa-solid fa-link fa-2x text-gray-700 ml-[1.2rem] mr-[1.5rem] sm:ml-[4rem] sm:mr-[1.5rem]"></i>
            <input
              type="text"
              name="domain"
              value="https://shortner-be.onrender.com"
              onChange={handleInputChange}
              readOnly
              className="border border-black p-3 w-[35%] sm:w-[30%] mr-[1rem] sm:mr-[2rem] border border-gray-500 rounded-md"
            />
            <h1 className=" mr-[1rem] sm:mr-[2rem] text-lg"> / </h1>
            <input
              type="text"
              name='keyLength'
              onChange={handleInputChange}
              placeholder="key-length should be either 5 or 6  "
              className="border border-black p-3 w-[41%] sm:w-[37%] border border-gray-500 rounded-md "
            />
          </div>

          <div className="w-full md:w-[105%] lg:w-[108%] xl:w-[106%] flex items-center mt-[3rem]">
            <i class="fa-solid fa-grip-lines fa-2x text-gray-700 ml-[1.8rem] mr-[1.7rem] sm:ml-[4rem] sm:mr-8"></i>
            <input
              type="text"
              placeholder="enter link description"
              className="border border-black p-3 w-[70%] border border-gray-500 rounded-md"
            />
          </div>
        </fieldset>
      </main>
      {isModalOpen && <ModalComp shortLink={shortLink} onclose={onclose} />}
      {errorModalOpen && <ErrorModalComp onclose={onclose} errorData={errorData} />}
    </div>
  );
}
