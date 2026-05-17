FROM python:3.12-slim

WORKDIR /usr/src/app

COPY bot2/python/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY bot2/python ./
COPY ./medal-x86_64-linux-musl ./
COPY ./medal.exe ./

EXPOSE 3000
ENV PORT=3000

CMD ["python", "app.py"]
