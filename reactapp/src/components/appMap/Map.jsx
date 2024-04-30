import React, { useState, useEffect } from "react";
import { YMaps, Map, GeolocationControl, ObjectManager } from '@pbe/react-yandex-maps';
import { API_URL } from "../../index";

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
          <div class="balloonContent">
            <div class="balloonContent__title">${point.name}</div>
            <div class="balloonContent__img">
            <img src= "${point.picture}" width="100" height="111" alt="${point.name}"></img>
            </div>
            <div class="balloonContent__descr">
              <p>${point.description}</p>
            </div>
            <a href='https://yandex.ru/maps/?rtext=~${point.coordinates[0]}%2C${point.coordinates[1]}' target="_blank">
              <button class="balloonContent__btn">
                Построить маршрут
              </button>
            </a>
          </div>
        `,
      },
    })),
  };

  return (
    <YMaps>
      <div>
        <Map defaultState={{ center: [59.93, 30.31], zoom: 12, controls: [] }} 
          width="80vw"
          height="50vh"> 
          <GeolocationControl options={{ float: "left" }} /> 
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
            // filter={(object) => object.id % 2 === 0}
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
