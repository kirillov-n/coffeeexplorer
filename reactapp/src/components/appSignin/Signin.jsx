import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../index";

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL + "users/signin/", formData);
      console.log('Login successful:', response.data);

      // Сохраняем токен доступа в localStorage
      localStorage.setItem('accessToken', response.data.access);

      // Опционально: сохраняем токен обновления в localStorage
      localStorage.setItem('refreshToken', response.data.refresh);

      // Здесь можно реализовать редирект пользователя на другую страницу или выполнить другие действия после успешного входа
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Обработка ошибки входа, например, отображение сообщения об ошибке пользователю
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password" // Добавляем атрибут autoComplete
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SigninForm;
