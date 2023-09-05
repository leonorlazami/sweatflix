import { useEffect, useState } from "react";

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
  }, [query, page]);
  console.log(movies)



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
        <Navbar
          query={query}
          handleQuery={handleQuery}
          showSearch={showSearch}
          handleShowSearch={handleShowSearch} />

        <TVShowCarousel
          shows={movies}
          handleShowClick={handleShowClick} />

      </div>
    )
  );

}

export default App;
