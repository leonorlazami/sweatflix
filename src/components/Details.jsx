import React from "react";
import shows from "../shows.json";

const Details = ({ selectedShow, handleShowClick }) => {
  const show = shows.find((show) => show.id === selectedShow);

  if (!show) {
    return <div>No information available for this show.</div>;
  }

  const formatGenres = (genres) => {
    if (genres.length === 0) {
      return "No genre information available";
    } else if (genres.length === 1) {
      return `Genre: ${genres[0]}`;
    } else {
      return `Genres: ${genres.join(" | ")}`;
    }
  };

  return (
    <>
      <button
        onClick={() => handleShowClick((prev) => null)}
        className="custom-button"
      >
        Go back
      </button>
      <div className="flex font-mulish mt-20 w-full md:w-auto md:ml-10">
        <div className=" flex flex-col mr-4 items-center">
          <img
            src={show.image.medium}
            alt=""
            className="w-full h-60 mr-2 md:h-full md:w-full"
          />
          <button className=" h-12 custom-button"> Add to favorites ♥</button>
        </div>
        <div className="flex flex-col w-1/2 md:w-1/5">
          <div
            dangerouslySetInnerHTML={{ __html: show.summary }}
            className="text-sm  font-normal md:text-lg"
          />
        </div>
        <div className="md:flex md:flex-1  md:justify-center hidden">
          Show info
        </div>
      </div>
      <div
        className="font-mulish flex flex-col items-start md:hidden mt-5 bg-white
      justify-start"
      >
        {" "}
        <h3 className="text-2xl mb-2">Show info</h3>
        <div className="font-normal">
          <p className="text-md">
            <span className="font-bold mr-2"> Network:</span>
            <a className="text-blue-600" href={show.officialSite}>
              {show.webChannel.name}
            </a>{" "}
          </p>
          <p className="text-md">
            <span className="font-bold mr-2"> Genres:</span>{" "}
            {formatGenres(show.genres)}
          </p>
          <p className="text-md">
            <span className="font-bold mr-2">Language:</span> {show.language}
          </p>
          <p className="text-md">
            <span className="font-bold mr-2">Type:</span> {show.type}
          </p>
          <p className="text-md">
            <span className="font-bold mr-2">Premiered: </span>
            {show.premiered}
          </p>
        </div>
      </div>
    </>
  );
};

export default Details;
