import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const handleRegister = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert(response.data.message);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.error || "Registration failed"
      );

    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-slate-100">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[450px]">

        <h1 className="text-4xl font-bold text-center text-blue-500 mb-2">
          VaricoAI
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Create Healthcare Account
        </p>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-4 border border-slate-300 rounded-xl mb-5"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-4 border border-slate-300 rounded-xl mb-5"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-4 border border-slate-300 rounded-xl mb-5"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full p-4 border border-slate-300 rounded-xl mb-5"
          onChange={(e) => setRole(e.target.value)}
        >

          <option value="patient">
            Patient
          </option>

          <option value="doctor">
            Doctor
          </option>

        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl transition duration-300"
        >
          Register
        </button>

        <p className="text-center mt-6 text-slate-500">

          Already have an account?

          <Link
            to="/"
            className="text-blue-500 font-semibold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;