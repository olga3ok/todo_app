import axios from 'axios';


// Экземпляр Axios с базовым URL и заголовком
const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTodos = (completed) => {
    return api.get(`todos/?search=${completed}`);
};

export default api;