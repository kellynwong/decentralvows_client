import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
const ethers = require("ethers");

const Deposit = () => {
  const data = useContext(DataContext);
  const [user2Address, setUser2Address] = useState("");
  const [urlForUser2, setUrlForUser2] = useState("");

  const handleChange = async (e) => {
    setUser2Address(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Testing", user2Address);
    try {
      const signer = await data.provider.getSigner();
      let transaction = await data?.marriage.connect(signer).addUser1(user2Address, { value: ethers.parseEther("5") });
      const receipt = await transaction.wait();
      console.log("Transaction Receipt: ", receipt);
      setUser2Address("");
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  };

  const handleUser1DepositReceived = (coupleCount) => {
    console.log("Function handleUser1DepositReceived Got Called");
    const url = `{window.location.origin}/deposit2/${coupleCount}`;
    console.log("Received ID: ", coupleCount);
    setUrlForUser2(url);
  };

  // Set up event listener on mount
  useEffect(() => {
    if (data.marriage) {
      console.log("Setting up event listener for User1DepositReceived...");
      data.marriage && data.marriage.on("User1DepositReceived", handleUser1DepositReceived);

      // Clean up event listener on unmount or when data.marriage changes
      return () => {
        data.marriage.off("User1DepositReceived", handleUser1DepositReceived);
      };
    }
  }, [data.marriage]);

  return (
    <div className="h-screen flex justify-center items-center m-[-10rem]">
      <div>
        Enter User2's Address:
        <input
          className="block text-black rounded w-96 border p-1 m-2"
          placeholder="Enter User2's address"
          onChange={handleChange}
          name="User2"
          value={user2Address}
          type="text"
        ></input>
        <button
          className=" mt-[1rem] bg-black rounded-xl text-red-400 py-1 px-3 shadow-lg hover:bg-red-600 hover:text-white transition-colors"
          onClick={handleSubmit}
        >
          User1 to Deposit 5 ETH First
        </button>
      </div>

      {urlForUser2 && (
        <div>
          <p>Share this url for User2 to deposit</p>
          <a href={urlForUser2}>{urlForUser2}</a>
        </div>
      )}
    </div>
  );
};

export default Deposit;
