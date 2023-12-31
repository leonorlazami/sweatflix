import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const Slider = ({ shows, filteredShows, handleShowClick, setShowSearch }) => {
  const tvShows = filteredShows.length > 0 ? filteredShows : shows;

  return (
    <div>
      {tvShows.length > 0 ? (
        <Swiper spaceBetween={20} slidesPerView={3}>
          {tvShows.map((tvShow) => (
            <SwiperSlide key={tvShow.id} className="swiper-slide-container">
              <Link
                to={`/details/${tvShow.id}`}
                onClick={() => {
                  handleShowClick(tvShow.id);
                  setShowSearch(false);
                }}
                className="custom-link"
              >
                <img
                  src={
                    tvShow.image.medium
                      ? tvShow.image.medium
                      : tvShow.image_thumbnail_path
                  }
                  alt={tvShow.name}
                  className="w-full h-48 object-cover md:h-72 md:max-h-72 md:mt-40 cursor-pointer mt-10"
                />
                <div className="flex flex-col items-center text-left overflow-hidden font-mulish font-bold">
                  <span className="whitespace-no-wrap">{tvShow.name}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <h2 className="text-2xl text-left md:text-4xl md:mt-40">
          No TV shows were found based on your search...
        </h2>
      )}
    </div>
  );
};

export default Slider;
