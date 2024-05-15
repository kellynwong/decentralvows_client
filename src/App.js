import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ethers } from "ethers";
import { contractAddresses, marriage_abi, dispute_abi, jury_abi } from "./constants/index.js";
import DataContext from "./Context/DataContext";

function App() {
  return <div className="App">Hello!</div>;
}

export default App;
