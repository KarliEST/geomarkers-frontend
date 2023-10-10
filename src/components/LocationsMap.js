import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles.css';
import L from 'leaflet';
import LocationModal from './LocationModal';

function getIcon(_iconSize) {
    return L.icon({
        iconUrl: require("../icons/map-marker-2-16.png"),
        iconSize: _iconSize
    })
}

export default function LocationsMap({mapUrl, attribution}) {
    const position = [58.66, 25.05];

    const [modal, setModal] = useState(false);
    const [coord, setCoord] = useState({"lat": 0, "lng": 0});
    const [pointData, setPointData] = useState();
    const [pointId, setPointId] = useState(0);

    const toggle = () => setModal(!modal);

    const setCoordinates = (coordinates) => setCoord(coordinates);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setCoordinates(e.latlng);
                toggle();
            },

        });
        return null;
    };

    const fetchPoints = () => {
        axios.get("/all")
            .then(response => {
                setPointData(response.data);
            })
            .catch(error => {
                console.log(error)
            })
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
                                    setPointId(feature.properties.id)
                                }
                            }}
                        >
                            <Popup maxWidth={120}>
                                Entry ID: {pointId}
                                <p style={{"overflowWrap": "break-word"}}>
                                    Description:<br/>
                                    {feature.properties.description}
                                </p>
                                <p>
                                    Latitude: {feature.geometry.coordinates[1].toFixed(2)}
                                    <br/>
                                    Longitude: {feature.geometry.coordinates[0].toFixed(2)}
                                </p>
                            </Popup>
                        </Marker>
                    </FeatureGroup>
                );
            })}
            {modal &&
                <LocationModal
                    modal={modal}
                    toggle={toggle}
                    coordinates={coord}
                    fetch={fetchPoints}
                />
            }
            <LocationMarker/>
        </MapContainer>
    );
}
