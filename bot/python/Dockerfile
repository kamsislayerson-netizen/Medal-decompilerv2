FROM python:3.12-slim

WORKDIR /usr/src/app

COPY bot/python/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY bot/python ./
COPY ./medal-x86_64-linux-musl ./

EXPOSE 3000
ENV PORT=3000
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

CMD ["python", "app.py"]
