import React from "react";
import {
  FaHome,
  FaUpload,
  FaFileMedical,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 shadow-2xl">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400">
          VaricoAI
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          AI Healthcare System
        </p>
      </div>

      <div className="mt-8 px-4">

        <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-slate-800 transition duration-300">
          <FaHome />
          Dashboard
        </button>

        <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-slate-800 transition duration-300">
          <FaUpload />
          Upload Scan
        </button>

        <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-slate-800 transition duration-300">
          <FaFileMedical />
          My Reports
        </button>

      </div>

      <div className="absolute bottom-6 left-0 w-full px-4">
        <button className="flex items-center justify-center gap-3 w-full bg-red-500 hover:bg-red-600 p-3 rounded-xl transition duration-300">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;