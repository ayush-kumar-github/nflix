import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { OPTIONS } from "../utils/Constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      OPTIONS
    );
    const json = await response.json();
    dispatch(addNowPlayingMovies(json.results));
  };
  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
