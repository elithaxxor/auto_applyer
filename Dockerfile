FROM python:3.10-slim
WORKDIR /app
COPY . .
RUN pip install poetry && poetry install --no-interaction --no-dev
CMD ["poetry", "run", "uvicorn", "api.server:app", "--host", "0.0.0.0", "--port", "8000"]
