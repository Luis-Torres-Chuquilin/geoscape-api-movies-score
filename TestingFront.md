<!-- @format -->

# Testing Front

It consist in two statege:

## `Check if the front display the right text according to the states`

The answers of useGetMovieScore are Mocked, basically it call the API with GET and has as an
answer fetchState, it could be DEFAULT, LOADING , ERROR, SUCCESS

```
/src/main_test/App.test.tsx
```

| Test - Case                      | Description              | Text in the Document should be            |
| -------------------------------- | ------------------------ | ----------------------------------------- |
| `ROUTE ===== /api/movies_score/` | METHOD === GET           |                                           |
| FetchState.DEFAULT               | There is not API call    | "Fill the form to get the Movie's Score"; |
| FetchState.LOADING               | The API is call with GET | "Loading ..."                             |
| FetchState.ERROR                 | API - "Movie not found"  | "Try to find another movie"               |
| FetchState.ERROR                 | It does'nt found the API | "Networks Problems"                       |
| FetchState.SUCCESS               | API answer success       | "Movie's Score Founded!!""                |

## `Check the services/customHooks that brings call the API.`

The answer of the server are mocked

For conveniences the this test are in the same folder than the services to be tested

<br>

```
/src/services/test/success-getMovie-api-hook.test.ts
```

| Test - Case                      | Description            | Value expected                      |
| -------------------------------- | ---------------------- | ----------------------------------- |
| `ROUTE ===== /api/movies_score/` | METHOD === GET         |                                     |
| API GET- Response success        | API - Response success | movieScore = 0 & FetchState.SUCCESS |

<br>

```
/src/services/test/err-getMovie-api-hook.test.ts
```

| Test - Case                      | Description                      | Value expected                 |
| -------------------------------- | -------------------------------- | ------------------------------ |
| `ROUTE ===== /api/movies_score/` | METHOD === GET                   |                                |
| API GET - Response error         | API - Response "Movie not found" | errMessage = "Movie not found" |

<br>

```
/src/services/test/success-postMovie-api-hook.test.ts
```

| Test - Case                     | Description            | Value expected                                      |
| ------------------------------- | ---------------------- | --------------------------------------------------- |
| `ROUTE ===== /api/movies_score` | METHOD === POST        |                                                     |
| API POST - Response success     | API - Response success | { movie: "string", provider: "string", score: 2.2 } |

<br>

```
/src/services/test/err-postMovie-api-hook.test.ts
```

| Test - Case                     | Description                                  | Value expected                             |
| ------------------------------- | -------------------------------------------- | ------------------------------------------ |
| `ROUTE ===== /api/movies_score` | METHOD === POST                              |                                            |
| API POST - Response error       | API - Response "Movie is already registered" | errMessage = "Movie is already registered" |
