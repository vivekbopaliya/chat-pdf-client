import React from "react";
import AiPlanetLogo from "../AIPlanetLogo.svg";
import UploadPDF from "./UploadPDF";
import { useSelector } from "react-redux";
import { File } from "lucide-react";

const Header = () => {
  const currentPDF = useSelector((state) => state.PDF.currentPDF);
  return (
    <div className="shadow-sm w-screen flex justify-between sm:px-16 px-5 py-2 items-center">
      <img
        src={AiPlanetLogo}
        alt="logo "
        className="sm:w-32 w-[104px] sm:h-20 h-[50px]  object-contain"
      />

      <main className="sm:gap-12 gap-3 sm:text-base text-xs flex ">
        {currentPDF && (
          <div className="flex sm:gap-2 gap-1 justify-center items-center text-green-400">
            <File className="sm:h-5 sm:w-5 h-4 w-4" />
            <p>{currentPDF.name}</p>
          </div>
        )}
        <UploadPDF />
      </main>
    </div>
  );
};

export default Header;
