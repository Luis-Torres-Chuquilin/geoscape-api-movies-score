/** @format */

import React, { useState } from "react";
import { FetchState, Movie } from "../types/types";

import GetScoreInputForm from "./component/getScoreInputForm";
import PostScoreInputForm from "./component/postScoreInputForm";

const Home = () => {
  // form State - True -> Display Add MovieScore , False GetMovieScore
  const [formState, setFormState] = useState(true);

  const btnOnClick = () => {
    setFormState(!formState);
  };

  return (
    <>
      <div className="content-container" role="maincomponent">
        <>{formState && <GetScoreInputForm />}</>
        <>{!formState && <PostScoreInputForm />}</>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={btnOnClick}>
          <>{formState && <>Add a Movie's Score</>}</>
          <>{!formState && <>Movie's Score</>}</>
        </button>
      </div>
    </>
  );
};

export default Home;
