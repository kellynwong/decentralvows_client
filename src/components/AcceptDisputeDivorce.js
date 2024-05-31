import React, { useContext, useState } from "react";
import DataContext from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
import Textile from "../assets/textile.png";

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
      data.setIsLoading(false);
      data.setRefreshScreen(true);
      console.error(error);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="relative flex justify-center text-base mt-[6rem] items-center">
      <img
        src={Textile}
        className="rounded absolute inset-0 flex flex-col items-center justify-center m-auto mt-2"
        alt="Textile"
      />
      <div className="text-justify relative flex-col text-gray-700 p-8 w-[45rem]">
        <h1 className={`${isSubmitted ? "text-gray-300" : "text-gray-700 font-extrabold"}`}>
          A divorce has been reported. Please respond within 7 days from when divorce was first reported on
          {" " + new Date(parseInt(data?.coupleDetails[6].toString()) * 1000).toLocaleString()}
          {data.coupleDetails[7]}, else, divorce case will be escalated to a jury for resolution.
        </h1>
        <h1 className={`mt-[1rem] ${isSubmitted ? "text-gray-300" : "text-gray-700"}`}>
          Should you accept, reporter of divorce gets a refund of 2 ETH and you will get a refund of 1 ETH.
        </h1>
        <button
          className={`border-2 mt-[1rem] border-zinc-300 py-2 px-4 rounded-full font-extrabold ${
            isSubmitted ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-gray-700 hover:bg-gray-300"
          }`}
          onClick={(e) => handleDivorceResponse("accept", e)}
        >
          Accept Divorce
        </button>
        <h1 className={`mt-[2rem] ${isSubmitted ? "text-gray-300" : "text-gray-700"}`}>
          Should you dispute, a jury will be convened for review and resolution. If your dispute is successful, you will
          get a refund of 1 ETH and reporter of divorce will get 0 ETH; if dispute is unsuccessful, reporter of divorce
          gets a refund of 2 ETH and you will get nothing.
        </h1>
        <button
          className={`border-2 mt-[1rem] border-zinc-300 py-2 px-4 rounded-full font-extrabold ${
            isSubmitted ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-gray-700 hover:bg-gray-300"
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
              Your response has been successfully submitted. Dispute has been escalated to the jury. Please wait a
              period or less of 1 week for resolution. You may check the status on the Dashboard.
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptDisputeDivorce;
