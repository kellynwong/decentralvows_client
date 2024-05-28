import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
import axios from "axios";

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
      console.log(process.env.REACT_APP_PINATA_API_KEY);
      console.log(process.env.REACT_APP_PINATA_SECRET_API_KEY);

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
      let transaction = await data?.marriage.connect(signer).submitDivorce(ipfsHash);
      const receipt = await transaction.wait();
    } catch (error) {
      setError("Error uploading document or submitting divorce.");
      data.setIsLoading(false);
      console.error(error);
    }
  };

  // Set up event listener for submitDivorce and collate data
  const handleDivorceSubmitted = async (divorceReporterAddress, status) => {
    setDivorceReporterAddress(divorceReporterAddress);
    setStatus(status);
    data.setIsLoading(false);
    data.setRefreshScreen(true);
  };

  useEffect(() => {
    if (data.marriage) {
      data.marriage && data.marriage.on("DivorceSubmitted", handleDivorceSubmitted);
      // Clean up event listener on unmount or when data.marriage changes
      return () => {
        data.marriage.off("DivorceSubmitted", handleDivorceSubmitted);
      };
    }
  }, [data.marriage]);

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
      {error && <p style={{ color: "red" }}>{error}</p>}
      {ipfsHash && (
        <>
          <p>Document uploaded successfully.</p>{" "}
        </>
      )}
      {imageUrl && (
        <>
          <img src={imageUrl} alt="Divorce Document" className="mt-[1rem] mb-[3rem] w-72 h-72" />
          <h1 className="text-red-400 font-extrabold">
            Step 2 of 2: Please now wait for submission of divorce to complete...
          </h1>
        </>
      )}
      {divorceReporterAddress && (
        <h1>
          Divorce Submitted Successfully.{" "}
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
