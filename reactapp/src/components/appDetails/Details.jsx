import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../index";
import "./Details.css"; // Импорт файла стилей

const Details = () => {
  const { establishmentID } = useParams();
  const [establishment, setEstablishment] = useState(null);

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

  return (
    <div className="details-container">
      <Link to="/" className="back-button">
        Назад
      </Link>
      {establishment ? (
        <div className="establishment-details">
          <h1 className="establishment-name">{establishment.name}</h1>
          <img src={establishment.picture} alt={establishment.name} className="establishment-image" />
          <p className="establishment-description">{establishment.description}</p>
          <h2 className="address-heading">Адрес</h2>
          <p className="address-details">
            {establishment.address.city.name}, ст. метро {establishment.address.metro_station.name},{" "}
            {establishment.address.street} {establishment.address.building}
          </p>
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
          <div className="establishment-features">
            <p>Средний чек: {establishment.avg_bill}₽</p>
            <p>Позиции для вегетарианцев: {establishment.veg_positions ? "Да" : "Нет"}</p>
            <p>Альтернативные методы заваривания: {establishment.alt_brewing ? "Да" : "Нет"}</p>
            <p>Альтернативное молоко: {establishment.alt_milk ? "Да" : "Нет"}</p>
            <p>Прием питомцев: {establishment.pets ? "Да" : "Нет"}</p>
            <p>Еда: {establishment.food ? "Да" : "Нет"}</p>
            <p>Не кофейные напитки: {establishment.non_coffee_drink ? "Да" : "Нет"}</p>
            <p>Кофе без кофеина: {establishment.decaf ? "Да" : "Нет"}</p>
            <p>Wi-Fi: {establishment.wifi ? "Да" : "Нет"}</p>
            <p>Место для работы: {establishment.place_for_work ? "Да" : "Нет"}</p>
            <p>Похожие: {establishment.close}</p>
          </div>
        </div>
      ) : (
        <p className="loading-message">Загрузка данных...</p>
      )}
    </div>
  );
};

export default Details;
