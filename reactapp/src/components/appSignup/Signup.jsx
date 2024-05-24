import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../index";
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        nickname: '',
        sex: '',
        birthdate: '',
        occupation: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL + "users/signup/", formData);
            console.log('Пользователь успешно зарегестрирован:', response.data);
            navigate('/signin');
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            setError('Ошибка регистрации. Пожалуйста, проверьте введенные данные.');
        }
    };

    return (
        <div className="signup-form-container">
            <div className="signup-form">
                <h2>Регистрация</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Электронная почта" required autoComplete="email" />
                    <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="Никнейм" required autoComplete="nickname" />
                    <select name="sex" value={formData.sex} onChange={handleChange} required>
                        <option value="">Выберите пол</option>
                        <option value="M">Мужской</option>
                        <option value="W">Женский</option>
                    </select>
                    <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
                    <select name="occupation" value={formData.occupation} onChange={handleChange} required>
                        <option value="">Выберите ваш тип занятости</option>
                        <option value="RS">Студент на удаленке</option>
                        <option value="NRS">Студент</option>
                        <option value="RW">Работник на удаленке</option>
                        <option value="NRW">Работник</option>
                        <option value="OAR">Отдыхаю</option>
                    </select>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" required autoComplete="new-password" />
                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
