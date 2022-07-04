/** @format */

import { fireEvent, render, screen } from "@testing-library/react";
// import { GetScoreInputForm } from "../pages/component/getScoreInputForm";
import Home from "../pages/Home";
import * as apiHooks from "../services/getMovie-api-hook";
import { FetchState, Movie, MovieScore } from "../types/types";

describe("Render Home", () => {
  const renderHome = () => render(<Home />);

  it("Render Home", () => {
    renderHome();
    const linkElement = screen.getByText(/Find/i);
    expect(linkElement).toBeInTheDocument();
    const divElement = screen.getByRole("maincomponent");
    expect(divElement).toHaveTextContent("Find");
    expect(divElement).toHaveAttribute("role", "maincomponent");
  });

  // FetchState Default
  it("FetchState.DEFAULT  - defaultText", () => {
    const fetchState = FetchState.DEFAULT;
    const defaultTextGet = "Fill the form to get the Movie's Score";

    const spy = jest.spyOn(apiHooks, "useGetMovieScore");
    spy.mockReturnValue([, fetchState, "", jest.fn()]);

    renderHome();
    const fetchStateEl = screen.queryByText(defaultTextGet);

    expect(fetchStateEl).toBeInTheDocument();
  });

  //  Test Loading State - API request  , Method Get
  it("FetchState.LOADING - Text", () => {
    const fetchState = FetchState.LOADING;
    const loadingText = "Loading ...";

    const spy = jest.spyOn(apiHooks, "useGetMovieScore");
    spy.mockReturnValue([, fetchState, "", jest.fn()]);

    renderHome();
    const fetchStateEl = screen.queryByText(loadingText);

    expect(fetchStateEl).toBeInTheDocument();
  });

  //  Test Error State - API answer Error === The movie score is not in the database
  it("FetchState.ERROR - API answer", () => {
    const fetchState = FetchState.ERROR;
    const errorTextGet = "Try to find another movie";

    const spy = jest.spyOn(apiHooks, "useGetMovieScore");
    spy.mockReturnValue([, fetchState, "", jest.fn()]);

    renderHome();
    const fetchStateEl = screen.queryByText(errorTextGet);

    expect(fetchStateEl).toBeInTheDocument();
  });

  //  Test - Error State - API answer Error == Networks Problems
  it("FetchState.ERROR - Networking Error Text", () => {
    const fetchState = FetchState.ERROR;
    const errMessage = "Networks Problems";
    const errorTextNetwork = "Networks Problems";

    const spy = jest.spyOn(apiHooks, "useGetMovieScore");
    spy.mockReturnValue([, fetchState, errMessage, jest.fn()]);

    renderHome();
    const fetchStateEl = screen.queryByText(errorTextNetwork);
    expect(fetchStateEl).toBeInTheDocument();
  });

  //  Test - Success State - API answer correctly
  it("FetchState.SUCCESS - Success Text", () => {
    const fetchState = FetchState.SUCCESS;
    const successTextGet = "Movie's Score Founded!!";

    const spy = jest.spyOn(apiHooks, "useGetMovieScore");
    spy.mockReturnValue([, fetchState, "", jest.fn()]);

    renderHome();
    const fetchStateEl = screen.queryByText(successTextGet);

    expect(fetchStateEl).toBeInTheDocument();
  });
});
