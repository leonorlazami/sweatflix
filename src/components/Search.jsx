import React from "react";

const Search = ({
  handleGenreChange,
  handleRunTimeChange,
  handleRatingChange,
  handleFindButton,
}) => {
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
          <select
            name="genre"
            id="genre"
            className="w-full h-10 text-center"
            onChange={(e) => handleGenreChange(e.target.value)}
          >
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Crime">Crime</option>
            <option value="Horror">Horror</option>
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
            onChange={(e) => handleRunTimeChange(e.target.value)}
          >
            <option value={30}> {`< 30 minutes`}</option>
            <option value={60}>{`30 > minutes`}</option>
          </select>
        </div>
        <div className="flex items-center md:ml-2 w-40">
          <label htmlFor="runtime" className="mr-2">
            RATING:
          </label>
          <select
            name="rating"
            id="rating"
            className="w-full h-10 text-center"
            onChange={(e) => handleRatingChange(Number(e.target.value))}
          >
            <option value={6}>6+</option>
            <option value={7}>7+</option>
            <option value={8}>8+</option>
          </select>
        </div>
      </form>
      <button
        onClick={handleFindButton}
        className="md:mt-2 md:ml-20 ml-10 custom-button "
      >
        Find
      </button>
    </div>
  );
};

export default Search;
