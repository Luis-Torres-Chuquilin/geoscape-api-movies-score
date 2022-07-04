from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database

# Configs
from config.settings import Settings

settings = Settings()

SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{settings.database_user}:{settings.database_pass}@{settings.database_url}/{settings.database_name}"

# Connect to the database
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, future=True
)

if not database_exists(engine.url):
    create_database(engine.url)

# Session serve as a way to communicate with the database
SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, future=True
)

# Base class -> allow to map tables created with the class Base
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

