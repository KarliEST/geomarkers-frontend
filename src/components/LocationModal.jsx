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
                        "coordinates": [coordinates.lng, coordinates.lat]
                    }
                }
            ]
        };
    };

    const postLocation = () => {
        let geoJson = createJson();
        axios.post("/post", geoJson)
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

    const checkDescription = () => {
        return inputDescription.trim().length !== 0;
    }

    return (
        <div>
            <Modal
                size={"sm"}
                isOpen={modal}
                toggle={toggle}>
                <ModalHeader toggle={toggle}>Enter new marker</ModalHeader>
                <ModalBody>
                    <Form
                        style={{display: "flex", flexDirection: "column"}}
                    >
                        <Label for={"description"}>
                            Description:
                        </Label>
                        <textarea
                            value={inputDescription}
                            onChange={event => {
                                setInputDescription(event.target.value);
                            }}
                            rows={3}
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
                        if (checkDescription()) {
                            toggle();
                            postLocation();
                        } else {
                            alert("Incorrect description");
                        }
                    }}>
                        Submit
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default LocationModal;
