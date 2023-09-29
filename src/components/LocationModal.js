import React, {useState} from "react";
import {Button, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import axios from 'axios';
import "./LocationModal.css"

const LocationModal = ({modal, toggle, coordinates, fetch}) => {
    const [inputDescription, setInputDescription] = useState("");

    const createJson = () => {
        return {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "description": inputDescription.replace(/\r?\n/g, " "),
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [coordinates.lat, coordinates.lng]
                    }
                }
            ]
        };
    };

    const postLocation = () => {
        let geoJson = createJson();
        axios.post("/add", geoJson)
            .then(response => {
                if (response.status !== 200) {
                    alert("Midagi läks valesti");
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
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Uue leiukoha sisestamine</ModalHeader>
                <ModalBody>
                    <Form
                        style={{display: "flex", flexDirection: "column"}}
                    >
                        <Label for={"description"}>
                            Kirjeldus:
                        </Label>
                        <textarea
                            value={inputDescription}
                            onChange={event => {
                                setInputDescription(event.target.value);
                            }}
                            rows={5}
                            cols={30}
                            id={"description"}
                            name={"description"}
                        />
                    </Form>
                    <p>
                        Latitude: {coordinates.lat.toFixed(2)}
                        <br/>
                        Longitude: {coordinates.lng.toFixed(2)}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        toggle();
                        postLocation();
                    }}>
                        Sisesta
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Tühista
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default LocationModal;
