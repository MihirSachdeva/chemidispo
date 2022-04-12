import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChemicalDisposalModal(props) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Transition}
      scroll="paper"
    >
      <AppBar sx={{ position: 'sticky' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Chemical Disposal
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="msds-container">
        <Typography variant="h5">BARIUM OXIDE</Typography>
        <Typography variant="body1">CAS Number: 1304-28-5</Typography>
        <Typography variant="body1">Bases, Strong</Typography>

        <br />
        <Typography variant="body1"><i>and</i></Typography>
        <br />

        <Typography variant="h5">ALUMINUM BROMIDE</Typography>
        <Typography variant="body1">CAS Number: 7727-15-3</Typography>
        <Typography variant="body1">Acids, Strong Non-oxidizing</Typography>

        <br />
        <Divider />
        <br />

        <div className="msds-placards">
          <Alert severity="error">Incompatible!</Alert>
        </div>

        <br />
        <Divider />
        <br />

        <Typography variant="h5">Corrosive</Typography>
        <Typography variant="h6">Reaction products may be corrosive</Typography>
        <br />

        <Typography variant="h5">Generates gas</Typography>
        <Typography variant="h6">Reaction liberates gaseous products and may cause pressurization</Typography>
        <br />

        <Typography variant="h5">Generates heat</Typography>
        <Typography variant="h6">Exothermic reaction at ambient temperatures (releases heat)</Typography>
        <br />

        <Typography variant="h5">Intense or explosive reaction</Typography>
        <Typography variant="h6">Reaction may be particularly intense, violent, or explosive</Typography>
        <br />

        <Typography variant="h5">Toxic</Typography>
        <Typography variant="h6">Reaction products may be toxic</Typography>
        <br />

        <Divider />
        <br />
      </div>
    </Dialog>
  );
};