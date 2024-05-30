import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
const ethers = require("ethers");

const Dashboard = () => {
  const data = useContext(DataContext);
  const [claimSuccessful, setClaimSuccessful] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  const shouldShowDisputeDetails =
    data.coupleDetails[5] === "divorced and refunded" ||
    data.coupleDetails[5] === "pendingJuryToResolveDispute" ||
    data.coupleDetails[5] === "juryVotesForDivorce, penalized disputer and refunded reporter" ||
    data.coupleDetails[5] === "juryVotesAgainstDivorce, penalized reporter and refunded disputer";

  const handleClaim = async (coupleId, e) => {
    data.setIsLoading(true);
    e.preventDefault();
    try {
      const signer = await data.provider.getSigner();
      let transaction = await data?.marriage.connect(signer).concludeDispute(coupleId);
      await transaction.wait();
      data.setIsLoading(false);
      setClaimSuccessful(true);
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  };

  const checkClaim = async () => {
    if (
      data.coupleDetails[5] == "juryVotesForDivorce, penalized disputer and refunded reporter" ||
      data.coupleDetails[5] == "juryVotesAgainstDivorce, penalized reporter and refunded disputer"
    ) {
      setIsClaimed(true);
    }
  };

  useEffect(() => {
    setIsClaimed(false);
    checkClaim();
  }, [data.account]);

  return (
    <div>
      {data.coupleDetails && data.coupleDetails[5] && (
        <div className="max-w-6xl">
          <table className="ml-[8rem] mt-[4rem] border-separate border-spacing-x-10 divide-y divide-gray-200">
            <tbody>
              <tr>
                <td className="text-red-400 font-extrabold">DASHBOARD</td>
                <td></td>
              </tr>
              <tr>
                <td>Couple ID</td>
                <td> {data.coupleDetails[0]?.toString()}</td>
              </tr>
              <tr>
                <td>User 1 Address</td>
                <td> {data.coupleDetails[1]}</td>
              </tr>
              <tr>
                <td>User 1 Deposited Amount</td>
                <td>
                  {" "}
                  {data.coupleDetails[2] && ethers.formatEther(data.coupleDetails[2])
                    ? ethers.formatEther(data.coupleDetails[2])
                    : 0}{" "}
                  ETH
                </td>
              </tr>
              <tr>
                <td>User 2 Address</td>
                <td> {data.coupleDetails[3]}</td>
              </tr>
              <tr>
                <td>User 2 Deposited Amount</td>
                <td>
                  {" "}
                  {data.coupleDetails[4] && ethers.formatEther(data.coupleDetails[4])
                    ? ethers.formatEther(data.coupleDetails[4])
                    : 0}{" "}
                  ETH
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td> {data.coupleDetails[5] && data.coupleDetails[5].toUpperCase()}</td>
              </tr>
              <tr>
                <td>Vows Committed On</td>
                <td>
                  {" "}
                  {data.coupleDetails[6] &&
                    new Date(parseInt(data.coupleDetails[6].toString()) * 1000).toLocaleString()}
                </td>
              </tr>
              {data.coupleDetails[5] == "pendingDivorce" && (
                <>
                  <tr>
                    <td>Divorce Reported On</td>
                    <td>
                      {" "}
                      {data.coupleDetails[7] &&
                        new Date(parseInt(data.coupleDetails[7].toString()) * 1000).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>IPFS Hash</td>
                    <td> {data.coupleDetails[8]}</td>
                  </tr>
                  <tr>
                    <td>Divorce Reporter Address</td>
                    <td> {data.coupleDetails[9]}</td>
                  </tr>
                </>
              )}
              {shouldShowDisputeDetails && (
                <>
                  <tr>
                    <td>Divorce Reported On</td>
                    <td>
                      {" "}
                      {data.coupleDetails[7] &&
                        new Date(parseInt(data.coupleDetails[7].toString()) * 1000).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>IPFS Hash</td>
                    <td> {data.coupleDetails[8]}</td>
                  </tr>
                  <tr>
                    <td>Divorce Reporter Address</td>
                    <td> {data.coupleDetails[9]}</td>
                  </tr>
                  <tr>
                    <td>Divorce Disputer Address</td>
                    <td> {data.coupleDetails[10]}</td>
                  </tr>

                  <tr>
                    <td>Number of Votes For Divorce</td>
                    <td> {data.disputeDetails[3]?.toString()}</td>
                  </tr>
                  <tr>
                    <td>Number of Votes Against Divorce</td>
                    <td> {data.disputeDetails[4]?.toString()}</td>
                  </tr>
                  <tr>
                    <td>Voting Still Live?</td>
                    <td> {data.disputeDetails[5]?.toString() == "false" ? "Ended" : "Yes"}</td>
                  </tr>

                  {data.disputeDetails[5]?.toString() == "false" ? (
                    <>
                      {" "}
                      <tr>
                        <td>Final Results</td>
                        <td>
                          {" "}
                          {data.juryResultsError
                            ? data.juryResultsError
                            : data.juryResults !== null
                            ? parseInt(data.juryResults) === 0
                              ? `Jury Has Voted For Divorce, 2 ETH ${
                                  isClaimed ? "Has Been" : "Will Be"
                                } Refunded to Divorce Reporter Address (${data.coupleDetails[9]})`
                              : `Jury Has Voted Against Divorce, 1 ETH ${
                                  isClaimed ? "Has Been" : "Will Be"
                                } Refunded to Divorce Disputer Address (${data.coupleDetails[10]})`
                            : "Quorum not reached, please check back later"}
                        </td>
                      </tr>
                      {isClaimed ? null : (
                        <>
                          <tr>
                            <td>Click to Claim Your Refund</td>
                            <td>
                              {" "}
                              <button
                                className={`rounded mt-2 py-1 px-3 transition-colors border ${
                                  claimSuccessful
                                    ? "text-gray-500 bg-gray-100 cursor-not-allowed"
                                    : "text-red-400 hover:bg-red-100 hover:text-black"
                                }`}
                                onClick={(e) => handleClaim(data.coupleDetails[0]?.toString(), e)}
                              >
                                {claimSuccessful ? "Claimed" : "CLAIM"}
                              </button>
                            </td>
                          </tr>
                        </>
                      )}
                    </>
                  ) : null}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
