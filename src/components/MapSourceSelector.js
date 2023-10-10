import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

const MapSourceSelector = ({maps, selectMap}) => {

    return (
        <FormGroup tag="fieldset">
            <legend>Map Sources:</legend>
            {maps.map((mapItem) => {
                return (
                    <FormGroup
                        key={mapItem.name}
                        check
                    >
                        <Label check>
                            <Input
                                defaultChecked={mapItem.mapUrl === maps[0].mapUrl}
                                type="radio"
                                name="radio"
                                onClick={() => {
                                    selectMap(mapItem.attribution, mapItem.mapUrl)
                                }
                                }
                            />
                            {mapItem.name}
                        </Label>
                    </FormGroup>
                );
            })}
        </FormGroup>
    );
};
export default MapSourceSelector;
