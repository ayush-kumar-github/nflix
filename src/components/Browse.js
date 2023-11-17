import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../customhook/useNowPlayingMovies";
import SecondaryContainer from "../components/SecondaryContainer";
import MainContainer from "../components/MainContainer";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
