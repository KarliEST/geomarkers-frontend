import React, {useState} from 'react';
import {Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import ButtonComponent from './ButtonComponent';

export default function ModalComponent({name, toggle, modal, handleSubmit, description, coordinates}) {
    const [input, setInput] = useState("");

    function checkDescription() {
        return input.trim().length !== 0;
    }

    function handleChange() {
        if (checkDescription()) {
            handleSubmit(input);
            toggle();
        } else {
            alert("Incorrect description");
        }
    }

    const handleCancel = () => {
        toggle();
    };

    return (
        <>
            <Modal size={"sm"} isOpen={modal}>
                <ModalHeader toggle={toggle}>{name}</ModalHeader>
                <ModalBody>
                    <Input
                        defaultValue={description}
                        onChange={event => {
                            setInput(event.target.value);
                        }}
                        rows={3}
                        type={"textarea"}
                        id={"description"}
                        name={"description"}
                    />
                    <p>
                        Latitude: {coordinates.lat.toFixed(2)}
                        <br/>
                        Longitude: {coordinates.lng.toFixed(2)}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <ButtonComponent
                        variant={"outline-primary"}
                        name={"Submit"}
                        handleClick={handleChange}
                    />
                    <ButtonComponent
                        variant={"outline-secondary"}
                        name={"Cancel"}
                        handleClick={handleCancel}
                    />
                </ModalFooter>
            </Modal>
        </>
    )
}
