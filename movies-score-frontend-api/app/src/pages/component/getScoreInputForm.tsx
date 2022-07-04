/** @format */
import React, { useState } from "react";

import { FetchState, Movie } from "../../types/types";
import { useGetMovieScore } from "../../services/getMovie-api-hook";
import useInput from "../../hooks/useInput-hook";

const GetScoreInputForm = () => {
  // getMovieScore States
  const [movieScore, fetchState, errMessage, getMovieScore] =
    useGetMovieScore();

  // input Form State
  const [movieProps, resetMovie] = useInput("");
  const [providerProps, resetProvider] = useInput("");

  const btnOnClick = () => {
    let movie = movieProps.value;
    let provider = providerProps.value;

    getMovieScore({ movie, provider });
  };

  return (
    <div>
      <h1>API Movie Score</h1>
      {fetchState === FetchState.DEFAULT && (
        <div className="default">
          <p>Fill the form to get the Movie's Score</p>
        </div>
      )}
      {fetchState === FetchState.ERROR && (
        <div className="default">
          <p>Try to find another movie</p>
        </div>
      )}
      {fetchState === FetchState.SUCCESS && (
        <div className="default">
          <p>Movie's Score Founded!!</p>
          <p>Try another one</p>
        </div>
      )}
      <div>
        <input
          data-testid="user-input"
          placeholder="Enter movie"
          {...movieProps}
        />
      </div>
      <div>
        <input
          data-testid="user-input"
          placeholder="Enter provider"
          {...providerProps}
        />
      </div>
      <div></div>
      <button role="find" onClick={btnOnClick}>
        Find
      </button>
      {fetchState === FetchState.LOADING && <p>Loading ...</p>}
      {fetchState === FetchState.ERROR && (
        <>
          <div className="fail">
            <p>Oops! Please try again.</p>
            <h2>{errMessage}</h2>
          </div>
        </>
      )}
      {fetchState === FetchState.SUCCESS && (
        <div className="success">
          <h2>SCORE:</h2>
          <h1>
            <>{movieScore}</>
          </h1>
        </div>
      )}
    </div>
  );
};

export default GetScoreInputForm;
