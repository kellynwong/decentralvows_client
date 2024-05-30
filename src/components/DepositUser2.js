import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DataContext from "../Context/DataContext";
const ethers = require("ethers");

const DepositUser2 = () => {
  const { urlId, urlUser2Address } = useParams();
  const data = useContext(DataContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [depositSuccessful, setDepositSuccessful] = useState(false);
  const navigate = useNavigate();

  // Submit deposit by user2
  const handleSubmit = async (e) => {
    setIsSubmitted(true);
    data.setIsLoading(true);
    e.preventDefault();
    try {
      const signer = await data.provider.getSigner();
      let transaction = await data?.marriage.connect(signer).addUser2(urlId, { value: ethers.parseEther("5") });
      const receipt = await transaction.wait();
      console.log("Transaction Receipt: ", receipt);
      setDepositSuccessful(true);
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
    <div className="flex h-screen justify-center items-top mt-[4rem] ml-[4rem] ">
      <div>
        {" "}
        <h1 className={`${isSubmitted ? "text-gray-500" : "text-red-400 font-extrabold"}`}>
          Step 4 of 4: Please log in and deposit with wallet previously registered ({urlUser2Address}):{" "}
        </h1>
        <button
          className={`mt-4 rounded-xl py-1 px-3 transition-colors border ${
            isSubmitted
              ? "text-gray-500 bg-gray-100 cursor-not-allowed"
              : "text-red-400 hover:bg-red-100 hover:text-black"
          }`}
          onClick={handleSubmit}
        >
          Deposit 5 ETH now
        </button>
        {depositSuccessful && (
          <>
            <h1 className="mt-[2rem] font-extrabold">Congrats! Deposit of 5 ETH is successful.</h1>
            <h1 className="mt-[2rem] font-extrabold text-red-400">Here are the details of your contract:</h1>
            <div className="flex-col font-normal">
              <p>Couple ID: {data.coupleDetails[0]?.toString()}</p>
              <p>User 1 Address: {data.coupleDetails[1]}</p>
              <p>
                User 1 Deposit Amount:{" "}
                {data.coupleDetails[2] && ethers.formatEther(data.coupleDetails[2])
                  ? ethers.formatEther(data.coupleDetails[2])
                  : 0}{" "}
                ETH
              </p>
              <p>User 2 Address: {data.coupleDetails[3]}</p>
              <p>
                User 2 Deposit Amount:{" "}
                {data.coupleDetails[4] && ethers.formatEther(data.coupleDetails[4])
                  ? ethers.formatEther(data.coupleDetails[4])
                  : 0}{" "}
                ETH
              </p>
              <p>Status: {data.coupleDetails[5] && data.coupleDetails[5].toUpperCase()}</p>
              <p>
                Vows Committed On:{" "}
                {data.coupleDetails[6] && new Date(parseInt(data.coupleDetails[6].toString()) * 1000).toLocaleString()}
              </p>
            </div>
            <h1 className="mt-[2rem] font-extrabold text-red-400">
              You both have successfully commit your marriage to code.{" "}
              <p>Here's to forever and ever and may you have an everlasting marriage!</p>
            </h1>
          </>
        )}
      </div>{" "}
    </div>
  );
};

export default DepositUser2;
