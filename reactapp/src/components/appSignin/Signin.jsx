import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../index";
import { useNavigate } from 'react-router-dom';
import './Signin.css'; // Подключаем файл стилей

const SigninForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL + "users/signin/", formData);
      console.log('Login successful:', response.data);

      // Вызов функции входа с передачей токена доступа
      onLogin(response.data.access);

      // Перенаправление на главную страницу
      navigate('/');

      // Cохраняем токен обновления в localStorage
      localStorage.setItem('refreshToken', response.data.refresh);

    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Обработка ошибки входа
      setError('Неправильный пароль или email');
    }
  };

  return (
    <div className="signin-form-container">
      <div className="signin-form">
        <h2>Вход</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              placeholder="Электронная почта"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              placeholder="Пароль"
            />
          </div>
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
