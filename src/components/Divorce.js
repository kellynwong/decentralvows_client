import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
import axios from "axios";
const ethers = require("ethers");

const Divorce = () => {
  const data = useContext(DataContext);
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [divorceReporterAddress, setDivorceReporterAddress] = useState(null);
  const [status, setStatus] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setIsSubmitted(true);
    data.setIsLoading(true);
    e.preventDefault();
    if (!file) {
      setError("Please upload a notarized divorce paper.");
      return;
    }
    setError(null);
    try {
      // Pin file to Pinata
      const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
      let formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "text/plain",
          Authorization: "Bearer " + process.env.REACT_APP_PINATA_JWT,
        },
      });
      const ipfsHash = response.data.IpfsHash; // standard way "response.data" to access returned data from Axios response
      console.log(`IMAGE PINNED TO IPFS SUCCESSFULLY AT ${ipfsHash}`);
      setIpfsHash(ipfsHash);
      setImageUrl(process.env.REACT_APP_PINATA_GATEWAY_URL + ipfsHash);

      // Call function at smart contract
      const signer = await data.provider.getSigner();
      // let transaction = await data?.marriage.connect(signer).addUser1("0x140e3c94ad3e8b4dd9419c05d8368a8e5ef27786", { value: ethers.parseEther("5") });
      data.marriage.on("UpdateCoupleDetails", handleEvent);

      let transaction = await data?.marriage.connect(signer).submitDivorce(ipfsHash);
      const receipt = await transaction.wait();
      console.log("SUBMISSION OF DIVORCE TO BLOCKCHAIN SUCCESSFUL");
    } catch (error) {
      setError("Error uploading document or submitting divorce.");
      data.setIsLoading(false);
      console.error(error);
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
    disputeStartTime,
    ipfsHash,
    divorceReporterAddress,
    divorceDisputerAddress
  ) => {
    console.log("handleEvent is called for Divorce");
    console.log({
      id,
      user1Address,
      user1DepositAmount,
      user2Address,
      user2DepositAmount,
      status,
      marriageStartTime,
      disputeStartTime,
      ipfsHash,
      divorceReporterAddress,
      divorceDisputerAddress,
    });
    setDivorceReporterAddress(divorceReporterAddress);
    console.log("divorceReporterAddress is set");
    setStatus(status);
    console.log("status is set");
    data.setIsLoading(false);
    console.log("isLoading is set");
    data.setRefreshScreen(true);
    console.log("refreshScreen is set");
  };

  useEffect(() => {
    console.log("useeffect: " + data.marriage);
    if (data.marriage) {
      console.log("Setting up event listener for divorce...");
      data.marriage.on("UpdateCoupleDetails", handleEvent);

      return () => {
        // console.log("Removing event listener for divorce...");
        // data.marriage.off("UpdateCoupleDetails", handleEvent);
      };
    }
  }, [data.marriage]);

  // useEffect(() => {
  //   if (data.marriage) {
  //     console.log("Setting up event listener for divorce...");
  //     const filter = data.marriage.filters.UpdateCoupleDetails();
  //     data.marriage.on(filter, handleEvent);

  //     return () => {
  //       console.log("Removing event listener for divorce...");
  //       data.marriage.off(filter, handleEvent);
  //     };
  //   }
  // }, [data.marriage]);

  return (
    <div className="flex-col ml-[8rem] mt-[4rem] ">
      <h1 className={`${isSubmitted ? "text-gray-500" : "text-red-400 font-extrabold"}`}>
        Step 1 of 2: To submit a divorce, please upload a notarized divorce paper:
      </h1>
      <input type="file" onChange={handleFileChange} />

      <button
        className={`mt-4 rounded-xl py-1 px-3 transition-colors border ${
          isSubmitted
            ? "text-gray-500 bg-gray-100 cursor-not-allowed"
            : "text-red-400 hover:bg-red-100 hover:text-black"
        }`}
        onClick={handleSubmit}
      >
        Upload
      </button>

      {ipfsHash && !error && (
        <>
          <p>Document uploaded successfully.</p>{" "}
        </>
      )}
      {error && (
        <p style={{ color: "red" }} className="mt-6">
          {error}
        </p>
      )}
      {ipfsHash && !error && (
        <>
          <img src={imageUrl} alt="Divorce Document" className="mt-[1rem] mb-[3rem] w-72 h-72" />
          <h1 className="text-red-400 font-extrabold">Step 2 of 2: Please submit divorce onto the blockchain.</h1>
        </>
      )}
      {divorceReporterAddress && (
        <h1>
          Divorce submitted successfully!{" "}
          <ol>
            <li>Reporter of Divorce registered as: {divorceReporterAddress}</li>
            <li>Status changed to: {status}</li>
          </ol>
        </h1>
      )}
    </div>
  );
};

export default Divorce;
