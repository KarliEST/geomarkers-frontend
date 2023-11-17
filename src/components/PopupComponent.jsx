import {Popup} from 'react-leaflet';
import React, {useState} from 'react';
import {ButtonComponent} from './ButtonComponent';
import axios from 'axios';
import "./PopupComponent.css"
import ModalComponent from './ModalComponent';

const PopupComponent = ({feature, locationJson, fetch}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    const handleChange = () => {
        setModal(true);
        console.log("change");
    };

    const handleDelete = () => {
        deleteLocation();
        console.log("delete");
    };

    const handleSubmit = (description) => {
        locationJson.features[0].properties.description = description;
        updateLocation(locationJson);
        console.log("Done!");
    };

    const deleteLocation = () => {
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
            })
    };
    const updateLocation = (json) => {
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
            })
    };

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
                        modal={modal}
                        toggle={toggle}
                    />
                }
            </Popup>
        </>
    )
}
export default PopupComponent
