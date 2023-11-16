import {Button} from 'react-bootstrap';
import React from 'react';

export function ButtonComponent({variant, name, handleClick}) {
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
