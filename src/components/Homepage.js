import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
const ethers = require("ethers");

const Homepage = () => {
  const data = useContext(DataContext);
  const [coupleDetails, setCoupleDetails] = useState({});

  // Lookup couple id based on connected wallet address
  // Lookup couple details based on couple id
  // Save details to states
  // Display states on website

  const fetchDetails = async () => {
    let id = await data.marriage?.getId(data.account);
    console.log(id);
    let coupleDetails = await data.marriage?.getCoupleDetails(id);
    setCoupleDetails(coupleDetails);
  };

  useEffect(() => {
    if (data.account) {
      fetchDetails();
    }
  }, [data.account]);

  return (
    <div>
      <div className="flex-col ml-[8rem] mt-[8rem]">
        <h1 className="mt-[2rem] font-extrabold text-red-400">Dashboard</h1>
        <h1>Marriage Details</h1>
        <p>ID: {coupleDetails[0]?.toString()}</p>
        <p>User 1 Address: {coupleDetails[1]}</p>
        <p>User 1 Deposit Amount: {coupleDetails[2] && ethers.formatEther(coupleDetails[2])} ETH</p>
        <p>User 2 Address: {coupleDetails[3]}</p>
        <p>User 2 Deposit Amount: {coupleDetails[4] && ethers.formatEther(coupleDetails[4])} ETH</p>
        <p>Status: {coupleDetails[5] && coupleDetails[5].toUpperCase()}</p>
        {/* <p>
            Marriage Start Time: {coupleDetails[6] && new Date(coupleDetails[6].toNumber() * 1000).toLocaleString()}
          </p> */}
        <p>
          Marriage Start Time:{" "}
          {coupleDetails[6] && new Date(parseInt(coupleDetails[6].toString()) * 1000).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Homepage;
