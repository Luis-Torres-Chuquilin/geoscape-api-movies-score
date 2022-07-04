import pytest

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database
from app.main import app
from db.connection import get_db , Base
from services.movies.moviesScore_service import create_movie_score


from config.settings import Settings

settings = Settings()
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{settings.database_user}:{settings.database_pass}@{settings.database_url}/test_db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL 
)

if not database_exists(engine.url):
    create_database(engine.url)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture()
def session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()

@pytest.fixture()
def client(session):
    # Dependency override
    def override_get_db():
        try:
            yield session
        finally:
            session.close()
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)

def test_movie_score_get_all(client):
    res = client.get("/api/movies_score")
    assert res.status_code == 200

def test_movie_score_get_one(client):
    res = client.get("/api/movie_score/?movie_name=string&movie_provider=string")
    assert res.status_code == 404
    assert res.json()['detail'] == "Movie not found"


def test_create_todos(client):
    res = client.post("/api/movie_score", json={"movie": "Geoscape", "provider": "Australia", "score": 9.3})
    assert res.status_code == 201
    res = client.post("/api/movie_score", json={"movie": "Geoscape", "provider": "Australia", "score": 9.3})
    assert res.status_code == 400
    assert res.json()['detail'] == "Movie is already registered"
