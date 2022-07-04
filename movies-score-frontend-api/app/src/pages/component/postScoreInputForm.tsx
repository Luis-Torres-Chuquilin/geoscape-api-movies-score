/** @format */
import React, { useState } from "react";

import { FetchState } from "../../types/types";
import useInput from "../../hooks/useInput-hook";
import { usePostMovieScore } from "../../services/createMovie-api-hooks";

const PostScoreInputForm = () => {
  // postMovieScore States
  const [movieScore, fetchState, errMessage, creteMovieScore] =
    usePostMovieScore();

  // input Form State
  const [movieProps, resetMovie] = useInput("");
  const [providerProps, resetProvider] = useInput("");
  const [scoreProps, resetScore] = useInput("");

  const btnOnClick = () => {
    let movie = movieProps.value;
    let provider = providerProps.value;
    let score = parseFloat(scoreProps.value);

    creteMovieScore({ movie, provider, score });
  };

  return (
    <div>
      <h1>API Movie Score</h1>
      {fetchState === FetchState.DEFAULT && (
        <div className="default">
          <p>Fill the form to add a Movie's Score</p>
        </div>
      )}
      {fetchState === FetchState.ERROR && (
        <div className="default">
          <p>Try to register another movie</p>
        </div>
      )}
      {fetchState === FetchState.SUCCESS && (
        <div className="default">
          <p>Movie's Score Added!!</p>
          <p>Try to add another one</p>
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
      <div>
        <input
          type="number"
          data-testid="user-input"
          placeholder="Enter score"
          {...scoreProps}
        />
      </div>
      <button onClick={btnOnClick}> Add</button>
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
          <h2>Movie:</h2>
          <p>
            <>{movieScore?.movie}</>
          </p>
          <h2>Provider:</h2>
          <>{movieScore?.provider}</>
          <h2>Score:</h2>
          <>{movieScore?.score}</>
        </div>
      )}
    </div>
  );
};

export default PostScoreInputForm;
