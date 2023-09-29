import React from 'react';
import LocationsMap from './components/LocationsMap';



function App() {
    return (
        <div style={{
            border: "2px solid red",
            display: "flex",
            flexDirection: "row",
            width: "100vh",
            height: "100vh"
        }}>
            <div style={{border: "2px solid red", width:"100vw", height:"100vh"}}>
                <LocationsMap/>
            </div>
        </div>
    );
}

export default App;
