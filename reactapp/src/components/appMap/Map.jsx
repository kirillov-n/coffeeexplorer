import React, { useState, useEffect } from "react";
import { YMaps, Map, GeolocationControl, ObjectManager, Placemark } from "@pbe/react-yandex-maps";
import axios from "axios";
import { API_URL } from "../../index";
import "./Map.css";
import dotenv from "dotenv";
import coffeeIcon from "../../media/Cup.svg";

dotenv.config();

const App = () => {
  const [objectManagerFeatures, setObjectManagerFeatures] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [geolocationClicked, setGeolocationClicked] = useState(false);
  const [recEstablishments, setRecEstablishments] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userID, setUserID] = useState(null);
  const [filterByLocation, setFilterByLocation] = useState(false);
  const [radius, setRadius] = useState(1000); // Радиус в метрах

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        const response = await axios.get(`${API_URL}users/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setIsAuthorized(true);
          setUserID(response.data.userID);
          setRecommendations(response.data.recommendations || []);
        }
      } catch (error) {
        console.error('Ошибка при проверке авторизации:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchRecEstablishmentsData = async () => {
      try {
        const recEstablishmentData = await Promise.all(recommendations.map(async (id) => {
          const response = await fetch(`${API_URL}coffeeexplorer_app/establishments/${id}/`);
          if (!response.ok) {
            throw new Error('Ошибка при получении данных о рекомендациях');
          }
          return response.json();
        }));
        setRecEstablishments(recEstablishmentData);
      } catch (error) {
        console.error('Ошибка при получении данных о рекомендациях:', error);
      }
    };

    fetchRecEstablishmentsData();
  }, [recommendations]);

  useEffect(() => {
    axios.get(`${API_URL}coffeeexplorer_app/establishments/`)
      .then(response => {
        const formattedData = response.data.map(establishment => ({
          id: establishment.establishmentID,
          name: establishment.name,
          shortName: establishment.name,
          description: establishment.description,
          services: '',
          infrastructure: '.',
          address: `${establishment.address.street} ${establishment.address.building}`,
          coordinates: [establishment.address.latitude, establishment.address.longitude],
          picture: establishment.picture,
        }));
        setObjectManagerFeatures(formattedData);
      })
      .catch(error => console.error('Ошибка:', error));
  }, []);

  const handleGeolocationClick = () => {
    setGeolocationClicked(true);
    console.log("Кнопка геолокации нажата");
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("Геолокация пользователя определена:", position);
        setUserLocation({
          coordinates: [position.coords.latitude, position.coords.longitude]
        });
      },
      error => {
        console.error('Ошибка при получении местоположения пользователя:', error);
      }
    );
  };

  useEffect(() => {
    if (geolocationClicked && userLocation) {
      console.log("Геолокация пользователя:", userLocation.coordinates);
    }
  }, [userLocation, geolocationClicked]);

  const objectManagerData = {
    type: 'FeatureCollection',
    features: objectManagerFeatures.map((point, index) => ({
      type: 'Feature',
      id: index,
      geometry: {
        type: 'Point',
        coordinates: point.coordinates,
      },
      properties: {
        hintContent: point.shortName,
        balloonContent:
          `
          <div class="balloon-content">
            <div class="balloon-content__title">${point.name}</div>
            <div class="balloon-content__img">
            <img src= "${point.picture}" width="100" height="111" alt="${point.name}"></img>
            </div>
            <div class="balloon-content__descr">
              <p>${point.description}</p>
            </div>
            <a href='/details/${point.id}'>
              <button class="balloon-content__btn">
                Подробнее
              </button>
            </a>
          </div>     
        `,
      },
    })),
  };

  const toggleFilterByLocation = () => {
    setFilterByLocation(prev => !prev);
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value * 1000); // Конвертируем километры в метры
  };

  const getFilteredRecEstablishments = () => {
    if (!filterByLocation || !userLocation) return recEstablishments;

    const filtered = recEstablishments.filter(est => {
      const [lat1, lon1] = userLocation.coordinates;
      const lat2 = est.address.latitude;
      const lon2 = est.address.longitude;

      const distance = Math.sqrt(((lat2 - lat1) * 111320) ** 2 + ((lon2 - lon1) * 55800) ** 2);
      return distance <= radius;
    });

    return filtered;
  };

  return (
    <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY, suggest_apikey: process.env.REACT_APP_YANDEX_MAPS_SUGGEST_API_KEY }}>
      <div className="page-container">
        {isAuthorized && Array.isArray(recommendations) && recommendations.length > 0 && (
          <div className="recommendations-container">
            <h1 className="recommendations-container-title">Вам должно понравиться</h1>
            <button className="location-toggle-btn" onClick={toggleFilterByLocation}>
              {filterByLocation ? "Не учитывать местоположение" : "Учитывать местоположение"}
            </button>
            {filterByLocation && (
              <div className="radius-slider-container">
                <label htmlFor="radius-slider">Радиус: {radius / 1000} км</label>
                <input
                  id="radius-slider"
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={radius / 1000}
                  onChange={handleRadiusChange}
                />
              </div>
            )}
            <div className="recommendations-container-recs">
              {getFilteredRecEstablishments().map(est => (
                <div key={est.establishmentID} className="recommendation-card">
                  <img src={est.picture} alt={est.name} className="recommendation-image" />
                  <div className="recommendation-info">
                    <h3 className="recommendation-info-name">{est.name}</h3>
                    <p className="recommendation-info-desc">{est.description}</p>
                    <a href={`/details/${est.establishmentID}`} className="details-link">Подробнее</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="map-container">
          <Map
            defaultState={{
              center: userLocation ? userLocation.coordinates : [59.93, 30.31],
              zoom: 15,
              controls: []
            }}
            className="map"
            instanceRef={(map) => {
              if (map && userLocation) {
                map.setCenter(userLocation.coordinates, 15);
              }
            }}
            options={{
              suppressMapOpenBlock: true,
              yandexMapDisablePoiInteractivity: true,
            }}
          >
            <GeolocationControl
              options={{ float: "right" }}
              className="geolocation-control"
              onClick={handleGeolocationClick}
            />
            {userLocation && (
              <Placemark
                geometry={userLocation.coordinates}
                properties={{
                  iconContent: 'Я',
                }}
                options={{
                  preset: 'islands#circleIcon',
                  iconColor: '#ab806c',
                }}
              />
            )}
            <ObjectManager
              options={{
                clusterize: true,
                gridSize: 32,
              }}
              objects={{
                openBalloonOnClick: true,
                preset: "islands#icon",
                iconLayout: "default#image",
                iconImageHref: coffeeIcon,
                iconImageSize: [30, 30],
                iconImageOffset: [-5, -5],
              }}
              clusters={{
                preset: "islands#brownClusterIcons",
              }}
              defaultFeatures={objectManagerData}
              modules={[
                "objectManager.addon.objectsBalloon",
                "objectManager.addon.objectsHint",
              ]}
            />
          </Map>
        </div>
      </div>
    </YMaps>
  );
};

export default App;
