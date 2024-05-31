import React from "react";

const Spinner = ({ children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="cube-spinner">
        <div className="cube">
          <div className="face face1"></div>
          <div className="face face2"></div>
          <div className="face face3"></div>
          <div className="face face4"></div>
          <div className="face face5"></div>
          <div className="face face6"></div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Spinner;
