import React from "react";

const Navbar = () => {
  function handleClick() {
    console.log("asdasdasd");
  }

  return (
    <div className="w-full h-full pb-4 fixed">
      <div className="flex items-center justify-between pt-10 bg-gray-950 pb-4">
        <div className="flex items-center">
          <img src="start.svg" alt="" className="w-1/6 md:w-20 md:mb-10 " />
          <div className="flex flex-col ml-4">
            <h1 className="text-3xl md:text-7xl bg-gradient-to-b from-red-500 to-red-800 bg-clip-text text-transparent tracking-widest">
              Sweatflix
            </h1>
            <h2 className="text-2xl md:text-4xl md:ml-2 bg-gradient-to-b from-red-500 to-red-800 bg-clip-text text-transparent">
              Watch & Burn
            </h2>
          </div>
        </div>
        <div className="flex self-end md:mr-40">
          <button className="text-white md:mr-10 md:text-2xl mr-4">Home</button>
          <form action="#" className="flex items-center">
            <button className="text-white md:mr-10 md:text-2xl rounded-lg hidden md:block">
              Search
            </button>
            <input
              type="text"
              className="w-3/4 md:w-auto h-9 text-center"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
