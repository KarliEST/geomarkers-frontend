import React from 'react';
import LocationsMap from './components/LocationsMap';



function App() {
    return (
        <div style={{
            border: "2px solid blue",
            display: "flex",
            flexDirection: "row",
            width: "100vh",
            height: "100vh"
        }}>
            <p style={{border: "2px solid blue", width:"100vw", height:"100vh"}}>
                <LocationsMap/>
            </p>
        </div>
    );
}

export default App;
