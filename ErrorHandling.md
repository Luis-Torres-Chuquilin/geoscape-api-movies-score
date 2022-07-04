<!-- @format -->

# Handling Errors

The errors are handling by the backend, it sends message to the front, and is the frond which dysplay it to the user.

# Erros

The frond-end does not allow to send a wrong or incomplete paylaod to the backend.

## `Backend - Handler Cases`

| Method - Route      | Error - Description                 | Error Code | Message sended              |
| ------------------- | ----------------------------------- | ---------- | --------------------------- |
| GET - /movie_score/ | Movie S. is not in the database     | 404        | Movie not found             |
| POST - /movie_score | Movie S. is already in the database | 400        | Movie is already registered |

## `FrontEnd - Handler Case - Not Network`

| Method - Route      | Error - Description                              | Error Code  | Message Display   |
| ------------------- | ------------------------------------------------ | ----------- | ----------------- |
| GET - /movie_score/ | The Backend is not running / there is not server | ERR_NETWORK | Networks Problems |
| POST - /movie_score | The Backend is not running / there is not server | ERR_NETWORK | Networks Problems |
