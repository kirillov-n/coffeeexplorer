import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../index";
import ProfileForm from './ProfileForm';
import './Profile.css';

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
    return <div className="error-message">Ошибка при загрузке профиля: {error.message}</div>;
  }

  if (!userProfile) {
    return <div className="loading-message">Загрузка...</div>;
  }

  return (
    <div className="user-profile">
      <h1 className="profile-title">Привет, {userProfile.nickname}</h1>
      <ProfileForm userProfile={userProfile} onUpdate={handleProfileUpdate} />
    </div>
  );
};

export default UserProfile;
