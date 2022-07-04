from sqlalchemy import Column,  Integer, String, Float

# Database 
from db.connection import Base
# Common columns 
from ..mixins import Timestamp


class MoviesScoreModel(Base):
    __tablename__ = "movies_score"

    id = Column(Integer, primary_key=True, index=True)
    movie = Column(String(100), index=True, nullable=False)
    provider = Column(String(100), index=True, nullable=False)
    score =  Column(Float, nullable=False)
