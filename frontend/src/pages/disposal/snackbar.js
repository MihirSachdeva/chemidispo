import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function ChemicalSnackbar(props) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.handleClose();
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Please select 2 chemicals."
        action={action}
      />
    </div>
  );
}
