import React, { useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const PatientDashboard = () => {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState("");

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );

      setResult(response.data.prediction);
      setConfidence(response.data.confidence);

    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };

  return (

    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 w-full p-8">

        <Navbar />

        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-slate-500 text-sm">
              Total Scans
            </h2>

            <h1 className="text-4xl font-bold text-blue-500 mt-3">
              24
            </h1>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-slate-500 text-sm">
              AI Accuracy
            </h2>

            <h1 className="text-4xl font-bold text-green-500 mt-3">
              98%
            </h1>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-slate-500 text-sm">
              Reports Generated
            </h2>

            <h1 className="text-4xl font-bold text-purple-500 mt-3">
              12
            </h1>
          </div>

        </div>

        <div className="bg-white mt-8 p-8 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold text-slate-700 mb-6">
            Upload Leg Scan
          </h2>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-6"
          />

          <br />

          <button
            onClick={handleUpload}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition duration-300"
          >
            Upload & Predict
          </button>

        </div>

        {
          result && (

            <div className="bg-white mt-8 p-8 rounded-2xl shadow-md">

              <h2 className="text-3xl font-bold text-slate-700 mb-6">
                Prediction Result
              </h2>

              <div className={`p-6 rounded-2xl text-white text-xl font-bold ${
                result.includes("Detected")
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}>

                {result}

              </div>

              <div className="mt-6">

                <h3 className="text-xl font-semibold text-slate-700">
                  Confidence Score:
                </h3>

                <div className="w-full bg-slate-200 rounded-full h-6 mt-3">

                  <div
                    className="bg-blue-500 h-6 rounded-full"
                    style={{ width: `${confidence}%` }}
                  >

                  </div>

                </div>

                <p className="mt-3 text-slate-600">
                  {confidence}%
                </p>

              </div>

            </div>

          )
        }

      </div>

    </div>
  );
};

export default PatientDashboard;