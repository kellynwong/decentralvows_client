import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DataContext from "../Context/DataContext";
import Logo from "../assets/decentralvows.png";

const NavBar = () => {
  const data = useContext(DataContext);
  const [isJuryMember, setIsJuryMember] = useState(false);

  const checkJury = async () => {
    if (data.jury && data.account) {
      let formattedAccount = data.account.toLowerCase();
      if ((await data.jury.whitelist(formattedAccount)) === true) {
        setIsJuryMember(true);
      }
    }
  };

  useEffect(() => {
    setIsJuryMember(false);
    checkJury();
  }, [data.account]);

  return (
    <div className="font-montserrat font-bold sticky top-0 z-30 bg-white ml-[8rem] mr-[8rem] text-base">
      <header className="flex justify-center items-center mb-4">
        <img src={Logo} alt="Logo" className="h-[16rem] mt-[-4rem]" />
      </header>
      <nav className="h-full">
        <ul className="md:flex h-full list-none p-0 m-10 items-center justify-between mr-8 mt-[-5rem]">
          <li>
            <NavLink
              to="/homepage"
              className={({ isActive }) => (isActive ? "underline underline-offset-8 font-bold" : "")}
            >
              HOMEPAGE
            </NavLink>
          </li>
          {data.coupleDetails[5] != "" && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "underline underline-offset-8 font-bold" : "")}
              >
                DASHBOARD
              </NavLink>
            </li>
          )}
          {data.coupleDetails[5] === "pendingDepositFromUser2" ||
            (data.coupleDetails[5] === "" && (
              <li>
                <NavLink
                  to="/depositUser1"
                  className={({ isActive }) => (isActive ? "underline underline-offset-8 font-bold" : "")}
                >
                  DEPOSIT
                </NavLink>
              </li>
            ))}
          {data.coupleDetails && data.coupleDetails[5] === "pendingDepositFromUser2" && (
            <li>
              <NavLink
                to="/retrieve"
                className={({ isActive }) => (isActive ? "underline underline-offset-8 font-bold" : "")}
              >
                RETRIEVE
              </NavLink>
            </li>
          )}
          {data.coupleDetails && data.coupleDetails[5] === "married" && (
            <li>
              <NavLink
                to="/reportDivorce"
                className={({ isActive }) => (isActive ? "underline underline-offset-8 font-bold" : "")}
              >
                REPORT DIVORCE
              </NavLink>
            </li>
          )}
          {data.coupleDetails &&
            data.coupleDetails[5] === "pendingDivorce" &&
            data.account.toLowerCase() != data.coupleDetails[9].toLowerCase() && (
              <li>
                <NavLink
                  to="/acceptDisputeDivorce"
                  className={({ isActive }) => (isActive ? "underline underline-offset-8 font-bold" : "")}
                >
                  ACCEPT/DISPUTE DIVORCE
                </NavLink>
              </li>
            )}
          {isJuryMember && (
            <li>
              <NavLink
                to="/jury"
                className={({ isActive }) => (isActive ? "underline underline-offset-8 font-bold" : "")}
              >
                JURY
              </NavLink>
            </li>
          )}
          <li>
            {data.account ? (
              <button type="button">{data.account.slice(0, 6) + "..." + data.account.slice(38, 42)}</button>
            ) : (
              <button type="button" onClick={data.connectHandler}>
                CONNECT
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
