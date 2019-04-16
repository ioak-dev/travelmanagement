import React from 'react';
import styled, { css } from 'styled-components'
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { withTheme } from '@material-ui/core/styles';

const Container = styled.div` {
}`

const TextStyle = styled.div` {
    ${props => props.darktext && css`color: black;`}
    ${props => props.lighttext && css`color: white;`}
    display: flex;
}
`

function ArcButton(props) {
    const {lighttext, darktext, ...others} = props;
    return (
        <Container>
            <Button {...others}>
                <TextStyle lighttext={lighttext} darktext={darktext}>{props.children}</TextStyle>
            </Button>
        </Container>
    )
}

ArcButton.propTypes = {
    theme: PropTypes.object.isRequired,
    darktext: PropTypes.bool,
    lighttext: PropTypes.bool
};

export default withTheme()(ArcButton);