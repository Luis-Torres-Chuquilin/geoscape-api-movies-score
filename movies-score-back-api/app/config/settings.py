from pydantic import BaseSettings

class Settings(BaseSettings):
    environment: str
    database_url: str
    database_user: str
    database_pass: str
    database_name: str
    class Config:
        env_file = ".env"