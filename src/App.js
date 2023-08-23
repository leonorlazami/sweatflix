import { useEffect, useState } from "react";
import Home from "./components/Home";

import Navbar from "./components/Navbar";
import { debounce } from 'lodash';
import tempShows from './mock.json'



function App() {
  const [query, setQuery] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [movies, setMovies] = useState(tempShows);
  const [abortController, setAbortController] = useState(null);


  function handleShowSearch() {
    setShowSearch((prev) => !prev);
  }
  function handleQuery(e) {
    setQuery(e.target.value);


  }





  useEffect(
    function () {
      if (!query || query === "") {
        setMovies(tempShows);
        return;
      }

      if (abortController) {
        abortController.abort();
      }
      const newAbortController = new AbortController();
      setAbortController(newAbortController);

      const fetchMovies = debounce(async () => {
        try {
          if (query.length > 3) {
            const res = await fetch(
              `https://www.episodate.com/api/search?q=${query}&page=1`,
              { signal: newAbortController.signal }
            );

            const data = await res.json();
            setMovies(data);
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Error fetching movies:", error);
          }
        }
      }, 300);

      fetchMovies();


      return function () {
        newAbortController.abort();
      };
    },
    [query]
  );


  return (
    <div>
      <Navbar
        query={query}
        handleQuery={handleQuery}
        showSearch={showSearch}
        handleShowSearch={handleShowSearch} />

      <Home shows={movies} query={query} />


    </div>
  );
}

export default App;
