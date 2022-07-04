/** @format */

import { renderHook } from "@testing-library/react-hooks";
import { useGetMovieScore } from "../getMovie-api-hook";
import { FetchState } from "../../types/types";
import { act } from "react-dom/test-utils";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://127.0.0.1:8000/api/movie_score/", (req, res, ctx) => {
    return res(ctx.json({ score: 0 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("API - Response success", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useGetMovieScore());
  const [movieScore, , , getMovieScore] = result.current;

  act(() => {
    getMovieScore({ movie: "string", provider: "string" });
  });
  expect(movieScore).toBe(undefined);
  await waitForNextUpdate();
  const [movieScores, fetchState] = result.current;
  expect(movieScores).toBe(0);
  expect(fetchState).toBe(FetchState.SUCCESS);
});
