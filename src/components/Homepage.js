import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
const ethers = require("ethers");

const Homepage = () => {
  const data = useContext(DataContext);

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
              <td>Marriage Start Time</td>
              <td>
                {" "}
                {data.coupleDetails[6] && new Date(parseInt(data.coupleDetails[6].toString()) * 1000).toLocaleString()}
              </td>
            </tr>
          </table>
        </div>
      ) : (
        <div className="flex-col ml-[8rem] mt-[8rem]">
          <h1 className="text-red-400 font-extrabold">How It Works</h1>
          <p>a) Each party submits a vow to stay married by depositing 5 eth each</p>
          <p>b) Total of 10 eth will be locked up in the smart contract</p>
          <p>
            c) When a couple is divorced, the first to report with a notarised divorce document will be refunded 2 eth
            (subject to process below)
          </p>
          <p>
            d) The other party will have 1 week to accept
            <ul>
              <li>- if accepted, 1 eth refunded to other party and 2 eth refunded to reporter</li>
              <li>- if do not accept / inaction, review of dispute by jury process will be triggered</li>
              <li> - jury of 5 members will review document and vote for / against the divorce</li>
              <li>- tallying of votes will be triggered upon reaching > 50% quorum</li>
              <li>- if votes for > against, divorce is confirmed, reporter gets 2 eth, pot increase by 7 eth</li>
              <li> - if votes against > for, other party gets 1 eth, reporter gets nothing, pot increase by 9 eth</li>
            </ul>
          </p>
        </div>
      )}
    </div>
  );
};

export default Homepage;
