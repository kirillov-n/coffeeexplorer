import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../index";
import './ProfileForm.css';

const ProfileForm = ({ userProfile, onUpdate }) => {
  const [formData, setFormData] = useState({
    email: userProfile.email,
    nickname: userProfile.nickname,
    sex: userProfile.sex,
    birthdate: userProfile.birthdate,
    occupation: userProfile.occupation,
    avg_bill: userProfile.avg_bill,
    veg_positions: userProfile.veg_positions || false,
    alt_brewing: userProfile.alt_brewing || false,
    alt_milk: userProfile.alt_milk || false,
    small_pets: userProfile.small_pets || false,
    big_pets: userProfile.big_pets || false,
    food: userProfile.food || false,
    non_coffee_drink: userProfile.non_coffee_drink || false,
    decaf: userProfile.decaf || false,
    wifi: userProfile.wifi || false,
    place_for_work: userProfile.place_for_work || false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nickname) {
      errors.nickname = 'Никнейм обязателен для заполнения';
    }
    // Добавим валидацию других полей по необходимости
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.patch(API_URL + "users/profile/", formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        onUpdate(response.data);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          setFormErrors(error.response.data.errors);
        } else {
          setServerError('Не удалось обновить профиль');
        }
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="profile-form-container">
      <h2>Редактировать профиль</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>
        <div className="form-group">
          <input type="text" id="nickname" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="nickname"/>
          {formErrors.nickname && <span className="error">{formErrors.nickname}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="sex">Пол:</label>
          <select id="sex" name="sex" value={formData.sex} onChange={handleChange}>
            <option value="M">Мужчина</option>
            <option value="W">Женщина</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="birthdate">Дата рождения:</label>
          <input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="occupation">Род занятий:</label>
          <select id="occupation" name="occupation" value={formData.occupation} onChange={handleChange}>
            <option value="RS">Учусь на удаленке</option>
            <option value="NRS">Учусь</option>
            <option value="RW">Работаю на удаленке</option>
            <option value="NRW">Работаю</option>
            <option value="OAR">Отдыхаю</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="avg_bill">Средний чек:</label>
          <input type="number" id="avg_bill" name="avg_bill" value={formData.avg_bill} onChange={handleChange} placeholder="Сколько вы готовы потратить?"/>
        </div>
        <div className="form-group">
          <p>Что про тебя или нужно тебе в кофейне</p>
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="veg_positions">Я веган</label>
          <input type="checkbox" id="veg_positions" name="veg_positions" checked={formData.veg_positions} onChange={handleChange} />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="alt_brewing">Альтернативное заваривание</label>
          <input type="checkbox" id="alt_brewing" name="alt_brewing" checked={formData.alt_brewing} onChange={handleChange} />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="alt_milk">Альтернативное молоко</label>
          <input type="checkbox" id="alt_milk" name="alt_milk" checked={formData.alt_milk} onChange={handleChange} />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="small_pets">Маленькая собака</label>
          <input type="checkbox" id="small_pets" name="small_pets" checked={formData.small_pets} onChange={handleChange} />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="big_pets">Больая собака</label>
          <input type="checkbox" id="big_pets" name="big_pets" checked={formData.big_pets} onChange={handleChange} />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="food">Кухня</label>
          <input type="checkbox" id="food" name="food" checked={formData.food} onChange={handleChange} />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="non_coffee_drink">Не кофейные напитки</label>
          <input type="checkbox" id="non_coffee_drink" name="non_coffee_drink" checked={formData.non_coffee_drink} onChange={handleChange} />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="decaf">Декаф</label>
          <input type="checkbox" id="decaf" name="decaf" checked={formData.decaf} onChange={handleChange} />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="wifi">Wi-Fi</label>
          <input type="checkbox" id="wifi" name="wifi" checked={formData.wifi} onChange={handleChange} />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="place_for_work">Поработать</label>
          <input type="checkbox" id="place_for_work" name="place_for_work" checked={formData.place_for_work} onChange={handleChange} />
        </div>
        <div className="form-group">
          <button type="submit">Сохранить</button>
        </div>
      </form>
      {serverError && <div className="error">{serverError}</div>}
    </div>
  );
};

export default ProfileForm;
