import React from "react";
import shows from "../shows.json";

const Details = ({ selectedShow, handleShowClick }) => {
  const show = shows.find((show) => show.id === selectedShow);

  if (!show) {
    return <div>No information available for this show.</div>;
  }

  return (
    <>
      <button
        onClick={() => handleShowClick((prev) => null)}
        className="custom-button"
      >
        Go back
      </button>
      <div className="flex font-mulish mt-20">
        <div className=" flex flex-col mr-4 items-center">
          <img src={show.image.medium} alt="" className="w-full h-60 mr-2" />
          <button className=" h-12 custom-button"> Add to favorites ♥</button>
        </div>
        <div className="flex flex-col w-1/2 md:w-1/5">
          <div
            dangerouslySetInnerHTML={{ __html: show.summary }}
            className="text-sm  font-normal"
          />
        </div>
        <div>Show info</div>
      </div>
    </>
  );
};

export default Details;
