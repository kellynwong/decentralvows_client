import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
const ethers = require("ethers");

const DepositUser1 = () => {
  const data = useContext(DataContext);
  const [inputtedUser2Address, setInputtedUser2Address] = useState("");
  const [urlForUser2, setUrlForUser2] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user1Address, setUser1Address] = useState("");
  const [user1DepositAmount, setUser1DepositAmount] = useState(null);

  const handleChange = async (e) => {
    setInputtedUser2Address(e.target.value);
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
        .addUser1(inputtedUser2Address, { value: ethers.parseEther("5") });
      const receipt = await transaction.wait();
      console.log("Transaction Receipt: ", receipt);
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  };

  // Set up event listener for addUser1 and collate data
  const handleAddUser1Event = (idForUrl, user1Address, user1DepositAmount, user2Address) => {
    setUser1Address(user1Address);
    setUser1DepositAmount(user1DepositAmount);
    const urlForUser2 = `${window.location.origin}/depositUser2/${idForUrl}/${user2Address}`;
    setUrlForUser2(urlForUser2);
    data.setIsLoading(false);
    data.setRefreshScreen(true);
  };

  useEffect(() => {
    if (data.marriage) {
      data.marriage && data.marriage.on("User1DepositReceived", handleAddUser1Event);
      // Clean up event listener on unmount or when data.marriage changes
      return () => {
        data.marriage.off("User1DepositReceived", handleAddUser1Event);
      };
    }
  }, [data.marriage]);

  return (
    <div>
      <div className="flex-col ml-[8rem] mt-[4rem]">
        <h1 className={`${isSubmitted ? "text-gray-500" : "text-red-400 font-extrabold"}`}>
          Step 1 of 4: User 1 to register User 2's wallet address here:
        </h1>
        <input
          className={`mt-4 py-1 px-3 block rounded w-96 border p-1 m-2 ${
            isSubmitted ? "text-gray-500 bg-gray-100 cursor-not-allowed" : "text-black"
          }`}
          placeholder="Enter User2's address"
          onChange={handleChange}
          name="User2"
          value={inputtedUser2Address}
          type="text"
        ></input>
        <h1 className={`mt-[2rem] ${isSubmitted ? "text-gray-500" : "text-red-400 font-extrabold"}`}>
          Step 2 of 4: User 1 to click below to deposit 5 eth:
        </h1>
        <button
          className={`mt-4 rounded p-1 m-2 py-1 px-3 transition-colors border ${
            isSubmitted
              ? "text-gray-500 bg-gray-100 cursor-not-allowed"
              : "text-red-400 hover:bg-red-100 hover:text-black"
          }`}
          onClick={handleSubmit}
        >
          Deposit 5 ETH now
        </button>

        {urlForUser2 && (
          <>
            <h1 className="mt-[2rem] font-extrabold">
              Congrats! Deposit from User 1 {user1Address} amounting to{" "}
              {ethers.formatUnits(user1DepositAmount, 18).toString()} eth is successful.
            </h1>
            <h1 className="mt-[2rem] text-red-400 font-extrabold">
              Step 3 of 4: Now share the following url with User 2 for them to make their deposit:
            </h1>
            <p className="mt-[1rem] py-1 px-3 p-1">
              {" "}
              <a href={urlForUser2} className="text-red-400 underline">
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
