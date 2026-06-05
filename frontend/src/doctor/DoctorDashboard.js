import React from "react";

const DoctorDashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div className="flex">

      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-slate-950 text-white p-6">

        <h1 className="text-5xl font-bold text-blue-400 mb-2">
          VaricoAI
        </h1>

        <p className="text-slate-400 mb-10">
          Doctor Panel
        </p>

        <ul className="space-y-6 text-lg">

          <li className="hover:text-blue-400 cursor-pointer">
            Dashboard
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            Patient Records
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            AI Reports
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            Analytics
          </li>

        </ul>

      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-100 min-h-screen p-8">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Doctor Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Welcome to VaricoAI Healthcare Platform
            </p>

          </div>

          <div className="text-right">

            <h2 className="text-2xl font-bold text-slate-800">
              Dr. {user?.name}
            </h2>

            <p className="text-slate-500">
              Doctor
            </p>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mt-8">

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-slate-500 text-xl">
              Total Patients
            </h3>
            <p className="text-5xl font-bold text-blue-500 mt-4">
              120
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-slate-500 text-xl">
              Positive Cases
            </h3>
            <p className="text-5xl font-bold text-red-500 mt-4">
              48
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-slate-500 text-xl">
              AI Accuracy
            </h3>
            <p className="text-5xl font-bold text-green-500 mt-4">
              98%
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-slate-500 text-xl">
              Reports Generated
            </h3>
            <p className="text-5xl font-bold text-purple-500 mt-4">
              342
            </p>
          </div>

        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Patient Records
          </h2>

          <table className="w-full">

            <thead>

              <tr className="bg-slate-100 text-left">

                <th className="p-4">ID</th>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Prediction</th>
                <th className="p-4">Confidence</th>
                <th className="p-4">Status</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="p-4">1</td>
                <td className="p-4">Guru</td>
                <td className="p-4">
                  Varicose Veins Detected
                </td>
                <td className="p-4">99.9%</td>

                <td className="p-4">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full">
                    Critical
                  </span>
                </td>

              </tr>

              <tr className="border-b">

                <td className="p-4">2</td>
                <td className="p-4">Rahul</td>
                <td className="p-4">Normal Leg</td>
                <td className="p-4">96.2%</td>

                <td className="p-4">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full">
                    Normal
                  </span>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default DoctorDashboard;