import React from 'react';
import {Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {ButtonComponent} from './ButtonComponent';

export const ModalComponent = ({name, toggle, modal, handleSubmit, description}) => {
    let input = description;

    const handleChange = () => {
        handleSubmit(input);
        toggle();
    };

    const handleCancel = () => {
        toggle();
    };

    return (
        <>
            <Modal size={"sm"} isOpen={modal}>
                <ModalHeader toggle={toggle}>{name}</ModalHeader>
                <ModalBody>
                    <Input
                        defaultValue={input}
                        onChange={event => {
                            input = event.target.value;
                        }}
                        rows={3}
                        type={"textarea"}
                        id={"description"}
                        name={"description"}
                    />
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
export default ModalComponent;
