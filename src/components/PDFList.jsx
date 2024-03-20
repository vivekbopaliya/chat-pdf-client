import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../shadcn/ui/Sheet";
import { ArrowLeftRight } from "lucide-react";
import axios from "axios";
import { Files } from "lucide-react";
import { useSelector } from "react-redux";

const PDFList = () => {
  const isUploaded = useSelector((state) => state.PDF.isUploaded);

  const [pdfs, setPdfs] = React.useState([]);

  // Fetching all the uploaded PDFs from database
  const getPDFs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/pdfs");
      setPdfs(res?.data?.files);
    } catch (error) {
      console.log(error);
    }
  };

  // Refreshing PDF data whenever the user uploads a new PDF to provide users with updated information
  React.useEffect(() => {
    getPDFs();
  }, [isUploaded]);

  return (
    <div className="justify-start  items-center absolute h-screen   z-10 left-0  flex sm:ml-8 ml-3">
      <Sheet>
        <SheetTrigger asChild>
          <ArrowLeftRight className="hover:text-green-400 h-6 w-6 hover:h-7 hover:w-7 translate duration-200  ease-in-out cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Uploaded PDFs</SheetTitle>
          </SheetHeader>

          {/* Mapping through array of PDFs that are coming from database */}
          {pdfs?.length > 0 && (
            <div className="flex flex-col overflow-y-scroll h-full   justify-start py-6  items-start">
              {pdfs?.map((pdf) => {
                return (
                  <main className="flex gap-5 w-full sm:text-base text-sm text-gray-800  justify-start sm:px-5 px-1 py-3 hover:bg-gray-300 rounded-lg  cursor-text hover:bg-opacity-25 my-1 items-center">
                    <Files className="sm:h-8 sm:w-8 h-6 w-6 flex " />
                    <div className="flex flex-col gap-[2px] font-semibold  ">
                      <p>{pdf[0]}</p>
                      <p className="sm:text-sm text-xs text-gray-800 text-opacity-50">
                        {pdf[1]}
                      </p>
                    </div>
                  </main>
                );
              })}
            </div>
          )}

          {!pdfs.length && (
            <p className="w-full h-full text-lg font-medium flex justify-center items-center">
              No PDF uploaded.
            </p>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PDFList;
