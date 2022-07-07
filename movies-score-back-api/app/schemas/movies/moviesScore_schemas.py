from pydantic import BaseModel

class MovieBaseSchema(BaseModel):
    movie: str
    provider: str
    score: float

class MovieScoreBaseSchema(BaseModel):
    score: float
    class Config:
        orm_mode = True


class MovieScoreCreateSchema(MovieBaseSchema):
    pass

class MoviesScoreSchema(MovieBaseSchema):
    # If timestamp is needed
    # created_at: Optional[datetime]
    # updated_at: Optional[datetime]

    class Config:
        orm_mode = True


