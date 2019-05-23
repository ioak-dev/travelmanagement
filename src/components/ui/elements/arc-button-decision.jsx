import React from 'react';
import styled, { css } from 'styled-components'
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { withTheme } from '@material-ui/core/styles';


const forwardTheme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
          main: '#4E8E57'
          // 466983
      },
      secondary: {
          main: '#A23E48'
          // FFCA3A
      }
    }
  });

const Container = styled.div`
    {
        
    }
`
const TextStyle = styled.div`
    display: flex;
`

function ArcButtonDecision(props) {
    const {forward, backward, ...others} = props;
    return (
        <MuiThemeProvider theme={forwardTheme}>
            <Container>
                {forward && <Button {...others} color="primary">
                    <TextStyle>{props.children}</TextStyle>
                </Button>}
                {backward && <Button {...others} color="secondary">
                    <TextStyle>{props.children}</TextStyle>
                </Button>}
            </Container>
        </MuiThemeProvider>
    )
}

ArcButtonDecision.propTypes = {
    theme: PropTypes.object.isRequired,
    forward: PropTypes.bool,
    backward: PropTypes.bool
};

export default withTheme()(ArcButtonDecision);