import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md p-5 rounded-2xl flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Patient Dashboard
        </h1>

        <p className="text-slate-500">
          Welcome to VaricoAI Healthcare Platform
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <h2 className="font-semibold text-slate-700">
            Guru
          </h2>

          <p className="text-sm text-slate-400">
            Patient
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          G
        </div>

      </div>

    </div>
  );
};

export default Navbar;