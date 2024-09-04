import React, { useState } from "react";
import { Table } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import '../../index.css'

export default function AsideHomeComp() {

  // Define the columns for the table
  const columns = [
    {
      title: "Date",
      dataIndex: 'Date',
      key: 'Date',
      align: 'center',
      render: (text) => <span className="block text-center text-lg">{text}</span>,
    },
    {
      title: "ShortLink",
      dataIndex: 'ShortLink',
      key: 'ShortLink',
      align: 'center',
      render: (text) => <span className="text-green-600 block text-center text-lg">{text}</span>, 
    },
    {
      title: "OriginalLink",
      dataIndex: 'OriginalLink',
      key: 'OriginalLink',
      align: 'center',
      render: (text) => <span className="block text-center text-lg">{text}</span>, 
    },
    {
      title: "Clicks",
      dataIndex: 'Clicks',
      key: 'clicks',
      align: 'center',
      render: (text) => <span className="block text-center text-lg">{text}</span>, 
    },
    {
      title: "Actions",
      dataIndex: 'Actions',
      key: 'Actions',
      align: 'center',
    },
  ];

  const userdata = [
    {
      key: "1",
      Date: "2024-08-01",
      ShortLink: "short.ly/abc123",
      OriginalLink: "https://www.example.com/long-url-example",
      Clicks: 42,
    },
    {
      key: "2",
      Date: "2024-08-01",
      ShortLink: "short.ly/abc123",
      OriginalLink: "https://www.example.com/long-url-example",
      Clicks: 42,
    },
    {
      key: "3",
      Date: "2024-08-01",
      ShortLink: "short.ly/abc123",
      OriginalLink: "https://www.example.com/long-url-example",
      Clicks: 42,
    },
    {
      key: "4",
      Date: "2024-08-01",
      ShortLink: "short.ly/abc123",
      OriginalLink: "https://www.example.com/long-url-example",
      Clicks: 42,
    },
    {
      key: "5",
      Date: "2024-08-01",
      ShortLink: "short.ly/abc123",
      OriginalLink: "https://www.example.com/long-url-example",
      Clicks: 42,
    },
    {
      key: "6",
      Date: "2024-08-01",
      ShortLink: "short.ly/abc123",
      OriginalLink: "https://www.example.com/long-url-example",
      Clicks: 42,
    }
  ]

  // const userdata = null

  const data = userdata || [];

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
              emptyText: (
                <p className="text-red-500 text-center text-lg">You don't have links yet. Click on new link button to get started.</p>
              ),
            }}
          />
        </div>
      </main>
    </div>
  );
}
