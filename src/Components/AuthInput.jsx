import React from "react";

const AuthInput = React.forwardRef(({ label, type, name, placeholder, Icon, value, onChange }, ref) => (
  <div className="flex flex-col mt-5">
    {label && <label className="text-sm">{label}</label>}
    <div className="flex items-center border-b-2 border-gray-400 pb-2 mt-2">
      {Icon && <Icon className="icon-style icon-size mr-2" />}
      <input
        ref={ref} // ✅ forward the ref to the real input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="outline-none text-sm flex-1 bg-transparent"
      />
    </div>
  </div>
));

export default AuthInput;
