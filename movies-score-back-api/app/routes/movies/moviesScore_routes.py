from os import stat
from typing import  List

import fastapi
from fastapi import Depends, HTTPException , status
from sqlalchemy.orm import Session

# Database Connection
from db.connection import get_db
# Schemas
from schemas.movies.moviesScore_schemas import MovieScoreCreateSchema, MoviesScoreSchema, MovieScoreBaseSchema
# Logic
from services.movies.moviesScore_service import get_movie_score, get_movies_score, create_movie_score


movie_router = fastapi.APIRouter()

@movie_router.get("/movies_score", response_model=List[MoviesScoreSchema])
async def movies_score( db: Session = Depends(get_db)):
    """List All movies"""
    moviesScores = get_movies_score(db)
    
    return moviesScores


@movie_router.get("/movie_score/", response_model=MovieScoreBaseSchema)
async def movie_score(movie_name: str, movie_provider: str , db: Session = Depends(get_db)):
    """Retrieve the score of one"""
    movieScore = get_movie_score(db=db, movie_name=movie_name , movie_provider=movie_provider)
    
    if movieScore is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    return movieScore

@movie_router.post("/movie_score", response_model=MoviesScoreSchema, status_code=status.HTTP_201_CREATED)
async def create_new_movie_score(movie: MovieScoreCreateSchema, db: Session = Depends(get_db)):
    """Endpoint to create a movie score
    """
    
    moviescore = get_movie_score(db=db, movie_name=movie.movie , movie_provider=movie.provider)
    
    if moviescore:
        raise HTTPException(status_code=400, detail="Movie is already registered")

    return create_movie_score(db=db, movie=movie)


