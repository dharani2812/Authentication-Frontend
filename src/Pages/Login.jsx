import React, { useEffect, useRef, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AuthInput from "../Components/AuthInput";
import AuthButton from "../Components/AuthButton";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // ensure body isn't locked
    document.body.style.overflow = "auto";

    // give the browser one tick and then focus
    const t = setTimeout(() => {
      if (emailRef.current) {
        emailRef.current.focus();
        console.log("Login: focused email input", emailRef.current);
      } else {
        console.warn("Login: emailRef.current is null — element not mounted");
        // diagnostic: find elements on top of input center
        const input = document.querySelector('input[name="email"]');
        if (input) {
          const r = input.getBoundingClientRect();
          const elems = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
          console.log("Elements above input (top->bottom):", elems.map(e => `${e.tagName} ${e.className || e.id}`));
        } else {
          console.warn("Login: no input[name='email'] found in DOM");
        }
      }
    }, 0);

    return () => clearTimeout(t);
  }, [location.state?.fromRegister]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
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
            ref={emailRef}
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
