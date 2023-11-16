import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FeatureGroup, MapContainer, Marker, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles.css';
import L from 'leaflet';
import LocationModal from './LocationModal';
import PopupComponent from './PopupComponent';

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
    const [locationJson, setLocationJson] = useState({});
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
    const fetchLocationById = (id) => {
        axios.get("/get", {params: {id: id}})
            .then(response => {
                if (response.status !== 200) {
                    alert("Something went wrong!");
                }
                if (response.status === 200) {
                    // console.log(response.data)
                    // console.log(response.data.features[0].properties.description)
                    setLocationJson(response.data)
                }
            })
            .catch(error => {
                console.log(error)
            })
    };

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
