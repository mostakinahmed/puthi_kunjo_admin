import React from "react";
import {
  Search,
  Bell,
  Settings,
  UserCircle2,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full ml-2 my-3 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back 👋
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        
        {/* SEARCH */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-blue-100"
          />
        </div>

        {/* NOTIFICATION */}
        <button className="relative p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all">
          <Bell size={20} className="text-gray-700" />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* SETTINGS */}
        <button className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all">
          <Settings size={20} className="text-gray-700" />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl">
          <UserCircle2 size={35} className="text-blue-600" />

          <div className="hidden sm:block">
            <h3 className="text-sm font-bold text-gray-800">
              Admin
            </h3>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;