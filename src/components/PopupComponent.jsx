import {Popup} from 'react-leaflet';
import React, {useState} from 'react';
import ButtonComponent from './ButtonComponent';
import axios from 'axios';
import "./PopupComponent.css"
import ModalComponent from './ModalComponent';

export default function PopupComponent({feature, locationJson, fetch}) {
    const [modal, setModal] = useState(false);

    function toggle() {
        setModal(!modal);
    }

    function handleChange() {
        setModal(true);
    }

    function handleDelete() {
        deleteLocation();
    }

    function handleSubmit(description) {
        locationJson.features[0].properties.description = description;
        updateLocation(locationJson);
    }

    function deleteLocation() {
        axios.delete("/delete", {params: {id: feature.properties.id}})
            .then(response => {
                if (response.status !== 200) {
                    alert("Something went wrong!");
                }
                if (response.status === 200) {
                    fetch();
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    function updateLocation(json) {
        axios.put("/put", json, {params: {id: feature.properties.id}})
            .then(response => {
                if (response.status !== 200) {
                    alert("Something went wrong!");
                }
                if (response.status === 200) {
                    fetch();
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <>
            <Popup>
                Entry ID: {feature.properties.id}
                <div>Description:</div>
                <div className="popup">
                    {feature.properties.description}
                </div>
                <div>
                    Latitude: {feature.geometry.coordinates[1].toFixed(2)}
                    <br/>
                    Longitude: {feature.geometry.coordinates[0].toFixed(2)}
                </div>
                <div style={{"flexDirection": "row"}}>
                    <ButtonComponent
                        variant={"outline-danger"}
                        name={"Delete"}
                        handleClick={handleDelete}
                    />
                    <ButtonComponent
                        variant={"outline-primary"}
                        name={"Change"}
                        handleClick={handleChange}
                    />
                </div>
                {modal &&
                    <ModalComponent
                        name={"Change description"}
                        handleSubmit={handleSubmit}
                        description={feature.properties.description}
                        coordinates={{
                            "lat": feature.geometry.coordinates[1],
                            "lng": feature.geometry.coordinates[0]
                        }}
                        toggle={toggle}
                        modal={modal}
                    />
                }
            </Popup>
        </>
    )
}
