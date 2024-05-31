FROM openjdk:11.0.12-slim-bullseye


RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /comets
COPY ./cometspy .
RUN cd cometspy
RUN pip3 install .


WORKDIR /app

COPY . .

ENV PYTHONUNBUFFERED=1

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python3", "./app.py"]
