import React from "react";

function Wrapper({ children }) {
  return (
    <div
      className="shadow-lg rounded-lg min-h-[100px] p-[10px]"
      style={{ backgroundColor: "#e2edffdb" }}
    >
      {children}
    </div>
  );
}
export default Wrapper;
