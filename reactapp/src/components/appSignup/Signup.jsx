import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../index";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        nickname: '',
        sex: '',
        birthdate: '',
        occupation: '',
        password: '', // Добавляем поле для пароля
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(API_URL + "users/signup/", formData);
          console.log('User registered successfully:', response.data);
          // Redirect to login page or handle success in some other way
        } catch (error) {
          console.error('Registration failed:', error.response.data);
          // Handle registration error (e.g., display error message)
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required autoComplete="email" />
          <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="Nickname" required autoComplete="nickname" />
          <select name="sex" value={formData.sex} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} placeholder="Birthdate" required />
          <select name="occupation" value={formData.occupation} onChange={handleChange} required>
            <option value="">Select Occupation</option>
            <option value="RS">Remote Student</option>
            <option value="NRS">Student</option>
            <option value="RW">Remote Worker</option>
            <option value="NRW">Worker</option>
            <option value="OAR">On a break</option>
          </select>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required autoComplete="new-password" />
          <button type="submit">Register</button>
        </form>
      );
    };

export default SignupForm;
