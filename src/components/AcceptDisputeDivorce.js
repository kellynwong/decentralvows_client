import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
const ethers = require("ethers");

const AcceptDisputeDivorce = () => {
  const data = useContext(DataContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [disputed, setDisputed] = useState(false);
  const navigate = useNavigate();

  const handleDivorceResponse = async (responseType, e) => {
    setIsSubmitted(true);
    data.setIsLoading(true);
    e.preventDefault();
    try {
      const signer = await data.provider.getSigner();
      let transaction;
      if (responseType === "accept") {
        transaction = await data?.marriage.connect(signer).acceptDivorce();
        setAccepted(true);
      } else if (responseType === "dispute") {
        transaction = await data?.marriage.connect(signer).disputeDivorce();
        setDisputed(true);
      }
      await transaction.wait();
      data.setIsLoading(false);
      data.setRefreshScreen(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 8000);
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="ml-[8rem] mt-[4rem] w-[45rem]">
      <h1 className={`mt-[2rem] ${isSubmitted ? "text-gray-500" : "text-red-400 font-extrabold"}`}>
        A divorce has been reported. Please respond within 7 days from when divorce was first reported on
        {" " + new Date(parseInt(data?.coupleDetails[6].toString()) * 1000).toLocaleString()}
        {data.coupleDetails[7]}, else, divorce case will be escalated to a jury for resolution.
      </h1>
      <h1 className={`mt-[2rem] ${isSubmitted ? "text-gray-500" : "text-black font-extrabold"}`}>
        Should you accept, reporter of divorce gets a refund of 2 ETH and you will get a refund of 1 ETH:
      </h1>
      <button
        className={`mt-4 rounded p-1 m-2 py-1 px-3 transition-colors border ${
          isSubmitted
            ? "text-gray-500 bg-gray-100 cursor-not-allowed"
            : "text-red-400 hover:bg-red-100 hover:text-black"
        }`}
        onClick={(e) => handleDivorceResponse("accept", e)}
      >
        Accept Divorce
      </button>
      <h1 className={`mt-[2rem] ${isSubmitted ? "text-gray-500" : "text-black font-extrabold"}`}>
        Should you dispute, a jury will be convened for review and resolution. If your dispute is successful, you will
        get a refund of 1 ETH and reporter of divorce will get 0 ETH; if dispute is unsuccessful, reporter of divorce
        gets a reund of 2 ETH and you will get nothing.
      </h1>
      <button
        className={`mt-4 rounded p-1 m-2 py-1 px-3 transition-colors border ${
          isSubmitted
            ? "text-gray-500 bg-gray-100 cursor-not-allowed"
            : "text-red-400 hover:bg-red-100 hover:text-black"
        }`}
        onClick={(e) => handleDivorceResponse("dispute", e)}
      >
        Dispute Divorce
      </button>
      {accepted && (
        <>
          <h1 className="mt-[2rem] font-extrabold">
            Your response has been successfully submitted. You have received a refund of 1 ETH.
          </h1>
        </>
      )}
      {disputed && (
        <>
          <h1 className="mt-[2rem] font-extrabold">
            Your response has been successfully submitted. Dispute has been escalated to the jury. Please wait a period
            or less of 1 week for resolution. You may check the status on the Dashboard.
          </h1>
        </>
      )}
    </div>
  );
};

export default AcceptDisputeDivorce;
