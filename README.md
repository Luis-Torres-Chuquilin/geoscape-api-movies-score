<!-- @format -->

# API Movie Score

FastAPI project.

- API for retrieving and creating Movies Score
- Every endpoint has public access, and there is no need for keys
- The Database is MYSQL

# Run The Project

Backend - Inside the folder movies-score-back-api/app run:

```bash
$ pip install -r requirements.txt
$ python load_csv.py       #  insert the csv into the database
$ uvicorn main:app --reload
```

Frontend - Inside the folder movies-score-front-api/app

```bash
$ npm install
$ npm start
```

# Run Test Locally

Before running the test locally you need to add:

## Backend

```bash
$ export PYTHONPATH=. pytest
```

Inside the folder movies-score-back-api/app

Then

```bash
pytest
```

For additional information Check [Testing back](TestingBack.md)

## Frontend

Inside the folder movies-score-front-api/app

```bash
$ npm run test
```

For additional information Check [Testing Front](TestingFront.md)

# Available endpoints - Backend

| Description           | Endpoint            | Method |
| --------------------- | ------------------- | ------ |
| Api index             | `/`                 | GET    |
| List all Movies Score | `/api/movies_score` | GET    |
| Get Movie Score       | `/api/movie_score`  | GET    |
| Create Movie Score    | `/api/movie_score`  | POST   |

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

# POST Request for `Create Movie Score`

The below example goes into the JSON body of the POST request while creating a movie score.

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

# Naming Convention - Backend

The naming convention in folders, classes, functions, and variables is considered from the assumption that the project grows and it is necessary to opt for names that serve as a guide for developers.

`Assumption`:

| Folder     | Folder     | file.py                  |
| ---------- | ---------- | ------------------------ |
| `routes`   | movies     | moviesScore_routes       |
|            |            | moviesActos_routes       |
|            |            | moviesProviders_routes   |
|            | providers  | providers_routes         |
|            |            | providersReveneus_routes |
|            | user       | users_routes             |
|            |            | Auth_routes              |
|            |            |                          |
| `models`   | movies     | movieScore_models        |
|            | providers  | providers_models         |
|            |            |                          |
| `schemas`  | movies     | movieScore_schemas       |
|            |            | moviesActors_schemas     |
|            | providers  | providers_schemas        |
|            |            | providerReveneus_schemas |
|            |            | moviesActors_schemas     |
|            |            |                          |
| `services` | movies     | moviesScore_service      |
|            | provider   | provider_service         |
|            |            |                          |
| `db`       | mysequlize | mysqlConnection          |
|            | redis      | redisConnection          |

# Naming Convention - Fronend

# Why use a SQL Daatabase instead of a NoSQL

Because the project is small the use of SQL or NoSQL will not make much of a difference. But if the application begins to grow, it may be necessary to relate many tables, in which case a relational database is preferable according to the litetaruta

# Why RESTAPI instead of SOAP

RESTAPI is faster than SOAP and more flexible, while SOAP requires more complexity. For more information follow this [link](https://messagemedia.com/uk/blog/the-benefits-of-moving-from-soap-to-rest-apis/)
