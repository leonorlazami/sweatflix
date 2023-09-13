import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const Navbar = ({
  query,
  showSearch,
  handleQuery,
  handleShowSearch,
  selectedShow,
  setShowSearch,
}) => {
  const gradientColor =
    "bg-gradient-to-b from-red-500 to-red-800  bg-clip-text text-transparent";

  return (
    <nav className="w-full h-full">
      <div className="flex  bg-gradient-to-r from-gray-950 to-slate-800 md:justify-start py-8">
        <div className="flex items-center">
          <img
            src="start.svg"
            alt=""
            className="w-8 md:w-12 md:absolute md:left-3 md:top-10"
          />
          <Link to="/">
            <h1
              className={`${gradientColor} text-2xl md:text-7xl tracking-wider md:tracking-widest md:ml-16`}
            >
              Sweatflix
            </h1>
          </Link>
        </div>

        <div className="flex w-full justify-end items-center gap-3 md:hidden mr-4">
          {showSearch ? (
            <div className="absolute top-16 ">
              <input
                type="text"
                placeholder="Search..."
                className="text-center h-4/5 px-0 border-none outline-none py-1 overflow-hidden w-18"
                onChange={handleQuery}
              />
            </div>
          ) : (
            <HiOutlineSearch
              size={25}
              color="white"
              onClick={handleShowSearch}
            />
          )}

          <Link to="/profile">
            <CgProfile
              size={25}
              color="white"
              onClick={() => setShowSearch(false)}
            />
          </Link>
          <Link to="/">
            <AiOutlineHome
              size={25}
              color="white"
              onClick={() => setShowSearch(false)}
            />
          </Link>
        </div>
        <div className="md:flex md:w-full md:gap-10 md:justify-end md:items-center md:text-2xl md:mr-10 hidden">
          <Link to="/">
            <button className="text-white">Home</button>
          </Link>
          <Link to="/profile">
            <button className="text-white">Favorites</button>
          </Link>
          <div>
            <form action="#" className="flex" name="search">
              {selectedShow ? (
                ""
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="text-center h-1/2 px-0 border-none outline-none py-1 overflow-hidden"
                    onChange={handleQuery}
                  />
                  <button className="ml-1 absolute">
                    <HiOutlineSearch size={30} color="black" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
