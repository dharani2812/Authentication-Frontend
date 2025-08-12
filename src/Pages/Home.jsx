import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "../Components/AuthButton";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="p-4 space-y-4 flex justify-center items-center h-dvh flex-col">
      <h1 className="text-2xl font-bold mb-4">Welcome to Home Page</h1>

      {isLoggedIn ? (
        <AuthButton label="Logout" type="button" onClick={handleLogout} />
      ) : (
        <div className="flex gap-4">
          <AuthButton
            label="Login"
            type="button"
            onClick={() => navigate("/login")}
          />
          <AuthButton
            label="Register"
            type="button"
            onClick={() => navigate("/register")}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
