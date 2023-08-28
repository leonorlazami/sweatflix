import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Slider = ({ shows }) => {
  const tvShows = shows.tv_shows;
  console.log(tvShows.length);

  return (
    <div>
      {tvShows.length > 0 ? (
        <Swiper spaceBetween={20} slidesPerView={3}>
          {tvShows.map((tvShow) => (
            <SwiperSlide key={tvShow.id} className="swiper-slide-container">
              <img
                src={tvShow.image_thumbnail_path}
                alt={tvShow.name}
                className="w-full h-48 object-cover md:h-72 md:max-h-72 md:mt-40 cursor-pointer mt-10"
              />
              <div className="flex flex-col items-center text-left overflow-hidden font-mulish font-bold">
                <span className="whitespace-no-wrap">{tvShow.name}</span>
              </div>
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
