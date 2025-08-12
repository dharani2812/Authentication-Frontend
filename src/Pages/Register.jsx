import { Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../Components/AuthInput";
import AuthButton from "../Components/AuthButton";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  // Step 1: Create state to store form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Step 2: Function to handle register
  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert(res.data.message); // Show success message
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-dvh bg-gradient-to-r from-violet-600 to-indigo-600">
      <div className="min-w-[300px] md:min-w-[500px] p-10 bg-blue-100 rounded-xl shadow-lg">
        <h1 className="auth-head text-center">Register</h1>

        {/* Username Input */}
        <AuthInput
          label="Username"
          type="text"
          name="name"
          placeholder="Type your Username"
          Icon={User}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email Input */}
        <AuthInput
          label="Email"
          type="email"
          name="email"
          placeholder="Type your Email"
          Icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <AuthInput
          label="Password"
          type="password"
          name="password"
          placeholder="Type your Password"
          Icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Register Button */}
        <div
          className="flex justify-center text-white mt-5 cursor-pointer bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 rounded-full hover:opacity-90"
          onClick={handleRegister}
        >
          <AuthButton label="Register" type="submit"/>
        </div>

        {/* Already have an account */}
        <p className="text-sm text-gray-400 mt-5 text-center flex justify-center gap-2">
          <span>Already have an account?</span>
          <button
            className=" text-sm text-blue-700 hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
