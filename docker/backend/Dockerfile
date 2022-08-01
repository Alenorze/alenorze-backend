FROM python:3.10

WORKDIR /code

RUN apt update && apt -qy upgrade

COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY . /code/

WORKDIR /code/backend
