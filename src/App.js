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
  return (
    <div className="font-pixel text-sm ">
      <DataContext.Provider value={{}}>
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
