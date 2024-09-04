import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import AsideSection from "./AsideSection";
// import Main from "./Main";
import AsideHomeComp from './AsideHomeComp'
import AsideLinkComp from './AsideLinkComp'
import AsideAnalyticsComp from './AsideAnalyticsComp'
import AsideAdminComp from './AsideAdminComp'
import { apiurl } from "../../../config";

export default function Homepage() {

  const [isAsideVisible, setAsideVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shortLink, setShortLink] = useState('')

  const toggleAside = () => {
    setAsideVisible(!isAsideVisible);
  };

  const handleIsModel = async (params) => {

    const  { userId, keyLength, longUrl, domain } = params;

    try{
      const response = await axios.post(`${apiurl}generator/`, { user_id: userId, key_length: keyLength, long_url: longUrl, domain: domain })
      if(response.status == 200){
        const generatedLink = response.data.short_link;
        setShortLink(generatedLink);
        setIsModalOpen(true);
      }else{
        console.log('some unepected occured', response.status, response)
      }
    }
    catch(error){
      if(error.response){
        console.log(error.response)
      }
    }
 
  }

  const onclose = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="h-screen grid grid-rows-[4rem_1fr] grid-cols-8">
      {/* Navbar */}
      <div className={`row-span-1 col-span-8 ${isModalOpen ? 'opacity-30' : 'opacity-100'}`}>
        <Navbar toggleAside={toggleAside} />
      </div>

      {/* Aside Section */}
      <div
        className={`h-full absolute top-[4rem] lg:top-[0rem] lg:relative lg:col-span-2 xl:col-span-1 bg-gray-200 z-10 transition-transform duration-300 ${
          isAsideVisible
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        } ${isModalOpen ? 'opacity-30' : 'opacity-100'}`}
      >
        <AsideSection />
      </div>

      {/* Main Section */}
      <div className="col-span-8 lg:col-span-6 xl:col-span-7">
        <Routes>
          <Route path="/" element={<AsideHomeComp/>}></Route>
          <Route path="/link" element={<AsideLinkComp handleIsModel={handleIsModel} isModalOpen={isModalOpen} shortLink={shortLink} onclose={onclose}/>}></Route>
          <Route path="/analytics" element={<AsideAnalyticsComp/>}></Route>
          <Route path="/admin" element={<AsideAdminComp/>}></Route>
        </Routes>
      </div>
    </div>
  );
}
