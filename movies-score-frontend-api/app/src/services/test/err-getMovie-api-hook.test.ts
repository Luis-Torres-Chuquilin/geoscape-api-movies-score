/** @format */

import { renderHook } from "@testing-library/react-hooks";
import { useGetMovieScore } from "../getMovie-api-hook";
import { FetchState } from "../../types/types";
import { act } from "react-dom/test-utils";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://127.0.0.1:8000/api/movie_score/", (req, res, ctx) => {
    return res(
      ctx.status(404),
      // And a response body
      ctx.json({
        detail: "Movie not found",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("API - Response error", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useGetMovieScore());
  const [movieScore, , , getMovieScore] = result.current;

  act(() => {
    getMovieScore({ movie: "strings", provider: "string" });
  });

  expect(movieScore).toBe(undefined);
  await waitForNextUpdate();

  const [movieScores, fetchState, errMessage] = result.current;

  expect(movieScores).toBe(undefined);
  expect(fetchState).toBe(FetchState.ERROR);
  expect(errMessage).toBe("Movie not found");
});
