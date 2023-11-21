import {Button} from 'react-bootstrap';
import React from 'react';

export default function ButtonComponent({variant, name, handleClick}) {
    return (
        <Button
            variant={variant}
            onClick={handleClick}
            size={"sm"}
        >
            {name}
        </Button>
    );
}
