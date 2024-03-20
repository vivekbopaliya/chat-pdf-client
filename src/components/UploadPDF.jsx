import React, { useState } from "react";
import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/ui/Dialog";
import { useDispatch } from "react-redux";
import { setCurrentPDF, setIsUploaded } from "../redux/pdf";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const UploadPDF = () => {
  const [pdf, setPdf] = useState(null);
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setPdf(file);
  };

  // Sending PDF to server using FormData
  const handleFileSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", pdf);

    try {
      await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("File uploaded successfully.");
      setIsDialogOpen(false);

      // Storing currently uploaded PDF in the Redux store for further use cases in diffrent components
      dispatch(setCurrentPDF(pdf));

      // Setting this to true to indicate that a new PDF has been uploaded.
      dispatch(setIsUploaded(true));
    } catch (error) {
      toast.error("Uploaded file must be a PDF.");
      setPdf(null);

      // Removing the uploaded file from our Redux store in case of any errors
      dispatch(setCurrentPDF(null));
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-transparent rounded-lg sm:px-9 px-2 text-sm py-2 border-2 hover:bg-gray-100 border-black font-medium flex gap-2 justify-center items-center"
        >
          <CirclePlus className="sm:h-5 sm:w-5 h-4 w-4" />
          <p className="sm:block hidden ">Upload PDF</p>
        </button>
      </DialogTrigger>

      {isDialogOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload your PDF</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center  space-y-8">
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-gray-200 mt-5 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
            >
              Choose a PDF
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => handleFile(e)}
            />
            <div className="flex items-center justify-center w-full">
              <span
                className={`w-full bg-white border ${
                  pdf !== null ? "border-green-400 " : "border-gray-300"
                } px-4 py-2 rounded-md text-gray-800`}
              >
                <span id="fileName" className="truncate">
                  {pdf !== null ? pdf?.name : "NOTE: Only PDFs are allowed."}
                </span>
              </span>
            </div>
          </div>

          <DialogFooter>
            <button
              disabled={pdf === null}
              className="bg-black text-white px-5 w-fit disabled:opacity-65 disabled:cursor-not-allowed  mt-2 py-2 rounded-lg flex gap-3"
              onClick={handleFileSubmit}
            >
              Submit
              {loading && <LoaderCircle className="animate-spin" />}
            </button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default UploadPDF;
