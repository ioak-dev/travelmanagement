import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

function ArcTextField(props) {
    const { id, label, name, handlechange, error, rows, multiline } = props;
    return (
        <TextField
                id={id}
                label={label}
                name={name}
                value={props[id][name]}
                onChange={e => handlechange(e)}
                margin="normal"
                variant="filled"
                fullWidth
                error={error}
                multiline={multiline}
                rows={rows}
                />
    )
}

ArcTextField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handlechange: PropTypes.func.isRequired,
    error: PropTypes.bool
};

export default ArcTextField;
