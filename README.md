# ToDo App

## Описание
Это приложение ToDo, созданное с использованием Django DRF для backend и React для frontend.

## Технологии
- **Backend**: Django, Django REST Framework, PostgreSQL
- **Frontend**: React, Axios

## Возможности
- Создание, редактирование и удаление задач.
- Создание и удаление категорий задач.
- Фильтрация задач по статусу (выполнено/не выполнено).
- Интерфейс администратора Django для управления данными.

## Установка:
### Backend (Django)
1. Клонируйте репозиторий:
```
git clone git@github.com:olga3ok/todo_app.git
```
2. Перейдите в директорию проекта:
```
cd todo_app
```
3. Создайте и активируйте виртуальное окружение:
```
python -m venv venv
source venv/bin/activate
```
4. Установите зависимости:
```
pip install -r requirements.txt
```
## Frontend (React)
1. Перейдите в директорию frontend:
```
cd frontend
```
2. Установите зависимости:
```
npm install
```
## Запуск приложения:
### Backend (Django)
1. Перейдите в директорию todo_app/backend и создайте файл .env с настройками базы данных и django для проекта:
```
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
SECRET_KEY=
DEBUG=
```
2. Примените миграции:
```
python manage.py makemigrations
python manage.py migrate
```
3. Запустите сервер:
```
python manage.py runserver
```
### Frontend (React)
1. Перейдите в директорию todo_app/frontend и запустите сервер:
```
npm start
```

Backend будет доступен по адресу http://localhost:8000, а frontend по адресу http://localhost:3000.


