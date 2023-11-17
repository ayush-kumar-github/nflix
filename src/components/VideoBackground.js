import React from "react";
import useMovieTrailer from "../customhook/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackground = ({ id }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(id);

  return (
    <div className="w-screen iframe-container">
      <iframe
        className="w-screen aspect-video"
        src={"http://www.youtube.com/embed/" + trailerVideo?.key}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
