<!-- @format -->

# fastAPI Movie Score

FastAPI project.

- API for retrieve and create Movies Score
- Every endpoint has a public access, there is not need of keys
- The Database is MYSQL

# Install Requirements & Run the App locally

- Python 3.7+

```bash
$ pip install -r requirements.txt
$ uvicorn main:app --reload
```

# Run the test

Before running the test localy you need to add in the terminal

```bash
$ export PYTHONPATH=. pytest
```

Then

```bash
pytest
```

# Add environment variables - Production

If you are running in production you can add the following env variables

```bash
$ export
    DATABASE_URL="<database_url>"
    ENVIRONMENT="<development||production>"
    DATABASE_URL="<url>"
    DATABASE_USER="<user>"
    DATABASE_PASS="<password>"
    DATABASE_NAME="<database_name>"
```

To check the env

```bash
$ printenv
```

To clean the env

```bash
$ unset ENVIRONMENT DATABASE_URL DATABASE_USER DATABASE_PASS DATABASE_NAME
```

# environment variables - Development

To use environment variables in development we've already installed the library python-dotenv.

The config/settings.py will read the env from the .env file.

```bash
$ pip install python-dotenv
```

# Available endpoints

- Index/Movies Score management endpoint

| Description           | Endpoint            | Method |
| --------------------- | ------------------- | ------ |
| Api index             | `/`                 | GET    |
| List all Movies Score | `/api/movies_score` | GET    |
| Get Movie Score       | `/api/movie_score`  | GET    |
| Create Movie Score    | `/api/movie_score`  | POST   |

# POST Request for `Create Movie Score`

The below example goes into json body of POST request while creating a movie scpore.

```json
{
  "movie": "BEE MOVIE",
  "provider": "IMDB",
  "score": 9.7
}
```

# GET Request for `Get Movie Score`

Example

```
movie=Rambo&provider=IMDB
```

# `Project Structure`

| Folder     | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| config     | Has the config for the env variables                        |
| db         | Db connection - MYSQL                                       |
| middleware | Has the middlewares/cors                                    |
| models     | Db models that used in services/handlers                    |
| routes     | All endpoints / handlers                                    |
| schemas    | pydantic models that used in service/crud or route/handlers |
| services   | CRUD for db models that used in routes/handlers             |
| test       |                                                             |

# Test

There
The test run:
The test xdx:

# Convencion de nombres

La convencion de nombres en las carpetas, clases, funciones y variables se considera apartir del supuesto que el projecto crece y es necesario optar por nombres que sirvan de guia para los desarrolladores.

Supuesto:

routes - movies - moviesScore_routes -> in the case we need to add more routes related to movies
routes - movies - moviesActos_routes ->
routes - movies - moviesProviders_routes ->
routes - providers - providers_routes -> new provider, provider details
routes - providers - providersReveneus_routes ->
routes - user - users_routes -> LogIn , LogOut , RecoverUser, UpdateUser
routes - user - Auth_routes -> Mailing , Token, GoogleOuth ...

models - movies - movieScore_models
model - providers - providersModels

schemas - movies - movieScore_schemas
schemas - movies - moviesActors_schemas
schemas - movies - moviesProviders_schemas
schemas - providers - providers_schemas
schemas - providers - providerReveneus_schemas

services - movies - moviesScore_service
services - provider - provider_service

db - mysequlize
db - redis - redisConnection
