import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SendHorizontal } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { setChatHistory } from "../redux/chat";
import toast from "react-hot-toast";
import axios from "axios";

const TextBox = () => {
  const currentPDF = useSelector((state) => state.PDF.currentPDF);
  const dispatch = useDispatch();

  const [question, setQuestion] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://chatpdf-server.onrender.com/chat", {
        question: question,
      });
      dispatch(
        // Dispatching the data to the Redux store to update the chat history array
        setChatHistory({
          question: question,
          answer: res?.data,
        })
      );
      setQuestion("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong on server side, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen flex sm:pb-12 pb-9 justify-center items-center">
      <div className="relative sm:w-4/5 w-11/12">
        <input
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          disabled={loading || currentPDF === null}
          type="text"
          placeholder={`${
            currentPDF !== null
              ? "Ask a question..."
              : "Upload a PDF and ask a question..."
          }`}
          className="disabled:bg-gray-300 disabled:cursor-not-allowed disabled:bg-opacity-35 w-full bg-[#FFFFFF] border shadow-sm border-[#E4E8EE] placeholder:text-[#6E7583] text-sm sm:px-9 px-6 sm:py-4 py-3 focus:outline-none rounded-md"
        />
        <div className="absolute text-[#6E7583] inset-y-0 right-0 flex items-center sm:pr-6 pr-4 hover:text-black cursor-pointer">
          {!loading && currentPDF !== null && question !== "" && (
            <SendHorizontal
              onClick={handleSubmit}
              className="sm:w-6 sm:h-6 w-5 h-5"
            />
          )}
          {loading && (
            <LoaderCircle className="sm:w-6 sm:h-6 w-5 h-5 animate-spin " />
          )}
        </div>
      </div>
    </div>
  );
};

export default TextBox;
