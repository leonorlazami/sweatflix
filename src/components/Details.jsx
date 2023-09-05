import React, { useEffect, useState } from "react";
import shows from "../shows.json";
import { Link } from "react-router-dom";

const Details = ({ selectedShow, handleShowClick }) => {
  const [showDetails, setShowDetails] = useState({});
  console.log(showDetails);
  useEffect(() => {
    console.log("Selected Show ID:", selectedShow);

    const existingShow = shows.find((show) => show.id === selectedShow);
    console.log("Existing Show:", existingShow); // Debugging

    if (existingShow) {
      setShowDetails(existingShow);
    } else {
      async function fetchShowDetails() {
        try {
          const res = await fetch(
            `https://api.tvmaze.com/shows/${selectedShow}`
          );
          const data = await res.json();
          console.log("Fetched Data:", data); // Debugging

          setShowDetails(data);
        } catch (err) {
          console.error("Error fetching show details: ", err);
        }
      }
      fetchShowDetails();
    }
  }, [selectedShow]);

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
      <div className="flex font-mulish mt-20 w-full md:w-auto md:ml-10 gap-4">
        {showDetails.image && (
          <div className=" flex flex-col mr-4 items-center justify-center">
            <img
              src={showDetails.image.medium}
              alt=""
              className="w-[250px] h-60 mr-2 md:h-full md:w-full ml-5 rounded-md mb-2"
            />
            <button className="custom-button flex items-center justify-center w-[80%] h-auto">
              <svg
                className="text-black w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        )}

        {showDetails.summary && (
          <div className="flex flex-col w-[70%] md:w-1/5 mr-5">
            <div
              dangerouslySetInnerHTML={{
                __html: showDetails.summary,
              }}
              className="text-sm font-normal md:text-lg"
            />
          </div>
        )}

        <div className="md:flex md:w-[30%] md:flex-col md:items-start hidden bg-[#DED7BF] md:gap-2 md:ml-80 md:px-4 md:py-4 md:h-[22rem] border-1 border-[#616155] shadow-md p-4">
          <h3 className="text-2xl self-start">Show info</h3>
          <div className="font-normal">
            <p className="text-md">
              <span className="font-bold mr-2"> Network:</span>
              {showDetails.officialSite ? (
                <a className="text-blue-600" href={showDetails.officialSite}>
                  {showDetails.network?.name ||
                    showDetails.webChannel?.name ||
                    "Information not available"}
                </a>
              ) : (
                showDetails.network?.name ||
                showDetails.webChannel?.name ||
                "Information not available"
              )}
            </p>
            <p className="text-md">
              <span className="font-bold mr-2"> Genres:</span>{" "}
              {showDetails.genres
                ? showDetails.genres.join(" | ")
                : "Information not available"}
            </p>
            <p className="text-md">
              <span className="font-bold mr-2">Language:</span>{" "}
              {showDetails.language ?? "Information not available"}
            </p>
            <p className="text-md">
              <span className="font-bold mr-2">Type:</span>{" "}
              {showDetails.type ?? "Information not available"}
            </p>
            <p className="text-md">
              <span className="font-bold mr-2">Premiered: </span>
              {showDetails.premiered ?? "Information not available"}
            </p>
            <p className="text-md">
              <span className="font-bold mr-2">Rating: </span>
              {showDetails.rating?.average ?? "Information not available"}
            </p>
          </div>
        </div>
      </div>

      <div className="font-mulish flex flex-col items-start md:hidden bg-[#DED7BF]  h-[13rem] border-1 border-[#616155] shadow-md gap-2 mt-10 w-full  pt-2 my-4 pl-4">
        <h3 className="text-2xl mb-2">Show info</h3>
        <div className="font-normal">
          <p className="text-md">
            <span className="font-bold mr-2"> Network:</span>
            {showDetails.officialSite ? (
              <a className="text-blue-600" href={showDetails.officialSite}>
                {showDetails.network?.name ||
                  showDetails.webChannel?.name ||
                  "Information not available"}
              </a>
            ) : (
              showDetails.network?.name ||
              showDetails.webChannel?.name ||
              "Information not available"
            )}
          </p>
          <p className="text-md">
            <span className="font-bold mr-2"> Genres:</span>{" "}
            {showDetails.genres
              ? showDetails.genres.join(" | ")
              : "Information not available"}
          </p>
          <p className="text-md">
            <span className="font-bold mr-2">Language:</span>{" "}
            {showDetails.language ?? "Information not available"}
          </p>
          <p className="text-md">
            <span className="font-bold mr-2">Type:</span>{" "}
            {showDetails.type ?? "Information not available"}
          </p>
          <p className="text-md">
            <span className="font-bold mr-2">Premiered: </span>
            {showDetails.premiered ?? "Information not available"}
          </p>
          <p className="text-md">
            <span className="font-bold mr-2">Rating: </span>
            {showDetails.rating?.average ?? "Information not available"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Details;
