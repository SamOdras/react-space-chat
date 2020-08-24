import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'black',
    display:'flex',
    flexDirection:'column'
  },
}));

export default function SimpleBackdrop() {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress size={50}color="inherit" />
        <h3 style={{marginTop:'15px'}}>Preparing Chat</h3>
      </Backdrop>
    </div>
  );
}