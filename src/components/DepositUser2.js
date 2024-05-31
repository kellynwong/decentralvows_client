import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DataContext from "../Context/DataContext";
import Textile from "../assets/textile.png";
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

      // setTimeout(() => {
      //   navigate("/dashboard");
      // }, 8000);
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
      <div className="relative flex-col text-left text-gray-700 p-8">
        <h1 className={`${isSubmitted ? "text-gray-300" : "text-gray-700 font-extrabold"}`}>
          Step 4 of 4: Please log in and deposit with wallet <br /> previously registered ({urlUser2Address}):{" "}
        </h1>
        <button
          className={`border-2 mt-[1rem] border-zinc-300 py-2 px-4 rounded-full font-extrabold ${
            isSubmitted ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-gray-700 hover:bg-gray-300"
          }`}
          onClick={handleSubmit}
        >
          Deposit 5 ETH now
        </button>
        {depositSuccessful && (
          <>
            <h1 className="mt-[2rem] font-extrabold">Congrats! Deposit of 5 ETH is successful.</h1>
            <h1 className="mt-[2rem] text-gray-700 font-extrabold">Here are the details of your contract:</h1>
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
              <p>
                Vows Committed On:{" "}
                {data.coupleDetails[6] && new Date(parseInt(data.coupleDetails[6].toString()) * 1000).toLocaleString()}
              </p>
              <p>Status: {data.coupleDetails[5] && data.coupleDetails[5].toUpperCase()}</p>
            </div>
            <h1 className="mt-[2rem] text-gray-700 font-extrabold">
              You both have successfully committed your marriage to code.{" "}
              <p>Here's to forever and ever and may you have an everlasting marriage!</p>
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default DepositUser2;
