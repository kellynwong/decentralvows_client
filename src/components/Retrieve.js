import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";

const Retrieve = () => {
  const data = useContext(DataContext);
  const [userAddressRefunded, setUserAddressRefunded] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  };

  // Set up event listener and collate data
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
    console.log("handleEvent is called for Retrieve");
    setUserAddressRefunded(user1Address);
    setStatus(status);
    data.setIsLoading(false);
    data.setRefreshScreen(true);
  };

  useEffect(() => {
    if (data.marriage) {
      data.marriage.on("UpdateCoupleDetails", handleEvent);
      return () => {
        data.marriage.off("UpdateCoupleDetails", handleEvent);
      };
    }
  }, [data.marriage]);

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

        {userAddressRefunded && (
          <>
            <h1 className="mt-[2rem] font-extrabold">
              <p>Retrieval of Deposit from User 1 {userAddressRefunded} is successful. </p>
              <p>Status of contract has been changed to {status}.</p>
            </h1>
          </>
        )}
      </div>{" "}
    </div>
  );
};

export default Retrieve;
