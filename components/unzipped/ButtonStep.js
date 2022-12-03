import React from 'react'
// import {
//     Span,
//     PaddingLeft
// } from './textStyles'
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
    display: flex;
    flex-flow: row;
`;

const useStyles = makeStyles((theme) => ({
	button: {
        border: 'none',
        background: '#37DEC5',
        padding: '10px 20px',
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        margin: '40px 5px',
        outline: 'none',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#8EDE64',
            color: '#222',
          }
	},
	buttonTwo: {
        border: 'none',
        padding: '10px 20px',
        margin: '40px 5px',
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        outline: 'none',
        border: '2px solid #37DEC5',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#8EDE64',
            color: '#222',
            border: '2px solid #8EDE64',
          }
	}
}))

const Buttons = ({buttonOne, buttonTwo}) => {
    const classes = useStyles();
    return (
        <Container>
            {buttonOne && <Button className={classes.buttonTwo}>{buttonOne}</Button>}
            {buttonTwo && <Button className={classes.button}>{buttonTwo}</Button>}
        </Container>
    )
}

export default Buttons;