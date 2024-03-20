import React from "react";
import Header from "../components/Header";
import TextBox from "../components/TextBox";
import PDFList from "../components/PDFList";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen  justify-between items-center ">
      <Header />
      <PDFList />
      {children}
      <TextBox />
    </div>
  );
};

export default DefaultLayout;
