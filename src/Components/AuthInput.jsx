import React from "react";
const AuthInput = ({ label, type, name, placeholder, Icon, value, onChange }) => (
  <div className="flex flex-col mt-5">
    <label className="text-sm">{label}</label>
    <div className="flex items-center border-b-2 border-gray-400 pb-2 mt-2">
      <Icon className="icon-style icon-size mr-2" />
      <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} className="outline-none text-sm flex-1" />
    </div>
  </div>
);
export default AuthInput;
