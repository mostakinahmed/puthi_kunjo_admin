import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../page/Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-56 bg-white shadow-md z-50">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 flex flex-col">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Layout;