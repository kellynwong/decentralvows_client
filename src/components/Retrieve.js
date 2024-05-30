import React, { useContext, useState } from "react";
import DataContext from "../Context/DataContext";
import { useNavigate } from "react-router-dom";

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
      console.error(error);
      alert("Transaction failed!");
    }
  };

  return (
    <div>
      <div className="flex-col ml-[8rem] mt-[4rem] ">
        <h1 className={`${isSubmitted ? "text-gray-500" : "text-red-400 font-extrabold"}`}>
          As User 2 has not deposited their share, you are allowed to retrieve your deposit any time by clicking below:
        </h1>
        <button
          className={`mt-4 rounded p-1 m-2 py-1 px-3 transition-colors border ${
            isSubmitted
              ? "text-gray-500 bg-gray-100 cursor-not-allowed"
              : "text-red-400 hover:bg-red-100 hover:text-black"
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
      </div>{" "}
    </div>
  );
};

export default Retrieve;
