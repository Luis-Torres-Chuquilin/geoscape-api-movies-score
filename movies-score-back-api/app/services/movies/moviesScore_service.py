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

def delete_movie_score(db: Session, id: int):
    db_movieScore =db.query(MoviesScoreModel).filter(MoviesScoreModel.id == id).first()
    db.delete(db_movieScore)
    db.commit()
    return db_movieScore

def update_movie_score(db: Session, movie_name: str, movie_provider: str, score_: int):
    db_movieScore = db.query(MoviesScoreModel).filter(MoviesScoreModel.movie == movie_name , MoviesScoreModel.provider == movie_provider).first()
    print('db_movieScore======', db_movieScore.score)
    db_movieScore.score = score_
    db.commit()
    return db_movieScore

def create_movie_score(db: Session, movie: MovieScoreCreateSchema):
    # UPPERCASE
    
    db_movieScore = MoviesScoreModel(movie=movie.movie.upper(), provider=movie.provider.upper() , score=movie.score)
    db.add(db_movieScore)
    db.commit()
    db.refresh(db_movieScore)
    return db_movieScore



class MovieScoreService():
    def getAll(self, db: Session, skip: int = 0, limit: int = 100):
        return db.query(MoviesScoreModel).offset(skip).limit(limit).all()

    def getOne(self, db: Session, movie_name: str, movie_provider: str):
        return db.query(MoviesScoreModel).filter(MoviesScoreModel.movie == movie_name , MoviesScoreModel.provider == movie_provider).first()


    def create(self, db: Session, movie: MovieScoreCreateSchema):
    # UPPERCASE
        db_movieScore = MoviesScoreModel(movie=movie.movie.upper(), provider=movie.provider.upper() , score=movie.score)
        db.add(db_movieScore)
        db.commit()
        db.refresh(db_movieScore)
        return db_movieScore
