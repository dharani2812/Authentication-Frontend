import { Lock, Mail, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../Components/AuthInput";
import AuthButton from "../Components/AuthButton";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   const emailRef = useRef(null); // create ref for email input

  useEffect(() => {
    document.body.style.overflow = "auto"; // ensure scroll is restored
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

   try {
  const res = await axios.post("http://localhost:5000/api/auth/register", {
    name,
    email,
    password,
  });

  alert(res.data.message || "Registration successful");

  document.body.style.overflow = "auto"; 
  setTimeout(() => navigate("/login"), 0); // Always navigate on success
} catch (err) {
  setError(err.response?.data?.message || "Something went wrong");
}

  };

  return (
    <div className="flex items-center justify-center h-dvh bg-gradient-to-r from-violet-600 to-indigo-600">
      <div className="min-w-[300px] md:min-w-[500px] p-10 bg-blue-100 rounded-xl shadow-lg">
        <h1 className="auth-head text-center">Register</h1>

        <form onSubmit={handleRegister}>
          <AuthInput
            label="Username"
            type="text"
            name="name"
            placeholder="Type your Username"
            Icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <AuthInput
            label="Email"
            type="email"
            name="email"
            placeholder="Type your Email"
            Icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
            label="Password"
            type="password"
            name="password"
            placeholder="Type your Password"
            Icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex justify-center mt-5">
            <AuthButton label="Register" type="submit" />
          </div>
        </form>

        <p className="text-sm text-gray-400 mt-5 text-center flex justify-center gap-2">
          <span>Already have an account?</span>
          <button
            className="text-sm text-blue-700 hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
            type="button"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
