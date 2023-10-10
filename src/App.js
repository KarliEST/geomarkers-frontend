import React, {useState} from 'react';
import LocationsMap from './components/LocationsMap';
import MapSourceSelector from './components/MapSourceSelector';
import Maps from './resources/maps.json'

function App() {
    const [mapUrl, setMapUrl] = useState(Maps[0].mapUrl);
    const [mapAttribution, setMapAttribution] = useState(Maps[0].attribution);
    const heading = "GEOLOCATIONS IN ESTONIA";
    const handleSelectedMap = (attribution, url) => {
        setMapAttribution(attribution);
        setMapUrl(url);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh"
        }}>
            <h1 className={"header"}>{heading}</h1>
            <div>
                <MapSourceSelector
                    maps={Maps}
                    selectMap={handleSelectedMap}
                />
            </div>
            <div className={"map-container"}>
                <LocationsMap
                    mapUrl={mapUrl}
                    attribution={mapAttribution}
                />
            </div>
        </div>
    );
}

export default App;
