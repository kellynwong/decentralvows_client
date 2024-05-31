import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
import Textile from "../assets/textile.png";
const ethers = require("ethers");

const Dashboard = () => {
  const data = useContext(DataContext);
  const [claimSuccessful, setClaimSuccessful] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  const shouldShowDisputeDetails =
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
      data.setRefreshScreen(true);
    } catch (error) {
      data.setIsLoading(false);
      data.setRefreshScreen(true);
      console.error(error);
      alert("Transaction failed!");
    }
  };

  const checkClaim = async () => {
    if (
      data.coupleDetails[5] === "juryVotesForDivorce, penalized disputer and refunded reporter" ||
      data.coupleDetails[5] === "juryVotesAgainstDivorce, penalized reporter and refunded disputer"
    ) {
      setIsClaimed(true);
    }
  };

  useEffect(() => {
    console.log(data.coupleDetails[5]);
    setIsClaimed(false);
    checkClaim();
  }, [data.account]);

  return (
    <div className="relative flex justify-center text-base mt-[4rem] items-center">
      <img
        src={Textile}
        className="rounded absolute inset-0 flex flex-col items-center justify-center m-auto mt-2"
        alt="Textile"
      />
      <div className="relative max-w-6xl p-8 rounded-lg">
        {data.coupleDetails && data.coupleDetails[5] && (
          <div className="overflow-auto">
            <table className="w-full bg-opacity-0 border-separate border-spacing-x-8 border-spacing-y-2">
              <tbody className="bg-opacity-0">
                <tr className="border-b border-gray-200">
                  <td className="text-gray-700 font-extrabold">DASHBOARD</td>
                  <td></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="text-gray-700">Couple ID</td>
                  <td> {data.coupleDetails[0]?.toString()}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="text-gray-700">User 1 Address</td>
                  <td> {data.coupleDetails[1]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="text-gray-700">User 1 Deposited Amount</td>
                  <td>
                    {data.coupleDetails[2] && ethers.formatEther(data.coupleDetails[2])
                      ? ethers.formatEther(data.coupleDetails[2])
                      : 0}
                    ETH
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="text-gray-700">User 2 Address</td>
                  <td> {data.coupleDetails[3]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="text-gray-700">User 2 Deposited Amount</td>
                  <td>
                    {data.coupleDetails[4] && ethers.formatEther(data.coupleDetails[4])
                      ? ethers.formatEther(data.coupleDetails[4])
                      : 0}
                    ETH
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="text-gray-700">Vows Committed On</td>
                  <td>
                    {data.coupleDetails[6] &&
                      new Date(parseInt(data.coupleDetails[6].toString()) * 1000).toLocaleString()}
                  </td>{" "}
                </tr>
                {data.coupleDetails[5] === "divorced and refunded" && (
                  <tr className="border-b border-gray-200">
                    <td className="text-gray-700">Divorce Reported On</td>
                    <td>
                      {data.coupleDetails[7] &&
                        new Date(parseInt(data.coupleDetails[7].toString()) * 1000).toLocaleString()}
                    </td>
                  </tr>
                )}

                <tr className="border-b border-gray-200">
                  <td className="text-gray-700">Status</td>
                  <td> {data.coupleDetails[5] && data.coupleDetails[5].toUpperCase()}</td>
                </tr>

                {data.coupleDetails[5] === "pendingDivorce" && (
                  <>
                    <tr className="border-b border-gray-200">
                      <td className="text-gray-700">Divorce Reported On</td>
                      <td>
                        {data.coupleDetails[7] &&
                          new Date(parseInt(data.coupleDetails[7].toString()) * 1000).toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="text-gray-700">IPFS Hash</td>
                      <td> {data.coupleDetails[8]}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="text-gray-700">Divorce Reporter Address</td>
                      <td> {data.coupleDetails[9]}</td>
                    </tr>
                  </>
                )}
                {shouldShowDisputeDetails && (
                  <>
                    <tr className="border-b border-gray-200">
                      <td className="text-gray-700">Divorce Reported On</td>
                      <td>
                        {data.coupleDetails[7] &&
                          new Date(parseInt(data.coupleDetails[7].toString()) * 1000).toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="text-gray-700">IPFS Hash</td>
                      <td> {data.coupleDetails[8]}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="text-gray-700">Divorce Reporter Address</td>
                      <td> {data.coupleDetails[9]}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="text-gray-700">Divorce Disputer Address</td>
                      <td> {data.coupleDetails[10]}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="text-gray-700">Number of Votes For Divorce</td>
                      <td> {data.disputeDetails[3]?.toString()}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="text-gray-700">Number of Votes Against Divorce</td>
                      <td> {data.disputeDetails[4]?.toString()}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="text-gray-700">Voting Still Live?</td>
                      <td> {data.disputeDetails[5]?.toString() === "false" ? "Ended" : "Yes"}</td>
                    </tr>
                    {data.disputeDetails[5]?.toString() === "false" ? (
                      <>
                        <tr className="border-b border-gray-200">
                          <td className="text-gray-700">Final Results</td>
                          <td>
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
                            <tr className="border-b border-gray-200">
                              <td className="text-gray-700">Click to Claim Your Refund</td>
                              <td>
                                <button
                                  className={`border-2 mt-[0.5rem] border-zinc-300 py-2 px-4 rounded-full font-extrabold ${
                                    claimSuccessful
                                      ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                                      : "text-gray-700 hover:bg-gray-300"
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
            {claimSuccessful && (
              <h1 className="mt-[2rem] text-gray-700 font-extrabold text-center">Claim is successful.</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
