import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../../../config";

export default function ModalComp(props) {
  const { shortLink, onclose, deleteContentShow } = props;

  const [deleteContent, setDeleteContent] = useState(false);

  useEffect(() => {
    if (deleteContentShow) {
      setDeleteContent(true);
    }
  }, []);

  const handleCopy = () => {
    const tempInput = document.createElement("input");
    tempInput.value = shortLink;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy"); // Legacy API
    document.body.removeChild(tempInput);
    alert("Link copied using fallback!");
  };

    const handleDelete = async (shortLink) => {
      try{
        const response = await axios.delete(`${apiurl}user_generated_links/short-key/${shortLink}`)
        if(response.status == 200){
          console.log("BEFORE onclose")
          onclose();
          window.location.reload();
        }else{
          console.log('some unepected occured', response.status, response)
        }
      }catch(error){
        console.log(error.response)
      }    
    }

  const navigate = useNavigate();

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-10 bg-opacity-30 bg-black"
      onClick={onclose}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-[90%] lg:w-[40%] xl:w-[35%]"
        onClick={(e) => e.stopPropagation()} // Prevents the click from closing the modal when clicking inside it
      >
        {deleteContent ? (
          <h2 className="text-xl mb-4 font-medium">
            Are you sure you want to permanently delete this link?
          </h2>
        ) : (
          <h2 className="text-xl mb-4">Your Link is ready 🎉</h2>
        )}
        {deleteContent ? (
          <h2>
            Please note that link redirects for URL or key = {" "}
            <span className="font-bold"> {shortLink} </span>{" "}
            will stop working.
            <span className="font-bold"> Deletion is irreversible. </span>
          </h2>
        ) : (
          <h2>copy the link below to share it or paste in browser</h2>
        )}

        <main className="flex flex-col gap-6 items-center w-full py-[1.3rem] mt-[1.5rem] bg-blue-50">
          {deleteContent ? (
            <>
              <div>
                <button
                  className="bg-white px-2 py-2 sm:p-2 sm:px-6 mr-4 sm:mr-6 text-[0.8rem] text-[#2A5BD7] rounded-md border border-[#2A5BD7]"
                  onClick={onclose}
                >
                 <span className="font-medium text-lg">Cancel</span>
                </button>
                <button
                  className="bg-[#2A5BD7] px-2 py-[0.4rem] sm:p-2 sm:px-6 text-white rounded-md"
                  onClick={() => handleDelete(shortLink)}
                >
                  <span className="font-medium text-lg">Permenantly Delete</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-[#2A5BD7] text-lg font-medium">
                {" "}
                {shortLink}{" "}
              </h2>
              <div>
                <button
                  className="bg-white px-2 py-2 sm:p-2 sm:px-6 mr-4 sm:mr-6 text-[0.8rem] text-[#2A5BD7] rounded-md border border-[#2A5BD7]"
                  onClick={() => navigate("/home/analytics")}
                >
                  <i class="fa-solid fa-chart-simple mr-1 sm:mr-2 text-[#2A5BD7]"></i>
                  view link details
                </button>
                <button
                  className="bg-[#2A5BD7] px-2 py-[0.4rem] sm:p-2 sm:px-6 text-white rounded-md"
                  onClick={handleCopy}
                >
                  <i class="fa-sharp-duotone fa-solid fa-copy mr-1 sm:mr-2"></i>
                  copy link
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
