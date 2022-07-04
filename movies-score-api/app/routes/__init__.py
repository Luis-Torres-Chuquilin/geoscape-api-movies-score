from fastapi import APIRouter
from routes.movies.moviesScore_routes import movie_router


router = APIRouter()
router.include_router(movie_router, prefix='/api', tags=["Movie Score endpoints"])
