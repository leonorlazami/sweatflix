import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Slider = ({ slides }) => {
  const handleImageClick = (subTitle) => {
    console.log(subTitle); // You can replace this with the desired action to show the movie title
  };
  return (
    <Swiper spaceBetween={20} slidesPerView={3}>
      {slides.map((slide) => (
        <div key={slide.image} className="swiper-slide-container">
          <SwiperSlide>
            <img
              src={slide.image}
              alt=""
              className="w-full h-48 object-cover md:h-full md:mt-40 cursor-pointer "
              onClick={() => handleImageClick(slide.subTitle)}
            />
            <div className="flex flex-col items-center text-center overflow-hidden">
              <span className="whitespace-no-wrap">{slide.title}</span>
            </div>
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  );
};

export default Slider;
