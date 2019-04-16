import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

function ArcTimeField(props) {
    const { id, label, name, handlechange, error, ...others } = {...props};
    return (
                                       
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className="picker">
                <TimePicker
                    id={id}
                    label={label}
                    value={props[id][name]}
                    onChange={e => handlechange(e, props.name)}
                    variant="filled"
                    fullWidth
                    error={error}
                    {...others}
                />
            </div>
        </MuiPickersUtilsProvider>
    )
}

ArcTimeField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handlechange: PropTypes.func.isRequired,
    error: PropTypes.bool
};

export default ArcTimeField;
