<!-- @format -->

# Testing Backend

It consist in testing the endpoints.

A new database is created, then each time the a test starts, the database is cleaned.

```
/test/movieScore_routes_test/movieScore_crud_test.py
```

<br>

| Test - Name                      | Description              | Expected                                              |
| -------------------------------- | ------------------------ | ----------------------------------------------------- |
| `ROUTE ===== /api/movies_score`  | METHOD === GET           |                                                       |
| test_movie_score_get_all         | Get all the movies score | res.status_code == 200                                |
| `ROUTE ===== /api/movies_score/` | METHOD === GET           |                                                       |
| test_movie_score_get_one         | Get the a movie score    | res.status_code == 404                                |
| test_movie_score_get_one         | Get the a movie score    | res.json()['detail'] == "Movie not found"             |
| `ROUTE ===== /api/movies_score`  | METHOD === POST          |                                                       |
| test_movie_score_get_one         | Create a movie score     | res.status_code == 400                                |
| test_movie_score_create          | Create a movie score     | res.json()['detail'] == "Movie is already registered" |
