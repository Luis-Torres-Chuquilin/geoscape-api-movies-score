from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


def init_cors(app: FastAPI) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

