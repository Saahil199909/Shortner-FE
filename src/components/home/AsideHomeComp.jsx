import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import '../../index.css'
import axios from "axios";
import { apiurl } from "../../../config";
import { useNavigate } from "react-router-dom";
import ModalComp from "./ModalComp";

export default function AsideHomeComp(props) {

  const {handleDeleteModel, onclose, isModalOpen, shortLink, user} = props

  // Define the columns for the table
  const columns = [
    {
      title: "Date",
      dataIndex: 'created_at',
      key: 'Date',
      align: 'center',
      render: (text) => <span className="block text-center text-lg">{text}</span>,
    },
    {
      title: "ShortLink",
      dataIndex: 'short_key',
      key: 'ShortLink',
      align: 'center',
      render: (text) => <span className="text-green-600 block text-center text-lg">{text}</span>, 
    },
    {
      title: "OriginalLink",
      dataIndex: 'long_url',
      key: 'OriginalLink',
      align: 'center',
      width: 600,
      render: (text) => <span className="block text-lg ellipsis-column">{text}</span>, 
    },
    {
      title: "Clicks",
      dataIndex: 'clicks_count',
      key: 'clicks',
      align: 'center',
      render: (text) => <span className="block text-center text-lg">{text}</span>, 
    },
    {
      title: "Actions",
      dataIndex: 'Actions',
      key: 'Actions',
      align: 'center',
      render: (_, record) => (
        <div className="flex gap-8 text-lg justify-center">
          <button onClick={() => {navigation('/home/edit', {state: {unique_key: record.unique_key}})}}> <i className="fa-sharp fa-solid fa-pen text-gray-500"></i> </button>
          <button onClick={() => {navigation('/home/analytics', {state: {unique_key: record.unique_key}})}}> <i class="fa-sharp fa-solid fa-chart-simple text-gray-500"></i> </button>
          <button> <i class="fa-sharp fa-solid fa-share-nodes text-gray-500"></i></button>
          <button onClick={() => handleDeleteModel(record.unique_key)}> <i class="fa-solid fa-trash text-gray-500"></i> </button>
        </div>
    )
    }
  ];

  const ITEMS_PER_PAGE = 10

  const [apiData, setApiData] = useState([])
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
      currentPage: 1,       // Page number starts at 1
      pageSize: ITEMS_PER_PAGE, // Items per page
  });
  const navigation = useNavigate()

  const fetchdata = async (currentPage, pageSize) => {
    setLoading(true)
    try{
      const offset = (currentPage - 1) * 10
      const response = await axios.get(`${apiurl}user_generated_links/${user.user_id}?limit=${pageSize}&offset=${offset}`)
      setApiData(response.data.data)
      setTotalItems(response.data.total_data)
    }
    catch(error){
      console.log("Error in fetching api response: ",error.response);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchdata(pagination.currentPage, pagination.pageSize)
  },[pagination])

  const handleTableChange = (newpagination) => {
    setPagination({
      currentPage: newpagination.current,  // Use `current` from Ant Design's pagination object
      pageSize: newpagination.pageSize,    // Use `pageSize` from Ant Design's pagination object
    });
  };

  const data = apiData || [];

  return (
    <div className="mt-[5rem] flex justify-center">
      <main className="w-full max-w-[90%]">
        <div  className="w-full overflow-x-auto"> 
          <Table 
            columns={columns} 
            dataSource={data}
            className="custom-table" 
            scroll={{ x: true }}
            locale={{
              emptyText: loading
                ? (
                  <p className="text-blue-500 text-center text-lg">Loading your links...</p>
                )
                : (
                  <p className="text-red-500 text-center text-lg">You don't have links yet. Click on new link button to get started.</p>
                ),
            }}
            rowKey='unique_key'
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: totalItems,
            }}
            loading={loading}
            onChange={handleTableChange}
          />
        </div>
      </main>
      {isModalOpen && <ModalComp shortLink={shortLink} onclose={onclose} deleteContentShow={true} />}
    </div>
  );
}
