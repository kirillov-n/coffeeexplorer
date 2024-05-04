import React, { useState, useEffect } from "react";
import { YMaps, Map, GeolocationControl, ObjectManager } from '@pbe/react-yandex-maps';
import { API_URL } from "../../index";
import "./Map.css";

const App = () => {
  const [objectManagerFeatures, setObjectManagerFeatures] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    const adjustImageOffset = () => {
      const images = document.querySelectorAll('.balloon-content__img img');
      images.forEach(image => {
        const containerHeight = image.parentElement.clientHeight;
        const imageHeight = image.clientHeight;
        const marginTop = (containerHeight - imageHeight) / 2;
        image.style.marginTop = `${marginTop}px`;
      });
    };

    adjustImageOffset();

    window.addEventListener('resize', adjustImageOffset);

    return () => {
      window.removeEventListener('resize', adjustImageOffset);
    };
  }, []);

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
        hintContent: `<div class="hintContent">${point.shortName}</div>`,
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
    <YMaps>
      <div className="map-container">
        <Map defaultState={{ center: [59.93, 30.31], zoom: 12, controls: [] }} className="map"> 
          <GeolocationControl options={{ float: "left" }} className="geolocation-control" /> 
          <ObjectManager
            options={{
              clusterize: true,
              gridSize: 32,
            }}
            objects={{
              openBalloonOnClick: true,
              preset: "islands#greenDotIcon",
            }}
            clusters={{
              preset: "islands#redClusterIcons",
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
