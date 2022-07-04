import os 
from fastapi import FastAPI

from routes import router as endpoint_router

# Db Connection & Db Models
from db.connection import engine
from models.movies import moviesScore_models

# Config
from config.metadata import description
# Middlewares
from middleware.cors import init_cors

# Initialize Database Models
moviesScore_models.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Fast API Movies Scores",
    description=description,
    version="0.0.1",
    contact={
        "name": "Luis Torres",
        "email": "letorres.dev@gmail.com",
    },
    license_info={
        "name": "MIT",
    },
)

"""Routes - Movie Score endpoints
"""
app.include_router(endpoint_router)

init_cors(app=app)

@app.get("/", tags=["Healtht check"])
async def root():
    """Home Page
    """
    return {"message": "Welcome to Movies Score API!"}


"""Script to Load the CSV into the database
"""
# os.system('python load_csv.py')