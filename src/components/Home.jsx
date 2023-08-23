import React from "react";
import Slider from "./Slider";
import slides from "../mock.json";
import Search from "./Search";

const Home = ({ shows }) => {
  return (
    <>
      <div className="w-screen h-40 md:h-230 flex items-center gap-4 mb-12 md:mb-[-60px]">
        <Search />
      </div>
      <Slider slides={slides.tv_shows} shows={shows} />
    </>
  );
};

export default Home;
