import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthInput from "../Components/AuthInput";
import AuthButton from "../Components/AuthButton";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
       console.log("Login success, navigating to home...");
      navigate("/"); // Navigate to home on success
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-dvh bg-gradient-to-r from-violet-600 to-indigo-600">
      <div className="min-w-[300px] md:min-w-[500px] p-10 bg-blue-100 rounded-xl shadow-lg">
        <h1 className="auth-head text-center">Login</h1>

        <form onSubmit={handleLogin}>
          <AuthInput
            label="Email"
            type="email"
            name="email"
            placeholder="Type your Email"
            Icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex flex-col mt-5">
            <AuthInput
              label="Password"
              type="password"
              name="password"
              placeholder="Type your Password"
              Icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           
          </div>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          <div className="flex justify-center mt-5">
            <AuthButton label="Login" type="submit" />
          </div>
        </form>

        <p className="text-sm text-gray-400 mt-5 text-center flex justify-center gap-2">
          <span>Don't have an account? </span>
          <button
            className="text-sm text-blue-700 hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
            type="button"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
