import React, { useEffect, useState } from "react";
import { API_URL } from "../../index";

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
                setReviews(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [establishmentID]);

    return (
        <div className="review-list">
            <h2>Отзывы</h2>
            {loading ? (
                <p>Загрузка отзывов...</p>
            ) : (
                <ul>
                    {reviews.map(review => (
                        <li key={review.PostID}>
                            <p>Пользователь: {review.user.nickname}</p>
                            <p>Рейтинг: {review.rating}</p>
                            <p>Текст: {review.body}</p>
                            {review.picture && (
                                <div>
                                    <p>Изображение:</p>
                                    <img src={review.picture} alt="Отзыв" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;
