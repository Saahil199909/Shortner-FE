// import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { apiurl } from "../../../config";

export default function ErrorModalComp(props) {
  const { onclose, errorData } = props;

  //   const navigate = useNavigate();

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-10 bg-opacity-30 bg-black"
      onClick={onclose}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-[90%] lg:w-[40%] xl:w-[35%]"
        onClick={(e) => e.stopPropagation()} // Prevents the click from closing the modal when clicking inside it
      >
        <h2 className="text-xl mb-4 text-red-800 font-bold"> Error </h2>

        <main className="flex flex-col px-4 gap-6 items-center w-full py-[1.3rem] mt-[1.5rem] bg-blue-50">
          <div>
            <span className="font-medium text-lg"> {errorData}</span>
          </div>
        </main>
      </div>
    </div>
  );
}
