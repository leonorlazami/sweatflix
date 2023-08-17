import React from "react";
import Slider from "./Slider";
import slides from "../mock.json";

const Home = () => {
  return (
    <>
      <div className="w-screen h-screen bg-[#F4F1DE]  flex items-center text-black">
        <Slider slides={slides} />
      </div>
    </>
  );
};

export default Home;
