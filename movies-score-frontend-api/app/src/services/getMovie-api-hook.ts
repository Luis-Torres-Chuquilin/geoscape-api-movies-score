/** @format */
import axios from "axios";
import { useState } from "react";

import { FetchState, Movie, MovieScore } from "../types/types";

export const useGetMovieScore = () => {
  const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
  const [movieScore, setMovieScore] = useState<MovieScore>();
  const [errMessage, setErrMessage] = useState<string>("");

  const url = process.env.URL || "http://127.0.0.1:8000/api/movie_score/";

  const getMovieScore = async ({ movie, provider }: Movie) => {
    try {
      setFetchState(FetchState.LOADING);
      const res = await axios.get(
        url + `?movie_name=${movie}&movie_provider=${provider}`
      );

      const resData = res.data.score as MovieScore;

      setMovieScore(resData);
      setFetchState(FetchState.SUCCESS);
    } catch (err: any) {
      if (err.code === "ERR_NETWORK") {
        setErrMessage("Networks Problems");
        setFetchState(FetchState.ERROR);
      }

      setErrMessage(err.response.data.detail);
      setFetchState(FetchState.ERROR);
    }
  };

  return [movieScore, fetchState, errMessage, getMovieScore] as const;
};
