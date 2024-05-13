import React, { useState } from "react";

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
      // const user = JSON.parse(localStorage.getItem('user'));
      // Создание объекта FormData для отправки формы
      const formDataToSend = new FormData();
      formDataToSend.append("rating", formData.rating);
      formDataToSend.append("body", formData.body);
      formDataToSend.append("establishmentID", establishmentID);
      formDataToSend.append("userID", user.userID);

      // Добавляем изображение в FormData, если оно было выбрано
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
            <h2>Написать отзыв</h2>
            <div className="form-group">
                <label htmlFor="rating">Рейтинг:</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="body">Текст:</label>
                <textarea
                    id="body"
                    name="body"
                    rows="4"
                    value={formData.body}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="picture">Изображение:</label>
                <input
                    type="file"
                    id="picture"
                    name="picture"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit">Отправить отзыв</button>
        </form>
    );
};

export default ReviewForm;
