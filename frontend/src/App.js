import React, { useEffect, useState, useCallback } from 'react';
import api, { getTodos } from './api';
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'not_completed'

  // Получение задач
  const fetchTodos = useCallback( async () => {
    try {
      let response;
      if (filter === 'all') {
        response = await api.get('todos/');
      } else {
        response = await getTodos(filter === 'completed');
      }
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, [filter]);

  // Получение категорий
  const fetchCategories = useCallback( async () => {
    try {
      let response;
      response = await api.get('categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  // Загрузка задач и категорий при монтировании компонента
  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, [fetchTodos]);

  // Добавление новой задачи
  const addTodo = async () => {
    if (!title || !description || !dueDate || !categoryId) {
      alert('All fields are required');
      return;
    }

    const formattedDueDate = dueDate.split('T')[0]; // YYYY-MM-DD
    const category = categories.find(cat => cat.id === parseInt(categoryId));

    if (!category) {
      alert('Invalid category');
      return;
    }

    try {
      const response = await api.post('todos/', {
        title,
        description,
        due_date: formattedDueDate,
        completed: false,
        category: { id: category.id, name: category.name } // Словарь категории
      });
      setTodos([...todos, response.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
      setCategoryId('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Добавление новой категории
  const addCategory = async () => {
    if (!categoryName) {
      alert('Category name is required');
      return;
    }

    try {
      const response = await api.post('categories/', {
        name: categoryName
      });
      setCategories([...categories, response.data]);
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Удаление задачи
  const deleteTodo = async (id) => {
    try {
      await api.delete(`todos/${id}/`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Удаление категории
  const deleteCategory = async (id) => {
    try {
      await api.delete(`categories/${id}/`);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Переключение статуса задачи (completed / not completed)
  const toggleComplete = async (id) => {
    try {
      const todo = todos.find(todo => todo.id === id);
      const response = await api.patch(`todos/${id}/`, {
        completed: !todo.completed
      });
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Todo</h2>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <select className="form-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-success" onClick={addTodo}>Add Todo</button>
      </form>

      <h1 className="mb-4 mt-5">Todo List</h1>
      <div className="mb-3">
        <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not_completed">Not Completed</option>
        </select>
      </div>
      <ul className="list-group mb-4">
        {todos.map(todo => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span>{todo.title} - {todo.description} - {todo.due_date} - {todo.completed ? 'Completed' : 'Not Completed'} - {todo.category ? todo.category.name : 'No Category'}</span>
            <div>
              <button className="btn btn-danger btn-sm me-2" onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button className="btn btn-primary btn-sm" onClick={() => toggleComplete(todo.id)}>
                {todo.completed ? 'Mark as Not Completed' : 'Mark as Completed'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h1 className="mb-4 mt-5">Categories</h1>
      <ul className="list-group mb-4">
        {categories.map(category => (
          <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
            {category.name}
            <button className="btn btn-danger btn-sm" onClick={() => deleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2 className="mb-4 mt-5">Add Category</h2>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-success" onClick={addCategory}>Add Category</button>
      </form>
    </div>
  );
};

export default App;


