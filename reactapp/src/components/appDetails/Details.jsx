import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Импортируем axios
import { API_URL } from "../../index";
import "./Details.css";
import ReviewList from "../appReview/ReviewList";
import ReviewForm from "../appReview/ReviewForm";

const Details = () => {
    const { establishmentID } = useParams();
    const [establishment, setEstablishment] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null); // Состояние для профиля пользователя
    const [error, setError] = useState(null); // Состояние для ошибки

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`${API_URL}users/profile/`, {
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
    }, []); // Пустой массив зависимостей, чтобы useEffect вызывался только один раз при монтировании компонента

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}coffeeexplorer_app/establishments/${establishmentID}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setEstablishment(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [establishmentID]);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleReviewSubmit = async (reviewData) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(`${API_URL}users/posts/`, reviewData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            if (!response.data.success) {
                throw new Error('Failed to submit review');
            }
            console.log("Отзыв успешно отправлен на сервер");
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="details-container">
            {establishment ? (
                <div className="establishment-details">
                    <h1 className="establishment-name">{establishment.name}</h1>
                    <div className="info">
                        <img src={establishment.picture} alt={establishment.name} className="establishment-image" />
                        <div>
                            <p className="establishment-description">{establishment.description}</p>
                            <p className="address-details">
                                {establishment.address.city.name}, ст. метро {establishment.address.metro_station.name},{" "}
                                {establishment.address.street} {establishment.address.building}
                            </p>
                            <div className="establishment-features">
                                <div>
                                    <p>Средний чек: {establishment.avg_bill}₽</p>
                                    <p>Позиции для вегетарианцев: {establishment.veg_positions ? "Да" : "Нет"}</p>
                                    <p>Альтернативные методы заваривания: {establishment.alt_brewing ? "Да" : "Нет"}</p>
                                    <p>Альтернативное молоко: {establishment.alt_milk ? "Да" : "Нет"}</p>
                                    <p>Прием питомцев: {establishment.pets ? "Да" : "Нет"}</p>
                                    <p>Еда: {establishment.food ? "Да" : "Нет"}</p>
                                </div>
                                <div>
                                    <p>Не кофейные напитки: {establishment.non_coffee_drink ? "Да" : "Нет"}</p>
                                    <p>Кофе без кофеина: {establishment.decaf ? "Да" : "Нет"}</p>
                                    <p>Wi-Fi: {establishment.wifi ? "Да" : "Нет"}</p>
                                    <p>Место для работы: {establishment.place_for_work ? "Да" : "Нет"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="map-button-container">
                        <button
                            className="map-button"
                            onClick={() => {
                                const mapUrl = `https://yandex.ru/maps/?rtext=~${establishment.address.latitude}%2C${establishment.address.longitude}`;
                                window.open(mapUrl, "_blank");
                            }}
                        >
                            Открыть на картах Яндекс
                        </button>
                    </div>
                    <div className="recomendations">Похожие: {establishment.close}</div>
                    {isAuthenticated && userProfile && (
                        <ReviewForm establishmentID={establishmentID} isAuthenticated={isAuthenticated} user={userProfile} onReviewSubmit={handleReviewSubmit} />
                    )}
                    <ReviewList establishmentID={establishmentID} />
                </div>
            ) : (
                <p className="loading-message">Загрузка данных...</p>
            )}
        </div>
    );
};

export default Details;
