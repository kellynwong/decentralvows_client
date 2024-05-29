import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
import HowItWorks from "./HowItWorks";
const ethers = require("ethers");

const Homepage = () => {
  const data = useContext(DataContext);
  const shouldShowDivorceDetails =
    data.coupleDetails[5] === "pendingDivorce" ||
    data.coupleDetails[5] === "divorced and refunded" ||
    data.coupleDetails[5] === "pendingJuryToResolveDispute" ||
    data.coupleDetails[5] === "juryVotesForDivorce, penalized disputer and refunded reporter" ||
    data.coupleDetails[5] === "juryVotesAgainstDivorce, penalized reporter and refunded disputer";

  return (
    <div>
      {data.coupleDetails && data.coupleDetails[5] ? (
        <div>
          <table className="w-[55rem] ml-[8rem] mt-[4rem] divide-y divide-gray-200">
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
                {data.coupleDetails[6] && new Date(parseInt(data.coupleDetails[6].toString()) * 1000).toLocaleString()}
              </td>
            </tr>
            {shouldShowDivorceDetails && (
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
                  <td>Divorce Disputer Address</td>
                  <td> {data.coupleDetails[10]}</td>
                </tr>{" "}
                <tr>
                  <td>Number of Votes For Divorce</td>
                  <td> {data.disputeDetails[3].toString()}</td>
                </tr>
                <tr>
                  <td>Number of Votes Against Divorce</td>
                  <td> {data.disputeDetails[4].toString()}</td>
                </tr>
                <tr>
                  <td>Voting Still Live?</td>
                  <td> {data.disputeDetails[5].toString() ? "Yes" : "Ended"}</td>
                </tr>
                {data.disputeResults && data.disputeResults[data.coupleDetails[0].toString()] && (
                  <tr>
                    <td>Dispute Results</td>
                    <td>
                      {data?.disputeResults[data.coupleDetails[0].toString()]?.toString() === 0
                        ? "Jury Has Voted For Divorce"
                        : "Jury Has Voted Against Divorce"}
                    </td>
                  </tr>
                )}
              </>
            )}
          </table>
        </div>
      ) : (
        <HowItWorks />
      )}
    </div>
  );
};

export default Homepage;
