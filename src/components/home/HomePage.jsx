import React, { useEffect, useState } from "react";
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
import EditShortLink from "./EditShortLink";
import '../../index.css'

export default function Homepage() {

  const [isAsideVisible, setAsideVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shortLink, setShortLink] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [toastAnimationclass, setToastAnimationclass] = useState('')
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorData, setErrorData] = useState('')

  // fuctnion for update notification visibility
  const triggerEvent = () => {
    setToastAnimationclass('slide-in'); // Apply the slide-in animation
    setShowNotification(true); // Show the div

    // After 3 seconds, apply the slide-out animation
    setTimeout(() => {
      setToastAnimationclass('slide-out');
    }, 3000);

    // Hide the div completely after the slide-out animation ends (after 3.5 seconds total)
    setTimeout(() => {
      setShowNotification(false);
    }, 3500);
  };

  const toggleAside = () => {
    setAsideVisible(!isAsideVisible);
  };

   // Use useEffect to log the value AFTER the state has updated
  useEffect(() => {
    console.log(isAsideVisible, "After state update");
  }, [isAsideVisible]);  // This effect runs whenever isAsideVisible changes

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
        setErrorData(error.response.data.detail)
        setErrorModalOpen(true)
      }
    }
 
  }

  const handleDeleteModel = (short_key) => {
    setShortLink(short_key)
    setIsModalOpen(true);
  }

  const onclose = () => {
    console.log("AFTER  ONCLOSE")
    setIsModalOpen(false)
    setErrorModalOpen(false)
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
        <AsideSection  toggleAside={toggleAside} />
      </div>

      {/* Main Section */}
      <div className="col-span-8 lg:col-span-6 xl:col-span-7">
        <Routes>
          <Route path="/" element={<AsideHomeComp handleDeleteModel={handleDeleteModel} onclose={onclose} isModalOpen={isModalOpen} shortLink={shortLink} />}></Route>
          <Route path="/link" element={<AsideLinkComp handleIsModel={handleIsModel} isModalOpen={isModalOpen} errorModalOpen={errorModalOpen} errorData={errorData}  shortLink={shortLink} onclose={onclose}/>}></Route>
          <Route path="/analytics" element={<AsideAnalyticsComp/>}></Route>
          <Route path="/admin" element={<AsideAdminComp/>}></Route>
          <Route path="/edit" element={<EditShortLink triggerEvent={triggerEvent}/>}></Route>
        </Routes>
      </div>

      {showNotification ? 
            <div className={`w-[25%] absolute bottom-10 left-20 bg-gray-400 z-50 border rounded-md ${toastAnimationclass}`}>
              <h2 className="p-3 ml-4 text-xl font-normal">Changes were updated succesfully</h2>
            </div> : 
            false 
      }
      
    </div>
  );
}
