import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MyReports() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [reports, setReports] = useState([]);

  useEffect(() => {

    fetchReports();

  }, []);

  const fetchReports = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:5000/patient-history/${user.id}`
      );

      setReports(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <Sidebar role="patient" />

      <Navbar title="My Reports" />

      <div
        style={{
          marginLeft: "270px",
          padding: "30px"
        }}
      >

        <h2>
          My Prediction Reports
        </h2>

        <table
          border="1"
          cellPadding="10"
          style={{
            marginTop: "20px",
            width: "100%",
            background: "#ffffff"
          }}
        >

          <thead>

            <tr>

              <th>Prediction</th>

              <th>Confidence</th>

              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {
              reports.map((report, index) => (

                <tr key={index}>

                  <td>
                    {report.prediction}
                  </td>

                  <td>
                    {report.confidence}%
                  </td>

                  <td>
                    {report.date}
                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MyReports;