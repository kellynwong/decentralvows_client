import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
import Textile from "../assets/textile.png";
const ethers = require("ethers");

const DepositUser1 = () => {
  const data = useContext(DataContext);
  const [urlForUser2, setUrlForUser2] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [depositSuccessful, setDepositSuccessful] = useState(false);

  const handleChange = async (e) => {
    data.setInputtedUser2Address(e.target.value);
  };

  // Submit deposit by user1
  const handleSubmit = async (e) => {
    setIsSubmitted(true);
    data.setIsLoading(true);
    e.preventDefault();
    try {
      const signer = await data.provider.getSigner();
      let transaction = await data?.marriage
        .connect(signer)
        .addUser1(data.inputtedUser2Address, { value: ethers.parseEther("5") });
      const receipt = await transaction.wait();
      console.log("Transaction Receipt: ", receipt);
      setDepositSuccessful(true);
      data.setIsLoading(false);
    } catch (error) {
      data.setIsLoading(false);
      data.setRefreshScreen(true);
      console.error(error);
      alert("Transaction failed!");
    }
  };

  const handleEvent = (
    id,
    user1Address,
    user1DepositAmount,
    user2Address,
    user2DepositAmount,
    status,
    marriageStartTime,
    divorceReportTime,
    ipfsHash,
    divorceReporterAddress,
    divorceDisputerAddress
  ) => {
    console.log("handleEvent is called for DepositUser1");
    const urlForUser2 = `${window.location.origin}/depositUser2/${id}/${user2Address}`;
    setUrlForUser2(urlForUser2);
    console.log("URL for User 2 is set...");
    data.setIsLoading(false);
    data.setRefreshScreen(true);
  };

  useEffect(() => {
    if (data.marriage) {
      console.log("Setting up event listener for addUser1...");
      data.marriage.on("UpdateCoupleDetails", handleEvent);
      return () => {
        console.log("Removing event listener for addUser1...");
        data.marriage.off("UpdateCoupleDetails", handleEvent);
      };
    }
  }, [data.marriage]);

  return (
    <div className="relative flex justify-center mt-[6rem] text-base">
      <img
        src={Textile}
        className="rounded absolute inset-0 flex flex-col items-center justify-center m-auto mt-2"
        alt="Textile"
      />
      <div className="relative flex-col text-left text-gray-700">
        <h1 className={`${isSubmitted ? "text-gray-300" : "text-gray-700 font-extrabold"}`}>
          Step 1 of 4: User 1 to register User 2's wallet address here:
        </h1>
        <input
          className={`border-2 mt-[1rem] w-[28rem] border-zinc-300 py-2 px-4 rounded-full font-extrabold ${
            isSubmitted ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-gray-700"
          }`}
          placeholder="Enter User 2's address"
          onChange={handleChange}
          name="User2"
          value={data.inputtedUser2Address}
          type="text"
        ></input>
        <h1 className={`mt-[2rem] ${isSubmitted ? "text-gray-300" : "text-gray-700 font-extrabold"}`}>
          Step 2 of 4: User 1 to click below to deposit 5 eth:
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
            <h1 className="mt-[2rem] text-gray-700 font-extrabold">
              Step 3 of 4: Now share the following url with User 2 for them to make their deposit:
            </h1>
            <p className="mt-[1rem] py-1 px-3 p-1">
              {" "}
              <a href={urlForUser2} className="text-gray-700 underline">
                {urlForUser2}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DepositUser1;
