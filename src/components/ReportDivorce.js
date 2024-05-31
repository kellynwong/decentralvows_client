import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
import Textile from "../assets/textile.png";
import axios from "axios";

const ReportDivorce = () => {
  const data = useContext(DataContext);
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [divorceReporterAddress, setDivorceReporterAddress] = useState(null);
  const [status, setStatus] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    setIsUploaded(true);
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
      data.setIsLoading(false);
    } catch (error) {
      setError("Error uploading document.");
      data.setIsLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    setIsSubmitted(true);
    data.setIsLoading(true);
    e.preventDefault();
    try {
      // Call function at smart contract
      const signer = await data.provider.getSigner();
      let transaction = await data?.marriage.connect(signer).submitDivorce(ipfsHash);
      await transaction.wait();
      console.log("SUBMISSION OF DIVORCE TO BLOCKCHAIN SUCCESSFUL");
      data.setRefreshScreen(true);
      data.setIsLoading(false);
      // setTimeout(() => {
      //   navigate("/dashboard");
      // }, 8000);
    } catch (error) {
      data.setIsLoading(false);
      data.setRefreshScreen(true);
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
    divorceReportTime,
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
      divorceReportTime,
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

    console.log("refreshScreen is set");
  };

  useEffect(() => {
    console.log("useeffect: " + data.marriage);
    if (data.marriage) {
      console.log("Setting up event listener for divorce...");
      data.marriage.on("UpdateCoupleDetails", handleEvent);
      return () => {};
    }
  }, [data.marriage]);

  return (
    <div className="relative flex justify-center items-center text-base mt-[4rem]">
      <img
        src={Textile}
        className="rounded absolute inset-0 flex flex-col items-center justify-center m-auto mt-2"
        alt="Textile"
      />
      <div className="relative flex-col text-left text-gray-700 p-8">
        <h1 className={`${isUploaded ? "text-gray-300" : "text-gray-700 font-extrabold"}`}>
          Step 1 of 2: To report a divorce, please upload a notarized divorce paper:
        </h1>
        <input type="file" onChange={handleFileChange} className="mt-4" />

        <button
          className={`border-2 mt-[1rem] border-zinc-300 py-2 px-4 rounded-full font-extrabold ${
            isUploaded ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-gray-700 hover:bg-gray-300"
          }`}
          onClick={handleUpload}
        >
          Upload
        </button>

        {ipfsHash && !error && (
          <>
            <h1 className={`${isUploaded ? "text-gray-300" : "text-gray-700 font-extrabold"}`}>
              Document has been uploaded to IPFS successfully. Here is a preview:
            </h1>
          </>
        )}
        {error && (
          <p style={{ color: "red" }} className="mt-6">
            {error}
          </p>
        )}
        {ipfsHash && !error && (
          <>
            <img
              src={imageUrl}
              alt="Divorce Document"
              className={`mt-[1rem] mb-[3rem] w-72 h-72 ${isUploaded ? "opacity-25" : "opacity-70"}`}
            />
            <h1 className={`${isSubmitted ? "text-gray-300" : "text-gray-700 font-extrabold"}`}>
              Step 2 of 2: Report divorce onto the blockchain:
            </h1>
            <button
              className={`border-2 mt-[1rem] border-zinc-300 py-2 px-4 rounded-full font-extrabold ${
                isSubmitted ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-gray-700 hover:bg-gray-300"
              }`}
              onClick={handleSubmit}
            >
              Report
            </button>
          </>
        )}
        {divorceReporterAddress && (
          <h1 className="mt-[2rem] font-extrabold">
            Divorce submitted successfully!{" "}
            <ol>
              <li>Reporter of Divorce registered as: {divorceReporterAddress}</li>
              <li>Status changed to: {status}</li>
            </ol>
          </h1>
        )}
      </div>
    </div>
  );
};

export default ReportDivorce;
