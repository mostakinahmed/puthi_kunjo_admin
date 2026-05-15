import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../page/Sidebar";
import Navbar from "./Navbar";

const Layout = () => {

  return (
    <div className="flex w-full min-h-screen bg-gray-100 flex-row">

      {/* Fixed Sidebar */}
      <div className=" left-0 top-0 h-screen w-[14%] z-50">
        <Sidebar />
      </div>
      <div className="w-[85%]">
        <Navbar />
        <Outlet />
      </div>
      {/* Main Content
      <main className="ml-64 flex-1 p-6">
        <Navbar/>
        <Outlet />
      </main> */}


    </div>
  );
};

export default Layout;