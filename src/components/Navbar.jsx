import React from "react";

import { HiOutlineSearch } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ query, showSearch, handleQuery, handleShowSearch }) => {
  const gradientColor =
    "bg-gradient-to-b from-red-500 to-red-800  bg-clip-text text-transparent";

  return (
    <nav className="w-full h-full ">
      <div className="flex  bg-gradient-to-r from-gray-950 to-slate-800 md:justify-start py-8 ">
        <div className="flex items-center">
          <img
            src="start.svg"
            alt=""
            className="w-8 md:w-12 md:absolute md:left-3 md:top-10"
          />

          <h1
            className={`${gradientColor} text-3xl md:text-7xl tracking-wider md:tracking-widest md:ml-16`}
          >
            Sweatflix
          </h1>
        </div>

        <div className="flex w-full justify-end items-center gap-3 md:hidden mr-4 ">
          {showSearch ? (
            <input
              type="text"
              placeholder="Search..."
              className="text-center h-4/5 px-0 border-none outline-none py-1 overflow-hidden w-24"
              onChange={handleQuery}
            />
          ) : (
            <HiOutlineSearch
              size={25}
              color="white"
              onClick={handleShowSearch}
            />
          )}
          <CgProfile size={25} color="white" />
        </div>
        <div className="md:flex md:w-full md:gap-10 md:justify-center md:items-center md:text-2xl hidden">
          <button className="text-white">Profile</button>
          <div>
            <form action="#" className="flex" name="search">
              <input
                type="text"
                placeholder="Search..."
                className="text-center h-1/2 px-0 border-none outline-none py-1 overflow-hidden	"
                onChange={handleQuery}
              />
              <button className="ml-1 absolute m">
                <HiOutlineSearch size={30} color="black" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
