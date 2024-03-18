import React from "react";
import { useSelector } from "react-redux";

const TextBox = () => {
  const currentPDF = useSelector((state) => state.PDF.currentPDF);
  return (
    <div className="w-screen flex sm:pb-12 pb-9 justify-center items-center">
      <input
        type="text"
        placeholder={`${
          currentPDF !== null
            ? "Send a message..."
            : "Upload a PDF and ask a question..."
        }`}
        className="sm:w-4/5 w-11/12 bg-[#FFFFFF]  border shadow-sm border-[#E4E8EE]  placeholder:text-[#6E7583] text-sm sm:px-9 px-6 sm:py-4 py-3 focus:outline-none rounded-md "
      />
    </div>
  );
};

export default TextBox;
