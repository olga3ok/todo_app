FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /app
RUN pip install gunicorn==20.1.0
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000

# CMD ["sh", "-c", "cd backend ; gunicorn --bind 0.0.0.0:8000 backend.wsgi:application"]
CMD ["sh", "-c", "python3 backend/manage.py migrate ; python3 backend/manage.py runserver 0.0.0.0:8000"]

