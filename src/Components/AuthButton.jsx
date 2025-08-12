import React from "react";

const AuthButton = ({ label,type,onClick }) => (
  <button className="w-full text-white bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 rounded-full hover:opacity-90 transition cursor-pointer"  type={type} onClick={onClick} >
    {label}
  </button>
);
    export default AuthButton;