import React from "react";
import "./Rating.css"; // Подключаем стили

const Rating = ({ value, onClick }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="rating">
            {stars.map((star) => (
                <span
                    key={star}
                    className={star <= value ? "star filled" : "star"}
                    onClick={() => onClick(star)}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default Rating;
