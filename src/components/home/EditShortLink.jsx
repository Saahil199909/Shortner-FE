import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios  from 'axios';
import { apiurl } from '../../../config';

export default function EditShortLink(props) {
  const location = useLocation();
  const { unique_key } = location.state || {}; 
  const [apiData, setApiData] = useState({})
  const [hasChanged, setHasChanged] = useState(false)
  const {triggerEvent} = props


  const fetchdata = async(unique_key) => {   
    try{
      const response = await axios.get(`${apiurl}user_generated_links/short-key/${unique_key}`)
      setApiData(response.data)
    }
    catch(error){
      console.log("Error in fetching api response: ",error.response)
    }
  }


  const updateDataapi = async(short_key, long_url) => {
    try{
      const response = await axios.put(`${apiurl}user_generated_links/short-key/${short_key}`, {long_url})
    }
    catch(error){
      console.log("Error in fetching api response: ",error.response)
    }
  }


  useEffect(() => {
    if(unique_key){
      fetchdata(unique_key);
      } 
    },[unique_key])

  
  const handleInputChange = (e) => {
    setHasChanged(true)
    const { name, value } = e.target;
    setApiData({
      ...apiData,
    [name]: value
  })
  }

  const handleUpdateButton = (updateData) => {
    setHasChanged(false)
    triggerEvent()
    updateDataapi(updateData.short_key, updateData.long_url)
  }
  
  return (
    <div className='flex justify-center items-center h-full'>
        <main className= "h-[97%] w-full md:h-[97%] md:w-full lg:w-[90%] xl:w-[80%] 2xl:w-[70%] border-[1.6px] border-gray-200" > 
        
          <header className='flex justify-between items-center text-2xl p-8 border-b border-gray-300'>
              <h1
              style={{ fontFamily: "Roboto, sans-serif" }}
              className="text-[23px] sm:text-[30px] text-gray-700 sm:ml-[30px]"
              >
              Edit Long url or Desc
            </h1>
            <button className={`h-10 lg:h-[50px] ml-auto lg:ml-0 text-[0.8rem] lg:text-[1.5rem] text-center text-white lg:mr-[5rem] px-4  ${hasChanged ? 'bg-blue-500' : 'bg-blue-100'} ${hasChanged?'hover:bg-blue-600':false} border rounded-md`}
            onClick={()=>handleUpdateButton(apiData)}
            >
              Update
            </button>
          </header>

          <fieldset className="flex flex-col w-full md:">
            <div className="w-full md:w-[105%] lg:w-[108%] xl:w-[106%] flex items-center mt-[3rem]">
              <i class="fa-regular fa-folder fa-2x text-gray-700 ml-[1.5rem] mr-[1.5rem] sm:ml-[4rem] sm:mr-8"></i>{" "}
              <input
                type="text"
                placeholder="Paste long link"
                name="long_url"
                value = {apiData.long_url || ''}
                onChange={handleInputChange}
                className="border border-black p-3 w-[70%] border border-gray-500 rounded-md"
              />
            </div>

            <div className="w-[90%] md:w-[96%] lg:w-[99%] flex items-center mt-[3rem]">
              <i class="fa-sharp fa-solid fa-link fa-2x text-gray-700 ml-[1.2rem] mr-[1.5rem] sm:ml-[4rem] sm:mr-[1.5rem]"></i>
              <input
                type="text"
                name="domain"
                value={apiData.domain || ''}
                // onChange={handleInputChange}
                readOnly
                className="border border-black p-3 w-[35%] sm:w-[30%] mr-[1rem] sm:mr-[2rem] border border-gray-500 rounded-md"
              />
              <h1 className=" mr-[1rem] sm:mr-[2rem] text-lg"> / </h1>
              <input
                type="text"
                name='keyLength'
                value={apiData.short_key || ''}
                readOnly
                placeholder="key-length of your choice between 5 - 10 "
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
    </div>
  )
}
