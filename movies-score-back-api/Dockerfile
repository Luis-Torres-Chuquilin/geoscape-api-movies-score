FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

ENV APP_MODULE main:app

COPY requirements.txt /app

RUN pip install --upgrade pip && \
    pip install -r /app/requirements.txt

COPY ./app /app

# CMD [ "python3", "load_csv.py"]