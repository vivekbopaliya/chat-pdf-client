import React from "react";
import { useSelector } from "react-redux";
import AiLogo from "../AiLogo.jpg";

const Home = () => {
  const chats = useSelector((state) => state.chat.chatHistory);
  return (
    <div className="sm:w-9/12 w-full sm:px-0 px-3 h-full justify-start items-start">
      {chats?.map((chat) => {
        return (
          <div className="flex flex-col gap-6 mb-11 mt-4  sm:text-lg text-base px-3 py-2 justify-start items-start">
            <main className="flex  justify-center items-center">
              {/* <User className="w-9 h-9 mr-14 opacity-80" /> */}
              <p className="text-gray-900 opacity-80">{chat?.question}</p>
            </main>

            <main className="flex gap-6 justify-center items-center">
              <img
                src={AiLogo}
                alt="AI logo"
                className="w-16 h-16 object-contain"
              />
              <p className="font-medium">{chat?.answer}</p>
            </main>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
