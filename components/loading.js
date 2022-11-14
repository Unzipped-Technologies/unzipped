import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '70%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      position: 'relative',
      top: '-50px'
    },
  }));

const Loading = () => {
    const classes = useStyles();

    return (
        <div style={{width: '100vw', height: '100vh', position: 'fixed', zIndex: '100000', display: 'grid', justifyItems: 'center', top: '35%'}}>
            <div className="vohnt-load-box">
            <p>Design.Develop.<span style={{fontStyle: 'italic'}}>enjoy</span></p>
            <div className={classes.root}>
            <LinearProgress />
            </div>
            </div>
        </div>
 )
}

export default Loading;