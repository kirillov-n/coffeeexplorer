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
                                <p className="user-nickname">Пользователь: {review.user.nickname}</p>
                                <p>Рейтинг: {review.rating}</p>
                                <p>{review.body}</p>
                                {review.picture && (
                                    <div>
                                        <img src={review.picture} alt="Отзыв" className="review-image" />
                                    </div>
                                )}
                                <p>Дата создания: {new Date(review.time_created).toLocaleString()}</p>
                                {review.time_edited && review.time_created !== review.time_edited && (
                                    <p>Дата редактирования: {new Date(review.time_edited).toLocaleString()}</p>
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
