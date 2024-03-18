import React from "react";
import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/ui/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPDF } from "../redux/pdf";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { setChatHistory } from "../redux/chat";

const UploadPDF = () => {
  const currentPDF = useSelector((state) => state.PDF.currentPDF);
  const [loading, setLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleFile = (e) => {
    const file = e.target.files[0];
    dispatch(setCurrentPDF(file));
  };

  console.log(currentPDF);
  const handleFileSubmit = async () => {
    setLoading(true);
    console.log("clicked");
    const formData = new FormData();
    formData.append("file", currentPDF);

    try {
      const res = await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully.");
      console.log(res.data);
      // dispatch(setChatHistory(res.data))
      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Uploaded file must be a PDF.");
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
                  currentPDF !== null ? "border-green-400 " : "border-gray-300"
                } px-4 py-2 rounded-md text-gray-800`}
              >
                <span id="fileName" className="truncate">
                  {currentPDF !== null
                    ? currentPDF?.name
                    : "NOTE: Only PDFs are allowed."}
                </span>
              </span>
            </div>
          </div>

          <DialogFooter>
            <button
              className="bg-black text-white px-5   mt-2 py-2 rounded-lg flex gap-3"
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
