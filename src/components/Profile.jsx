import React, { useEffect, useState } from "react";

const Profile = () => {
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
  const [blurStates, setBlurStates] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteShows(favorites);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all(
          favoriteShows.map(async (id) => {
            const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
            return response.json();
          })
        );

        setShowDetails(responses);

        setBlurStates(new Array(responses.length).fill(false));
      } catch (err) {
        console.error("Error fetching show details: ", err);
      }
    }

    fetchData();
  }, [favoriteShows]);

  function toggleBlur(index) {
    setBlurStates((prevBlurStates) => {
      const newBlurStates = [...prevBlurStates];
      newBlurStates[index] = !newBlurStates[index];
      return newBlurStates;
    });
  }

  console.log("showdetails:", showDetails);
  return (
    <>
      {showDetails.map((show, index) => (
        <div
          className="flex flex-col h-full gap-2 mt-10 ml-10 bg-slate-400"
          key={show.id}
        >
          <div className="flex gap-2">
            <img
              src={show.image.medium}
              alt=""
              className={blurStates[index] ? "w-[8rem] blur sepia" : "w-[8rem]"}
            />
            <div className="self-center ml-4">
              <button
                className="border border-black mb-4"
                onClick={() => toggleBlur(index)}
              >
                {blurStates[index] ? "Click to unsee" : "Mark as seen"}
              </button>
              <button className="border border-black">Remove</button>
            </div>
          </div>

          <div
            className={
              blurStates[index]
                ? "w-full flex gap-2 line-through"
                : "w-full flex gap-2"
            }
          >
            {show.name}
          </div>
          <div className="ml-20 flex"></div>
        </div>
      ))}
    </>
  );
};

export default Profile;
