import * as React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ChemicalDisposalModal(props) {
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
      <AppBar sx={{ position: "sticky" }}>
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
      {props.chemicalDisposalIsLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : props.chemicalDisposalError ? (
        <Alert severity="error">
          Could not fetch chemicals. Please try again later.
        </Alert>
      ) : (
        props.chemicalDisposal.chemical1 &&
        props.chemicalDisposal.chemical2 && (
          <div className="msds-container">
            <Typography variant="h5">
              {props.chemicalDisposal.chemical1.name}
            </Typography>
            <Typography variant="body1">
              CAS Number: {props.chemicalDisposal.chemical1.casNumber.join(" ")}
            </Typography>
            {props.chemicalDisposal.chemical1.category.map((category) => (
              <Typography variant="body1">{category.name}</Typography>
            ))}

            <br />
            <Typography variant="body1">
              <i>and</i>
            </Typography>
            <br />

            <Typography variant="h5">
              {props.chemicalDisposal.chemical2.name}
            </Typography>
            <Typography variant="body1">
              CAS Number: {props.chemicalDisposal.chemical2.casNumber.join(" ")}
            </Typography>
            {props.chemicalDisposal.chemical2.category.map((category) => (
              <Typography variant="body1">{category.name}</Typography>
            ))}

            <br />
            <Divider />
            <br />

            <div className="msds-placards">
              {props.chemicalDisposal.report.length ? (
                <Alert severity="error">WARNING: Incompatible!</Alert>
              ) : (
                <Alert severity="success">Compatible!</Alert>
              )}
            </div>

            <br />
            <Divider />
            <br />

            {props.chemicalDisposal.report.map((report) => (
              <>
                <Typography variant="h5">
                  <b>{report.name}</b>
                </Typography>
                <Typography variant="h6">{report.description}</Typography>

                <br />
                <Divider />
                <br />
              </>
            ))}
          </div>
        )
      )}{" "}
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    chemicalDisposal: state.chemicalDisposal.report,
    chemicalDisposalError: state.chemicalDisposal.error,
    chemicalDisposalIsLoading: state.chemicalDisposal.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChemicalDisposalModal);
