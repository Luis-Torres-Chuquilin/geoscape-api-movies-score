from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy import Column,  Integer, String, Float , insert
import csv
# Configs
from config.settings import Settings
settings = Settings()

print('Enviroment', settings.environment)
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{settings.database_user}:{settings.database_pass}@{settings.database_url}/{settings.database_name}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, future=True
)

if not database_exists(engine.url):
    create_database(engine.url)

SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, future=True
)

Base = declarative_base()

# DB Utilities
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class MoviesScoreModel(Base):
    __tablename__ = "movies_score"

    id = Column(Integer, primary_key=True, index=True)
    movie = Column(String(100), index=True, nullable=False)
    provider = Column(String(100), index=True, nullable=False)
    score =  Column(Float, nullable=False)

Base.metadata.create_all(bind=engine)

with open("Movies.csv", "r") as f:
    reader = csv.DictReader(f)
    file = list(reader)
    print(file)

with engine.connect() as conn:
    result = conn.execute(insert(MoviesScoreModel),
         file
     )
    conn.commit()
