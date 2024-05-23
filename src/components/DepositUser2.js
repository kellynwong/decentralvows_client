import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../Context/DataContext";
const ethers = require("ethers");

const DepositUser2 = () => {
  const { urlId, urlUser2Address } = useParams();
  const data = useContext(DataContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [id, setId] = useState(null);
  const [user1Address, setUser1Address] = useState("");
  const [user1DepositAmount, setUser1DepositAmount] = useState(null);
  const [user2Address, setUser2Address] = useState("");
  const [user2DepositAmount, setUser2DepositAmount] = useState(null);
  const [status, setStatus] = useState("");
  const [marriageStartTime, setMarriageStartTime] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signer = await data.provider.getSigner();
      let transaction = await data?.marriage.connect(signer).addUser2(urlId, { value: ethers.parseEther("5") });
      const receipt = await transaction.wait();
      console.log("Transaction Receipt: ", receipt);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  };

  // Set up event listener for addUser2 and collate data once marriage is confirmed
  const handleAddUser2Event = (
    id,
    user1Address,
    user1DepositAmount,
    user2Address,
    user2DepositAmount,
    status,
    marriageStartTime
  ) => {
    setId(id);
    setUser1Address(user1Address);
    setUser1DepositAmount(user1DepositAmount);
    setUser2Address(user2Address);
    setUser2DepositAmount(user2DepositAmount);
    setStatus(status);
    setMarriageStartTime(marriageStartTime.toNumber());
  };

  useEffect(() => {
    if (data.marriage) {
      console.log("Setting up event listener for User2DepositReceived...");
      data.marriage && data.marriage.on("User2DepositReceived", handleAddUser2Event);
      // Clean up event listener on unmount or when marriage changes
      return () => {
        data.marriage.off("User2DepositReceived", handleAddUser2Event);
      };
    }
  }, [data.marriage]);

  return (
    <div className="flex h-screen justify-center items-top mt-[8rem]">
      <div>
        {" "}
        <h1 className={`${isSubmitted ? "text-gray-500" : "text-black"}`}>
          Step 4 of 4: Please log in with wallet previously registered ({urlUser2Address}) for depositing:{" "}
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
        {user2Address && (
          <>
            <h1 className="mt-[2rem] font-extrabold">
              Congrats! Deposit from User 2 {user2Address} amounting to{" "}
              {ethers.formatUnits(user2DepositAmount, 18).toString()} eth is successful.
            </h1>
            <h1 className="mt-[2rem] font-extrabold text-red-400">
              Here are the details of your contract:
              <div className="flex-col font-normal">
                <p>Couple ID: {id.toString()}</p>
                <p>User 1 Address: {user1Address}</p>
                <p>User 1 Deposit Amount: {user1DepositAmount && ethers.formatEther(user1DepositAmount)} ETH</p>
                <p>User 2 Address: {user2Address}</p>
                <p>User 2 Deposit Amount: {user2DepositAmount && ethers.formatEther(user2DepositAmount)} ETH</p>
                <p>Status: {status.toUpperCase()}</p>{" "}
                {/* Use toNumber() method on the BigNumber to convert it to a JavaScript number */}
                <p>Marriage Start Time: {new Date(marriageStartTime * 1000).toLocaleString()}</p>
              </div>
              <h1 className="mt-[2rem] text-red-400">
                You both have successfully commit your marriage to code.{" "}
                <h1>Here's to forever and ever and may you have an everlasting marriage!</h1>
              </h1>
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default DepositUser2;
