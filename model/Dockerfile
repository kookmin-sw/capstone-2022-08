FROM python:3.10

WORKDIR /app

COPY requirements.txt .
COPY app.py .

RUN pip install -r requirements.txt

ENTRYPOINT [ "uvicorn" ]
CMD ["--port", "1366", "app:app"]
