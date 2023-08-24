import React from "react";

const Search = () => {
  return (
    <div className="flex justify-center items-center mt-5 ml-10 md:w-full">
      <form
        action="#"
        className="flex flex-col md:flex-row gap-2 justify-center items-center"
      >
        <div className="flex items-center md:ml-2 w-40">
          <label htmlFor="genre" className="mr-2">
            GENRE:
          </label>
          <select name="genre" id="genre" className="w-full h-10 text-center">
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="crime">Crime</option>
          </select>
        </div>
        <div className="flex items-center md:ml-2 w-40">
          <label htmlFor="runtime" className="mr-2">
            RUNTIME:
          </label>
          <select
            name="runtime"
            id="runtime"
            className="w-full h-10 text-center"
          >
            <option value="15">15min.</option>
            <option value="20">20min.</option>
            <option value="25">25min.</option>
            <option value="30">30min.</option>
            <option value="35">35min.</option>
            <option value="40">40min.</option>
            <option value="45">45min.</option>
            <option value="50">50min.</option>
            <option value="55">55min.</option>
            <option value="60">60min.</option>
          </select>
        </div>
        <div className="flex items-center md:ml-2 w-40">
          <label htmlFor="runtime" className="mr-2">
            RATING:
          </label>
          <select name="rating" id="rating" className="w-full h-10 text-center">
            <option value="6+">6+</option>
            <option value="7+">7+</option>
            <option value="8+">8+</option>
          </select>
        </div>
      </form>
      <button className="md:mt-2 md:ml-20 ml-10 custom-button ">Find</button>
    </div>
  );
};

export default Search;
