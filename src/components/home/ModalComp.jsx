import React from "react";

export default function ModalComp(props) {
  const { shortLink, onclose } = props;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-10 bg-opacity-30 bg-black"
      onClick={onclose}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-[90%] lg:w-[40%] xl:w-[35%]"
        onClick={(e) => e.stopPropagation()} // Prevents the click from closing the modal when clicking inside it
      >
        <h2 className="text-xl mb-4">Your Link is ready 🎉</h2>
        <h2>copy the link below to share it or paste in browser</h2>

        <main className="flex flex-col gap-6 items-center w-full py-[1.3rem] mt-[1.5rem] bg-blue-50">
          <h2 className="text-[#2A5BD7] text-lg font-medium"> {shortLink}  </h2>
          <div>
         <button className="bg-white px-2 py-2 sm:p-2 sm:px-6 mr-4 sm:mr-6 text-[0.8rem] text-[#2A5BD7] rounded-md border border-[#2A5BD7]"> <i class="fa-solid fa-chart-simple mr-1 sm:mr-2 text-[#2A5BD7]"></i> view link details </button>
          <button className="bg-[#2A5BD7] px-2 py-[0.4rem] sm:p-2 sm:px-6 text-white rounded-md"> <i class="fa-sharp-duotone fa-solid fa-copy mr-1 sm:mr-2"></i> copy link </button>
          </div>
        </main>
      </div>
    </div>
  );
}
