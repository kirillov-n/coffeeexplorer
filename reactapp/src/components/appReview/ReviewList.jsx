import React, { useEffect, useState } from "react";
import { API_URL } from "../../index";
import "./ReviewList.css";

const ReviewList = ({ establishmentID }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${API_URL}users/posts/?establishment=${establishmentID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                // Сортируем отзывы по убыванию даты создания
                const sortedReviews = data.sort((a, b) => new Date(b.time_created) - new Date(a.time_created));
                setReviews(sortedReviews);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [establishmentID]);

    const renderStars = (rating) => {
        const totalStars = 5;
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>&#9733;</span>
            );
        }

        return <div className="rating">{stars}</div>;
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options).replace(' г.', '');
    };

    return (
        <div className="review-list-container">
            <h2 className="review-list-header">Отзывы</h2>
            {loading ? (
                <p>Загрузка отзывов...</p>
            ) : (
                <ul className="review-list">
                    {reviews.map(review => (
                        <li key={review.PostID} className="review-item">
                            <div>
                                <p className="user-nickname">{review.user.nickname}</p>
                                <p className="date">{formatDate(review.time_created)}</p>
                                <div className="review-rating">{renderStars(review.rating)}</div>
                                <p>{review.body}</p>
                                {review.picture && (
                                    <div>
                                        <img src={review.picture} alt="Отзыв" className="review-image" />
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;
