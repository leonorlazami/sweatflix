import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineSearch } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const gradientColor =
    " bg-gradient-to-b from-red-500 to-red-800  bg-clip-text text-transparent";

  return (
    <nav className="w-full h-full  fixed">
      <div className="flex py-6 bg-gradient-to-r from-gray-950 to-slate-800 md:justify-start">
        <img
          src="start.svg"
          alt=""
          className="w-8 md:w-16 md:absolute md:left-3 md:top-8"
        />
        <div className="flex flex-col ml-4 text-center">
          <h1
            className={`${gradientColor} text-3xl md:text-7xl tracking-wider md:tracking-widest md:ml-16`}
          >
            Sweatflix
          </h1>
          <h2 className={`${gradientColor} text-2xl md:text-4xl md:ml-10`}>
            Watch & Burn
          </h2>
        </div>
        <div className="flex w-full justify-end items-center gap-3 md:hidden mt-8 mr-4 ">
          <HiOutlineSearch size={25} color="white" />
          <CgProfile size={25} color="white" />
        </div>
        <div className="md:flex md:w-full md:gap-10 md:justify-center md:items-center md:text-2xl hidden">
          <button className="text-white">Home</button>
          <button className="text-white">Profile</button>
          <form action="#" className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="text-center h-1/2 px-0"
            />
            <button className="ml-2">
              <HiOutlineSearch size={31} color="white" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;