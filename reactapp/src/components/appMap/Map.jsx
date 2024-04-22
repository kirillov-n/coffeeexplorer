import React from "react";
import { YMaps, Map, GeolocationControl, ObjectManager } from '@pbe/react-yandex-maps';
import objectManagerFeatures from './MapPoints.jsx';

const App = () => (
  <YMaps>
    <div>
      <Map defaultState={{ center: [59.93, 30.31], zoom: 12, controls: [], }} 
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
        filter={(object) => object.id % 2 === 0}
        defaultFeatures={objectManagerFeatures}
        modules={[
            "objectManager.addon.objectsBalloon",
            "objectManager.addon.objectsHint",
        ]}
        />
      </Map>
    </div>
  </YMaps>
);


export default App