import { useEffect } from "react";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { OPTIONS } from "../utils/Constants";

const useMovieTrailer = (id) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
      OPTIONS
    );
    const json = await response.json();
    const filterData = json.results.filter((i) => i.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailer;
