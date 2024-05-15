import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import DataContext from "../Context/DataContext";
import { RxHamburgerMenu } from "react-icons/rx";

const NavBar = () => {
  const data = useContext(DataContext);
  return (
    <div className="font-montserrat font-bold sticky top-0 z-30 bg-white mt-8 ml-[8rem] mr-[8rem]">
      <nav className="h-full">
        <ul className="md:flex h-full list-none p-0 m-0 items-center justify-between mr-8">
          <li>
            <NavLink
              to="/homepage"
              className={({ isActive }) => (isActive ? "underline underline-offset-8 font-bold" : "")}
            >
              HOMEPAGE
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/deposit"
              className={({ isActive }) => (isActive ? "underline underline-offset-8 font-bold" : "")}
            >
              DEPOSIT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/divorce"
              className={({ isActive }) => (isActive ? "underline underline-offset-8 font-bold" : "")}
            >
              DIVORCE
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dispute"
              className={({ isActive }) => (isActive ? "underline underline-offset-8 font-bold" : "")}
            >
              DISPUTE
            </NavLink>
          </li>
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
