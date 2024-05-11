import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../index";


const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Получаем токен из localStorage
        const response = await axios.get(API_URL + "users/profile/", {
          headers: {
            Authorization: `Bearer ${token}` // Передаем токен в заголовке запроса
          }
        });
        setUserProfile(response.data); // Сохраняем данные профиля пользователя в state
      } catch (error) {
        setError(error); // Сохраняем ошибку, если запрос не удался
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>Error fetching user profile: {error.message}</div>; // Обработка ошибки
  }

  if (!userProfile) {
    return <div>Loading...</div>; // Отображение загрузки, пока происходит запрос
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {userProfile.email}</p>
      <p>Nickname: {userProfile.nickname}</p>
      {/* Дополнительная информация о пользователе */}
    </div>
  );
};

export default UserProfile;
