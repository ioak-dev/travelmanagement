import React from 'react';
import styled, { css } from 'styled-components'
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { withTheme } from '@material-ui/core/styles';

const Container = styled.div`
    {
        -ms-transform: skewX(-10deg);
        -webkit-transform: skewX(-10deg);
        transform: skewX(-10deg);
        background: ${props => {
            if (props.background && props.color === 'secondary') {
                return props.theme.palette.secondary.main;
            } else if (props.background && props.color === 'primary') {
                return props.theme.palette.primary.main;
            }
        }};
    }
`
const TextStyle = styled.div`
  -ms-transform: skewX(10deg);
  -webkit-transform: skewX(10deg);
  transform: skewX(10deg); 
  ${props => props.background && css`color: black;`}
`

function ArcButtonNav(props) {
    const {background, ...others} = props;
    return (
        <Container background={background} theme={props.theme} color={props.color}>
            <Button {...others}>
                <TextStyle background={background}>{props.children}</TextStyle>
            </Button>
        </Container>
    )
}

ArcButtonNav.propTypes = {
    theme: PropTypes.object.isRequired,
    background: PropTypes.bool
};

export default withTheme()(ArcButtonNav);