import { useEffect, useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { debounce } from 'lodash';
import tempShows from './mock.json';


import TVShowCarousel from "./components/TVShowCarousel";
import Details from "./components/Details";

function App() {
  const [query, setQuery] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [movies, setMovies] = useState(tempShows);
  const [abortController, setAbortController] = useState(null);
  const [page, setPage] = useState(1)
  const maxPages = movies.pages
  const [selectedShow, setSelectedShow] = useState(null);

  const handleShowClick = (show) => {
    setSelectedShow(show);
  };
  console.log(selectedShow)

  function nextPage() {
    if (page >= maxPages) return
    setPage(page => page + 1)

  }
  function prevPage() {
    if (page === 1) return

    setPage(page => page - 1)
  }
  function handleShowSearch() {
    setShowSearch((prev) => !prev);
  }



  const debouncedHandleQuery = debounce((value) => {
    setQuery(value);
  }, 300);

  function handleQuery(e) {
    const value = e.target.value;
    debouncedHandleQuery(value);

  }

  useEffect(
    function () {
      if (!query || query === "") {

        return;
      }

      if (abortController) {
        abortController.abort();
      }
      const newAbortController = new AbortController();
      setAbortController(newAbortController);

      const fetchMovies = debounce(async () => {
        try {
          if (query.length > 1) {
            const res = await fetch(
              `https://www.episodate.com/api/search?q=${query}&page=${page}`,
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
    [query, page]
  );


  return (
    selectedShow ? <div>
      <Navbar
        query={query}
        handleQuery={handleQuery}
        showSearch={showSearch}
        handleShowSearch={handleShowSearch} />
      <Details selectedShow={selectedShow} handleShowClick={handleShowClick} />


    </div> : (
      <div>

        <TVShowCarousel
          shows={movies}
          handleShowClick={handleShowClick} />
        <Home
          shows={movies}
          query={query}
          page={page}
          nextPage={nextPage}
          prevPage={prevPage}
          maxPages={maxPages} />
      </div>
    )
  );

}

export default App;
