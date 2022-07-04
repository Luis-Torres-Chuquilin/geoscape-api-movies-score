/** @format */

import { renderHook } from "@testing-library/react-hooks";
import { useGetMovieScore } from "../getMovie-api-hook";
import { usePostMovieScore } from "../createMovie-api-hooks";
import { FetchState } from "../../types/types";
import { act } from "react-dom/test-utils";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post("http://127.0.0.1:8000/api/movie_score", (req, res, ctx) => {
    return res(ctx.json({ movie: "string", provider: "string", score: 2.2 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("API POST- Response success", async () => {
  const { result, waitForNextUpdate } = renderHook(() => usePostMovieScore());
  const [movieCreate, , , creteMovieScore] = result.current;

  act(() => {
    creteMovieScore({ movie: "string", provider: "string", score: 2.2 });
  });
  expect(movieCreate).toBe(undefined);
  await waitForNextUpdate();
  const [movie, fetchState] = result.current;
  expect(fetchState).toBe(FetchState.SUCCESS);

  expect(movie).toEqual({
    movie: "string",
    provider: "string",
    score: 2.2,
  });
});
