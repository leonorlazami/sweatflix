import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const Profile = () => {
  const [favoriteShows, setFavoriteShows] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteShows(favorites);
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <h2>Your Favorite Shows</h2>
      <ul>
        {favoriteShows.map((showId) => (
          <li key={showId}>{showId}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
