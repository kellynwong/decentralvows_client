import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ethers } from "ethers";
import { contractAddresses, marriage_abi, jury_abi } from "./constants/index.js";
import DataContext from "./Context/DataContext";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import DepositUser1 from "./components/DepositUser1";
import DepositUser2 from "./components/DepositUser2";
import ReportDivorce from "./components/ReportDivorce";
import AcceptDisputeDivorce from "./components/AcceptDisputeDivorce";
import Jury from "./components/Jury";
import Retrieve from "./components/Retrieve";
import Spinner from "./components/Spinner";
import RedirectingSpinner from "./components/RedirectingSpinner.js";
import { useNavigate } from "react-router-dom";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [refreshScreen, setRefreshScreen] = useState(false);
  // Contracts
  const [jury, setJury] = useState(null);
  const [marriage, setMarriage] = useState(null);
  const [coupleDetails, setCoupleDetails] = useState({});
  const [disputeDetails, setDisputeDetails] = useState({});
  const [juryResults, setJuryResults] = useState(null);
  const [juryResultsError, setJuryResultsError] = useState(null);
  const navigate = useNavigate();

  const [inputtedUser2Address, setInputtedUser2Address] = useState("");

  const loadBlockchainData = async () => {
    console.log("Refresh Screen: ", refreshScreen);
    // Connect to blockchain
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);
    const signer = await provider.getSigner();
    setSigner(signer);
    const network = await provider.getNetwork();

    // Get JS version of jury contract
    const jury = new ethers.Contract(contractAddresses[network.chainId].jury.address, jury_abi, provider);
    setJury(jury);

    // Get JS version of marriage contract
    const marriage = new ethers.Contract(contractAddresses[network.chainId].marriage.address, marriage_abi, provider);
    setMarriage(marriage);

    // Get account 0 and display
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);

    // Fetch details of user if they have registered/deposited
    let id = await marriage?.getId(account);
    let coupleDetails = await marriage?.getCoupleDetails(id);
    setCoupleDetails(coupleDetails);
    setRefreshScreen(false);

    // Fetch details of disputed divorces
    let disputeDetails = await jury?.coupleIdToDetails(id);
    setDisputeDetails(disputeDetails);

    if (disputeDetails[5].toString == "false") {
      // Fetch results of jury, if quorum reached
      try {
        let juryResults = await jury.getResults(id);
        setJuryResults(juryResults);
        setJuryResultsError(null);
      } catch (error) {
        console.error("Error fetching jury results:", error);
        setJuryResultsError("Voting is still ongoing or another error occurred.");
      }
    }
  };

  // Call loadBlockchainData function on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadBlockchainData();
      } catch (error) {
        console.error("An error has occurred: ", error);
      } finally {
      }
    };
    fetchData();
  }, [account, refreshScreen]);

  // Update UI if user changes metamask account
  window.ethereum.on("accountsChanged", async () => {
    // Refetch accounts
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    navigate("/");
    setAccount(accounts[0]);
  });

  // For unconnected metamask users
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
  };

  return (
    <div className="font-pixel text-sm ">
      <DataContext.Provider
        value={{
          account,
          setAccount,
          connectHandler,
          jury,
          marriage,
          provider,
          coupleDetails,
          setRefreshScreen,
          isLoading,
          setIsLoading,
          disputeDetails,
          setDisputeDetails,
          juryResults,
          setJuryResults,
          juryResultsError,
          setJuryResultsError,
          inputtedUser2Address,
          setInputtedUser2Address,
          isRedirecting,
          setIsRedirecting,
        }}
      >
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/homepage" />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/depositUser1" element={<DepositUser1 />} />
            <Route path="/depositUser2/:urlId/:urlUser2Address" element={<DepositUser2 />} />
            <Route path="/retrieve" element={<Retrieve />} />
            <Route path="/reportDivorce" element={<ReportDivorce />} />
            <Route path="/acceptDisputeDivorce" element={<AcceptDisputeDivorce />} />{" "}
            <Route path="/jury" element={<Jury />} />
          </Routes>
        </div>
      </DataContext.Provider>{" "}
      {isLoading && <Spinner />}
      {isRedirecting && <RedirectingSpinner />}
    </div>
  );
}

export default App;
