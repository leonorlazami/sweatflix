import React, { useEffect, useState } from "react";
import shows from "../shows.json";
import { useParams } from "react-router-dom";

const Details = ({ selectedShow, handleShowClick }) => {
  const [showDetails, setShowDetails] = useState({});
  const [isFav, setIsFav] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleSvgClick = () => {
    setIsNotificationVisible(false);
  };

  const { id } = useParams();
  useEffect(() => {
    const existingShow = shows.find((show) => show.id === id);

    if (existingShow) {
      setShowDetails(existingShow);
    } else {
      async function fetchShowDetails() {
        try {
          const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
          const data = await res.json();

          setShowDetails(data);
        } catch (err) {
          console.error("Error fetching show details: ", err);
        }
      }
      fetchShowDetails();
    }
  }, [id]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFav(favorites.includes(id));
  }, [id]);

  const handleToggleFavorite = () => {
    setIsNotificationVisible(true);
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter((showId) => showId !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFav(false);
    } else {
      const updatedFavorites = [...favorites, id];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFav(true);
    }
  };

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
      <div>
        {isNotificationVisible && (
          <div
            className={`${
              isFav
                ? "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2 mx-1"
                : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2 mx-1"
            }`}
            role="alert"
          >
            <strong className="font-bold">{showDetails.name}</strong>
            <span className="block sm:inline">
              {isFav
                ? `${showDetails.name} has been added to favorites.`
                : `${showDetails.name} has been removed from favorites.`}
            </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className={`${
                  isFav
                    ? "fill-current h-6 w-6 text-green-500"
                    : "fill-current h-6 w-6 text-red-500"
                }`}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={handleSvgClick}
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
      </div>

      <div className="flex font-mulish mt-20 w-full md:w-auto md:ml-10 gap-4">
        {showDetails.image && (
          <div className=" flex flex-col mr-4 items-center justify-center">
            <img
              src={showDetails.image.medium}
              alt=""
              className="w-[250px] h-60 mr-2 md:h-full md:w-full ml-5 rounded-md mb-2"
            />
            <button
              className="custom-button flex items-center justify-center w-[80%] h-auto"
              onClick={handleToggleFavorite}
            >
              <svg
                className="text-black w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="24"
                viewBox="0 0 24 24"
                fill={isFav ? "white" : "none"}
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
