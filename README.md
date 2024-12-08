# ToDo App

## Описание
ToDo App — это приложение для управления задачами, построенное с использованием Django DRF для backend и React для frontend.

## Использованные технологии
- **Backend**: Django, Django REST Framework, PostgreSQL
- **Frontend**: React, Axios
- **Контейнеризация**: Docker, Docker Compose
- **Управление зависимостями**: pip (Python), npm (JavaScript)

## Возможности
- Создание, редактирование и удаление задач
- Создание и удаление категорий задач
- Фильтрация задач по статусу (выполнено/не выполнено)

## Установка

1. Клонируйте репозиторий:
   ```
   git clone git@github.com:olga3ok/todo_app.git
   ```
   2. Перейдите в директорию проекта и создайте файл .env с настройками Django и PostreSQL:
      ```
      DB_NAME=
      DB_USER=
      DB_PASSWORD=
      DB_HOST=      # Для запуска при помощи Docker укажите "db"
      DB_PORT=5432
      SECRET_KEY=
      DEBUG=
      ```
## Запуск
### Docker
```
docker-compose up --build
```
Приложение будет доступно по адресу http://localhost:3000
### Backend
```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python backend/manage.py migrate
python backend/manage.py runserver
```
### Frontend
```
cd frontend
npm install
npm run build
npm start
```
Backend будет доступен по адресу http://localhost:8000, а frontend по адресу http://localhost:3000.
