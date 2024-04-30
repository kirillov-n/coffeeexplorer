export const ecotrailPoints = [
  {
    id: 1,
    name: 'Просто Черный',
    shortName: 'Просто Черный',
    description: `Хорошая кофейня в районе Австрийской площади.`,
    services: '',
    infrastructure: '.',
    address: 'гор. Санкт-Петербург, ул. Дивенская улица, д. 2/13',
    coordinates: [59.959656, 30.318177],
  },
];

const objectManagerFeatures = {
  type: 'FeatureCollection',
  features: [],
};

ecotrailPoints.map((point, index) => {
  objectManagerFeatures.features.push({
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
            <img src= "https://avatars.mds.yandex.net/get-altay/11420721/2a0000018e6ffdff8f9384275aece7df33c0/S"></img>
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
  });
});

export default objectManagerFeatures;