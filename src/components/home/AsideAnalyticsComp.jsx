import React, { useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'
import axios  from 'axios';
import { apiurl } from '../../../config';
import AnalyticsSmallComp from "./AnalyticsSmallComp";
import AnalyticsLargeComp from "./AnalyticsLargeComp";
import { apidomain } from "../../../config";

export default function AsideAnalyticsComp() {
  const location = useLocation();
  const { unique_key } = location.state || {}; 
  const [apiData, setApiData] = useState({})

  const fetchdata = async(unique_key) => {   
    try{
      const response = await axios.get(`${apiurl}user_generated_links/short-key-hits-detail/${unique_key}`)
      setApiData(response.data)
      }catch(error){
        console.log("Error in fetching api response: ",error.response)
      }
    }

  useEffect(() => {
    if(unique_key){
      fetchdata(unique_key);
      } 
    },[unique_key])

  return (
    <div className="p-16 flex flex-col gap-16">
      <h1 className="text-2xl font-medium"> Link statistics for: <span className="text-green-500"> {`http://${apidomain}/${unique_key}`} </span> </h1>
      <div className="flex flex-col gap-32 sm:flex-row">
        <AnalyticsSmallComp totalHitCount={apiData.short_link_created_at} category='Created on' />
        <AnalyticsSmallComp totalHitCount={apiData.total_hit_count} category='Total Counts' />
      </div>
      <div className="flex flex-col gap-20 sm:flex-row">
        <AnalyticsLargeComp categoryDetail={apiData.os} category='os' title='operating systems' />
        <AnalyticsLargeComp categoryDetail={apiData.device} category='device' title='devices'/>
        <AnalyticsLargeComp categoryDetail={apiData.country} category='country' title='countries'/>
        <AnalyticsLargeComp categoryDetail={apiData.city} category='city' title='cities'/>
      </div>
    </div>
  );
}
