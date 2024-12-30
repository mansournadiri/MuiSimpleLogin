import React from "react";

export const Button = ({ text, color, size, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: color,
        fontSize: size === "large" ? "20px" : "16px",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
