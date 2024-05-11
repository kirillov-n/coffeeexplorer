import React, { useState, useEffect } from "react";
import { YMaps, Map,  SearchControl, GeolocationControl, ObjectManager, Placemark } from "@pbe/react-yandex-maps";
import { API_URL } from "../../index";
import "./Map.css";
import dotenv from "dotenv";
import coffeeIcon from "../../media/Cup.svg"; 

dotenv.config();

const App = () => {
  const [objectManagerFeatures, setObjectManagerFeatures] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [geolocationClicked, setGeolocationClicked] = useState(false);

  useEffect(() => {
    // Получение данных об установленных кофейнях
    fetch(API_URL + "coffeeexplorer_app/establishments/")
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(establishment => ({
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
            <a href='/details/${point.id}' target="_blank">
              <button class="balloon-content__btn">
                Подробнее
              </button>
            </a>
          </div>     
        `,
      },
    })),
  };

  return (
    <YMaps query={{apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY, suggest_apikey: process.env.REACT_APP_YANDEX_MAPS_SUGGEST_API_KEY}}>
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
          yandexMapDisablePoiInteractivity: true, // Отключает интерактивность POI
        }}
      >
          {/* <SearchControl options={{ float: 'left' }} /> */}
          <GeolocationControl
            options={{ float: "right" }}
            className="geolocation-control"
            onClick={handleGeolocationClick}
          /> 
          {userLocation && (
            <Placemark 
              geometry={userLocation.coordinates} 
              options={
                {
                  preset: 'islands#circleIcon',
                  iconColor: 'red',
                } }
              properties={{
                iconContent: 'Я',
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
              preset: "islands#orangeClusterIcons",
            }}
            defaultFeatures={objectManagerData}
            modules={[
              "objectManager.addon.objectsBalloon",
              "objectManager.addon.objectsHint",
            ]}
          />
        </Map>
      </div>
    </YMaps>
  );
};

export default App;
