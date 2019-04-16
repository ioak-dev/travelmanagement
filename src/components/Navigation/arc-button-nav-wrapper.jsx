import React from 'react';
import PropTypes from 'prop-types';
import ArcButtonNav from '../ui/elements/arc-button-nav';

function ArcButtonNavWrapper(props) {
    const {pathname, getMenuItemColor, label, ...others} = props;
    return (
        <ArcButtonNav background={window.location.pathname === pathname} color={getMenuItemColor(pathname)} href={pathname} {...others}>{label}</ArcButtonNav>
    )
}

ArcButtonNavWrapper.propTypes = {
    pathname: PropTypes.string.isRequired,
    getMenuItemColor: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default ArcButtonNavWrapper;