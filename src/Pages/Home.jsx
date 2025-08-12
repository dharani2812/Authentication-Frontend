import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear auth token
    navigate("/login");               // Redirect to login page
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Home Page!</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
