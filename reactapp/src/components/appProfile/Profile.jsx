import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../index";
import ProfileForm from './ProfileForm'; // Импортируем компонент формы

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(API_URL + "users/profile/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserProfile(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile); // Обновляем данные профиля после успешного обновления
  };

  if (error) {
    return <div>Error fetching user profile: {error.message}</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Привет, {userProfile.nickname}</p>
      {/* Отображение другой информации о профиле */}
      <ProfileForm userProfile={userProfile} onUpdate={handleProfileUpdate} />
    </div>
  );
};

export default UserProfile;
