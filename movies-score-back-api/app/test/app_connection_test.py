import asyncio

import httpx
import pytest
import pytest_asyncio   # allow to write asynchronous test 
from asgi_lifespan import LifespanManager # starup and shutdownd events 
from fastapi import status

from app.main import app

@pytest.fixture(scope="session")
def event_loop():    # required by pytest-asyncio 
    loop = asyncio.get_event_loop()
    yield loop
    loop.close()

@pytest_asyncio.fixture
async def test_client():
    async with LifespanManager(app):
        async with httpx.AsyncClient(app=app, base_url="http://localhost:8000/") as test_client:
            yield test_client


@pytest.mark.asyncio
async def test_init_server(test_client: httpx.AsyncClient):
    response = await test_client.get("/")
    assert response.status_code == status.HTTP_200_OK
    json = response.json()
    assert json == {"message": "Welcome to Movies Score API!"}

@pytest.mark.asyncio
async def test_get_movieScore(test_client: httpx.AsyncClient):
    response = await test_client.get("/api/movie_score/?movie_name=Rambo&movie_provider=IMDB")
    assert response.status_code == status.HTTP_200_OK
    json = response.json()
    assert json == {"score": 7.7}

