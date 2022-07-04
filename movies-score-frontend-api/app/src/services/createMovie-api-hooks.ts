/** @format */

import axios from "axios";
import { useState } from "react";
import { FetchState, MovieCreate } from "../types/types";

export const usePostMovieScore = () => {
  const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
  const [movieCreate, setMovieCreate] = useState<MovieCreate>();
  const [errMessage, setErrMessage] = useState<string>();

  const url = process.env.URL || "http://127.0.0.1:8000/api/movie_score";

  const creteMovieScore = async ({ movie, provider, score }: MovieCreate) => {
    if (movie === "" || provider === "" || isNaN(score)) {
      setErrMessage("Fill the form to create a movie");
      setFetchState(FetchState.ERROR);
      return;
    }
    try {
      setFetchState(FetchState.LOADING);
      const res = await axios.post(url, { movie, provider, score });
      const resData = res.data as MovieCreate;

      setMovieCreate(resData);
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

  return [movieCreate, fetchState, errMessage, creteMovieScore] as const;
};
