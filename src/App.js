import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import { debounce } from 'lodash';
import tempShows from './mock.json';

import TVShowCarousel from "./components/TVShowCarousel";
import Details from "./components/Details";

function App() {
  const [query, setQuery] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [movies, setMovies] = useState(tempShows);
  const [abortController, setAbortController] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  function resetState() {
    setQuery(null)
    setShowSearch(false)
    setMovies(tempShows)
    setAbortController(null)
    setSelectedShow(null)
  }

  const handleShowClick = (show) => {
    setSelectedShow(show);
    setShowSearch((prev) => !prev);
  };



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

  useEffect(() => {
    if (!query || query === "") {
      return;
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    const fetchMovies = debounce(async () => {
      try {
        if (query.length > 1) {
          const res = await fetch(
            `https://api.tvmaze.com/search/shows?q=${query}`,
            { signal: newAbortController.signal }
          );

          const data = await res.json();

          const movieList = data.map((result) => {
            const show = result.show;
            return {
              id: show.id || null,
              url: show.url || null,
              name: show.name || null,
              type: show.type || null,
              language: show.language || null,
              genres: show.genres || [],
              premiered: show.premiered || null,
              rating: {
                average: show.rating?.average || null,
              },
              webChannel: {
                name: show.network?.name || null,
                officialSite: show.network?.officialSite || null,
              },
              image: {
                medium: show.image?.medium || null,
                original: show.image?.original || null
              }
            };
          });

          setMovies(movieList);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching movies:", error);
        }
      }
    }, 300);

    fetchMovies();

    return function () {
      if (newAbortController) {
        newAbortController.abort();
      }
    };
  }, [query]);


  useEffect(() => {
    const handlePopstate = (event) => {

      if (window.location.pathname === "/") {
        resetState();
      }
    };


    window.addEventListener("popstate", handlePopstate);


    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        query={query}
        handleQuery={handleQuery}
        showSearch={showSearch}
        handleShowSearch={handleShowSearch}
        selectedShow={selectedShow}
        setShowSearch={setShowSearch}
      />
      <Routes>
        <Route path="/" element={<TVShowCarousel shows={movies} handleShowClick={handleShowClick} handleShowSearch={handleShowSearch} setShowSearch={setShowSearch} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id" element={<Details selectedShow={selectedShow} handleShowClick={handleShowClick} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

