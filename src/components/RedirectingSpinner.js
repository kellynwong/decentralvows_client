import React from "react";

const RedirectingSpinner = ({ children }) => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <h2 className="text-gray-300 font-bold">Redirecting to Dashboard...</h2>
        </div>
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
      </div>
      {children}
    </div>
  );
};

export default RedirectingSpinner;
