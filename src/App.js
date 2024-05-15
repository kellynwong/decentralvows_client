import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ethers } from "ethers";
import { contractAddresses, marriage_abi, dispute_abi, jury_abi } from "./constants/index.js";
import DataContext from "./Context/DataContext";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Deposit from "./components/Deposit";
import Divorce from "./components/Divorce";
import Dispute from "./components/Dispute";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadBlockchainData = async () => {
    // Connect to blockchain
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  };

  // Call loadBlockchainData function on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await loadBlockchainData();
      } catch (error) {
        console.error("An error has occurred: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update ui if user changes metamask account
  window.ethereum.on("accountsChanged", async () => {
    // Refetch accounts
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
    console.log(account);
  });

  // For unconnected metamask users
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    console.log(account);
  };

  return (
    <div className="font-pixel text-sm ">
      <DataContext.Provider value={{ account, setAccount, connectHandler }}>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/homepage" />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/divorce" element={<Divorce />} />
            <Route path="/dispute" element={<Dispute />} />
          </Routes>
        </div>
      </DataContext.Provider>
    </div>
  );
}

export default App;
