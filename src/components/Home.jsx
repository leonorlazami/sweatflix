import React from "react";
import Slider from "./Slider";
import slides from "../mock.json";

const Home = ({ shows, page, nextPage, prevPage, query, maxPages }) => {
  const tvShows = shows.tv_shows;

  return (
    <>
      <Slider slides={slides.tv_shows} shows={shows} query={query} />
      {tvShows.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-8 ">
          <button
            className="custom-button w-10 h-10 text-center px-0"
            onClick={prevPage}
            disabled={page === 1}
          >
            {`<`}
          </button>
          <span className="text-2xl">
            Page: {page} / {maxPages}
          </span>
          <button
            className="custom-button w-10 h-10 text-center px-0"
            onClick={nextPage}
            disabled={page === maxPages}
          >
            {`>`}
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
