from sqlalchemy.orm import Session

from models.movies.moviesScore_models import MoviesScoreModel
from schemas.movies.moviesScore_schemas import MovieScoreCreateSchema

# Do  discuss 
# option one models.moviesScoreModels -> models.moviesScore
# option two schemas.movies.moviesScoreSchemas - schemas.movies.moviesScore

def get_movies_score(db: Session, skip: int = 0, limit: int = 100):
    return db.query(MoviesScoreModel).offset(skip).limit(limit).all()

def get_movie_score(db: Session, movie_name: str, movie_provider: str):
    return db.query(MoviesScoreModel).filter(MoviesScoreModel.movie == movie_name , MoviesScoreModel.provider == movie_provider).first()


def create_movie_score(db: Session, movie: MovieScoreCreateSchema):
    # UPPERCASE
    
    db_movieScore = MoviesScoreModel(movie=movie.movie.upper(), provider=movie.provider.upper() , score=movie.score)
    db.add(db_movieScore)
    db.commit()
    db.refresh(db_movieScore)
    return db_movieScore
