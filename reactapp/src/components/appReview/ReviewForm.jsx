import React, { useState } from "react";
import "./ReviewForm.css";
import Rating from "./Rating";

const ReviewForm = ({ establishmentID, isAuthenticated, user, onReviewSubmit }) => {
    const [formData, setFormData] = useState({
        picture: null,
        rating: 1,
        body: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRatingChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            rating: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            picture: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Проверка на аутентификацию перед отправкой данных
        if (!isAuthenticated) {
            console.log("Пользователь не аутентифицирован");
            return;
        }
        // Получаем информацию о пользователе из localStorage
        // Создание объекта FormData для отправки формы
        const formDataToSend = new FormData();
        formDataToSend.append("rating", formData.rating);
        formDataToSend.append("body", formData.body);
        formDataToSend.append("establishmentID", establishmentID);
        formDataToSend.append("userID", user.userID);

        // Добавляем изображение в FormData, если оно было прикреплено
        if (formData.picture) {
            formDataToSend.append("picture", formData.picture);
        }

        // Отправка данных на сервер
        console.log("Отправляем данные на сервер:", formDataToSend);
        onReviewSubmit(formDataToSend)
            .then(() => {
                // После успешной отправки формы обновляем страницу
                window.location.reload();
            })
            .catch((error) => {
                // Обработка ошибки, если не удалось отправить данные на сервер
                console.error('Ошибка при отправке данных:', error);
            });

        // Сброс формы после отправки
        setFormData({
            picture: null,
            rating: 1,
            body: "",
        });
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h2>Как вам это место?</h2>
            <div className="form-group">
                <Rating value={formData.rating} onClick={handleRatingChange} />
            </div>
            <div className="form-group">
                <input
                    type="file"
                    id="picture"
                    name="picture"
                    accept="image/*"
                    onChange={handleFileChange}
                    placeholder="Изображение"
                />
            </div>
            <div className="form-group">
                <textarea
                    id="body"
                    name="body"
                    rows="4"
                    value={formData.body}
                    onChange={handleChange}
                    required
                    placeholder="Опишите плюсы и минусы"
                ></textarea>
            </div>
            <button type="submit">Отправить</button>
        </form>
    );
};

export default ReviewForm;
