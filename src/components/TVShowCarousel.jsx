import React, { useState } from "react";
import Search from "./Search";
import Slider from "./Slider";
import mock from "../shows.json";

const TVShowCarousel = ({ shows, handleShowClick }) => {
  const [genre, setGenre] = useState("Comedy");
  const [runTime, setRunTime] = useState(30);
  const [rating, setRating] = useState(6);
  const [filteredShows, setFilteredShows] = useState([]);

  function handleGenreChange(selectedGenre) {
    setGenre(selectedGenre);
  }
  function handleRunTimeChange(selectedRunTime) {
    setRunTime(selectedRunTime);
  }
  function handleRatingChange(selectedRating) {
    setRating(selectedRating);
  }

  function handleFindButton() {
    const filtered = mock.filter(
      (show) =>
        show.genres.includes(genre) &&
        show.averageRuntime <= runTime &&
        show.rating.average > rating &&
        show.rating.average < rating + 1
    );
    setFilteredShows(filtered);
  }

  return (
    <div>
      <Search
        handleGenreChange={handleGenreChange}
        handleRunTimeChange={handleRunTimeChange}
        handleRatingChange={handleRatingChange}
        handleFindButton={handleFindButton}
      />
      <Slider
        shows={shows}
        filteredShows={filteredShows}
        handleShowClick={handleShowClick}
      />
    </div>
  );
};

export default TVShowCarousel;
