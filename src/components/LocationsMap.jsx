import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FeatureGroup, MapContainer, Marker, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles.css';
import L from 'leaflet';
import PopupComponent from './PopupComponent';
import ModalComponent from './ModalComponent';

function getIcon(_iconSize) {
    return L.icon({
        iconUrl: require("../icons/map-marker-2-16.png"),
        iconSize: _iconSize
    });
}

export default function LocationsMap({mapUrl, attribution}) {
    const position = [58.66, 25.05];
    const [modal, setModal] = useState(false);
    const [coord, setCoord] = useState({"lat": 0, "lng": 0});
    const [pointData, setPointData] = useState();
    const [locationJson, setLocationJson] = useState({});
    let inputDescription = "";

    function toggle() {
        setModal(!modal);
    }

    function setCoordinates(coordinates) {
        setCoord(coordinates)
    }

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setCoordinates(e.latlng);
                toggle();
            },
        });
        return null;
    }

    function fetchPoints() {
        axios.get("/all")
            .then(response => {
                setPointData(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }

    function fetchLocationById(id) {
        axios.get("/get", {params: {id: id}})
            .then(response => {
                if (response.status !== 200) {
                    alert("Something went wrong!");
                }
                if (response.status === 200) {
                    setLocationJson(response.data)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    function createJson(description) {
        return {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "description": description.replace(/\r?\n/g, " "),
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [coord.lng, coord.lat]
                    }
                }
            ]
        };
    }

    function postLocation(description) {
        let geoJson = createJson(description);
        axios.post("/post", geoJson)
            .then(response => {
                if (response.status !== 200) {
                    alert("Something went wrong!");
                }
                if (response.status === 200) {
                    fetchPoints();
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    function handleSubmit(description) {
        postLocation(description);
    }

    useEffect(() => {
        fetchPoints();
    }, [])

    if (!pointData) return <div>Loading...</div>;

    return (
        <MapContainer
            center={position}
            maxBounds={[[57, 21], [61, 29]]}
            maxBoundsViscosity={1}
            zoom={7}
            minZoom={7}
            style={{width: "100%", height: "100%"}}>
            <TileLayer
                attribution={attribution}
                url={mapUrl}
            />
            {pointData.features.map((feature) => {
                return (
                    <FeatureGroup key={feature.properties.id}>
                        <Marker
                            position={[
                                feature.geometry.coordinates[1],
                                feature.geometry.coordinates[0]
                            ]}
                            icon={getIcon()}
                            eventHandlers={{
                                click: () => {
                                    fetchLocationById(feature.properties.id);
                                }
                            }}
                        >
                            <PopupComponent
                                locationJson={locationJson}
                                feature={feature}
                                fetch={fetchPoints}
                            />
                        </Marker>
                    </FeatureGroup>
                );
            })}
            {modal &&
                <ModalComponent
                    name={"Enter new marker"}
                    modal={modal}
                    toggle={toggle}
                    coordinates={coord}
                    description={inputDescription}
                    handleSubmit={handleSubmit}
                />
            }
            <LocationMarker/>
        </MapContainer>
    );
}
