import React, { useContext, useState } from "react";
import DataContext from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
import Textile from "../assets/textile.png";

const Retrieve = () => {
  const data = useContext(DataContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refundSuccessful, setRefundSuccessful] = useState(false);
  const navigate = useNavigate();

  // Retrieve deposit by user 1
  const handleSubmit = async (e) => {
    setIsSubmitted(true);
    data.setIsLoading(true);
    e.preventDefault();
    try {
      const signer = await data.provider.getSigner();
      let transaction = await data?.marriage.connect(signer).retrieveDeposit();
      const receipt = await transaction.wait();
      console.log("Transaction Receipt: ", receipt);
      setRefundSuccessful(true);
      data.setIsLoading(false);
      data.setRefreshScreen(true);
      data.setIsRedirecting(true);
      setTimeout(() => {
        navigate("/dashboard");
        data.setIsRedirecting(false);
      }, 8000);
    } catch (error) {
      data.setIsLoading(false);
      data.setRefreshScreen(true);
      console.error(error);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="relative flex justify-center text-base mt-[6rem] ">
      <img
        src={Textile}
        className="rounded absolute inset-0 flex flex-col items-center justify-center m-auto mt-2"
        alt="Textile"
      />
      <div className="relative flex-col text-center text-gray-700 p-8">
        <h1 className={`${isSubmitted ? "text-gray-300" : "text-gray-700 font-extrabold"}`}>
          As User 2 has not deposited their share, you are allowed to retrieve your deposit any time by clicking below:
        </h1>
        <button
          className={`border-2 mt-[1rem] border-zinc-300 py-2 px-4 rounded-full font-extrabold ${
            isSubmitted ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-gray-700 hover:bg-gray-300"
          }`}
          onClick={handleSubmit}
        >
          Retrieve Deposit
        </button>

        {refundSuccessful && (
          <>
            <h1 className="mt-[2rem] font-extrabold">
              <p>Congrats! Refund of Deposit is successful. </p>
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Retrieve;
