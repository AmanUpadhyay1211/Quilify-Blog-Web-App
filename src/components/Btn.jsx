import React from "react";

function Btn({
  children,
  bg = "bg-black",
  text = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`w-full py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition duration-300 ${bg} ${text} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Btn;

