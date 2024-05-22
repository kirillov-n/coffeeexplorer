import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../index";
import "./Details.css";
import ReviewList from "../appReview/ReviewList";
import ReviewForm from "../appReview/ReviewForm";
import HeartIcon from "../../media/heart.svg";
import HeartIconFilled from "../../media/heart_filled.svg";

const Details = () => {
    const { establishmentID } = useParams();
    const [establishment, setEstablishment] = useState(null);
    const [closeEstablishments, setCloseEstablishments] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        fetchUserProfile();
    }, []);

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
        const fetchCloseEstablishmentsData = async () => {
            try {
                const closeEstablishmentIds = establishment?.close || [];
                const closeEstablishmentData = await Promise.all(closeEstablishmentIds.map(async (id) => {
                    const response = await fetch(`${API_URL}coffeeexplorer_app/establishments/${id}/`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch close establishment data');
                    }
                    return response.json();
                }));
                setCloseEstablishments(closeEstablishmentData);
            } catch (error) {
                console.error('Error fetching close establishment data:', error);
            }
        };

        fetchCloseEstablishmentsData();
    }, [establishment]);

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

    const handleFavoriteClick = async () => {
        if (!isAuthenticated || !userProfile) return;
    
        try {
            const token = localStorage.getItem('accessToken');
            const establishmentUrl = `${API_URL}coffeeexplorer_app/establishments/${establishmentID}/`;
    
            const updatedFavorites = userProfile.favourites.map(url => {
                // Если уже URL, возвращаем его, иначе формируем URL из числового значения
                return typeof url === 'string' ? url : `${API_URL}coffeeexplorer_app/establishments/${url}/`;
            });
    
            const index = updatedFavorites.indexOf(establishmentUrl);
            if (index !== -1) {
                updatedFavorites.splice(index, 1); // Удаляем избранное, если уже в списке
            } else {
                updatedFavorites.push(establishmentUrl); // Добавляем в избранное, если отсутствует
            }
            
            const response = await axios.patch(`${API_URL}users/users/${userProfile.userID}/`, { favourites: updatedFavorites }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            if (response.status === 200) {
                setUserProfile({ ...userProfile, favourites: updatedFavorites });
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };
    
    const renderCloseEstablishments = () => {
        if (!closeEstablishments || closeEstablishments.length === 0) return null;

        return (
            <div className="close-establishments-container">
                <h2 className="close-establishments-heading">Похожие заведения:</h2>
                <div className="close-establishments">
                    {closeEstablishments.map((establishment) => (
                        <Link to={`/details/${establishment.establishmentID}`} key={establishment.establishmentID} className="close-establishment-link">
                            <div className="close-establishment-card">
                                <img src={establishment.picture} alt={establishment.name} className="close-establishment-image" />
                                <p className="close-establishment-name">{establishment.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="details-container">
            {establishment ? (
                <div className="establishment-details">
                    <div className="establishment-header">
                        <h1 className="establishment-name">{establishment.name}</h1>
                        {isAuthenticated && userProfile && (
                            <button className="favorite-button" onClick={handleFavoriteClick}>
                                <img
                                    src={userProfile.favourites.includes(`${API_URL}coffeeexplorer_app/establishments/${establishmentID}/`) ? HeartIconFilled : HeartIcon}
                                    alt="Favorite"
                                    className="favorite-icon"
                                />
                            </button>
                        )}
                    </div>
                    <div className="info">
                        <img src={establishment.picture} alt={establishment.name} className="main-establishment-image" />
                        <div>
                            <p className="establishment-description">{establishment.description}</p>
                            <p className="address-details">
                                {establishment.address.city.name}, ст. метро {establishment.address.metro_station.name},{" "}
                                {establishment.address.street} {establishment.address.building}
                            </p>
                            <div className="establishment-features">
                                <div>
                                    <p>Средний чек: {establishment.avg_bill}₽</p>
                                    <p>Веганское меню: {establishment.veg_positions ? "Да" : "Нет"}</p>
                                    <p>Альтернативные методы заваривания: {establishment.alt_brewing ? "Да" : "Нет"}</p>
                                    <p>Альтернативное молоко: {establishment.alt_milk ? "Да" : "Нет"}</p>
                                    <p>
                                        Догфрендли:{" "}
                                        {establishment.small_pets && establishment.big_pets
                                            ? "Можно с маленькими и большими собаками"
                                            : establishment.small_pets
                                            ? "Можно с маленькими собаками"
                                            : establishment.big_pets
                                            ? "Можно с большими собаками"
                                            : "Нет"}
                                    </p>

                                    <p>Кухня: {establishment.food ? "Да" : "Нет"}</p>
                                </div>
                                <div>
                                    <p>Не кофейные напитки: {establishment.non_coffee_drink ? "Да" : "Нет"}</p>
                                    <p>Кофе без кофеина: {establishment.decaf ? "Да" : "Нет"}</p>
                                    <p>Wi-Fi: {establishment.wifi ? "Да" : "Нет"}</p>
                                    <p>Места для работы: {establishment.place_for_work ? "Да" : "Нет"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Кнопка открытия на карте */}
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
                    <div>
                    {/* Похожие заведения */}
                        {renderCloseEstablishments()}
                    </div>
                    {/* Форма для отправки отзыва */}
                    {isAuthenticated && userProfile && (
                        <div className="review-form-container">
                            <ReviewForm establishmentID={establishmentID} isAuthenticated={isAuthenticated} user={userProfile} onReviewSubmit={handleReviewSubmit} />
                        </div>
                    )}
                    {/* Список отзывов */}
                    <h2 className="review-list-header">Отзывы</h2>
                    <div className="review-list">
                        <ReviewList establishmentID={establishmentID} />
                    </div>
                </div>
            ) : (
                <p className="loading-message">Загрузка данных...</p>
            )}
        </div>
    );
};

export default Details;
