import React from 'react';
import LocationsMap from './components/LocationsMap';



function App() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh"
        }}>
            <h1 className={"header"}>SEENTE LEIUKOHTADE KAART</h1>
            <p className={"map-container"}>
                <LocationsMap/>
            </p>
        </div>
    );
}

export default App;
