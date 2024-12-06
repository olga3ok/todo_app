FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR .
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000

# CMD python3 backend/manage.py runserver 0.0.0.0:8000 

