import React, { useState } from "react";
import Search from "./Search";
import Slider from "./Slider";
import mock from "../shows.json";

const TVShowCarousel = ({ shows }) => {
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
        show.rating.average <= parseInt(rating + 1)
    );
    setFilteredShows(filtered);
  }
  console.log(filteredShows);
  return (
    <div>
      <Search
        handleGenreChange={handleGenreChange}
        handleRunTimeChange={handleRunTimeChange}
        handleRatingChange={handleRatingChange}
        handleFindButton={handleFindButton}
      />
      <Slider shows={shows} />
    </div>
  );
};

export default TVShowCarousel;
