import * as React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ChemicalHandlingModal(props) {
  const handleClose = () => {
    props.onClose();
  };

  console.log(
    props.chemicalHandlingIsLoading,
    props.chemicalHandlingError,
    props.chemicalHandling
  );

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Transition}
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
            Chemical Handling
          </Typography>
        </Toolbar>
      </AppBar>

      {props.chemicalHandlingIsLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : props.chemicalHandlingError ? (
        <Alert severity="error">
          Could not fetch chemicals. Please try again later.
        </Alert>
      ) : (
        props.chemicalHandling && (
          <div className="msds-container">
            <Typography variant="h4">{props.chemicalHandling.name}</Typography>

            <br />

            <Typography variant="h5">Chemical Categories:</Typography>
            {props.chemicalHandling.category &&
              props.chemicalHandling.category.map((category) => (
                <Typography variant="h6">
                  <i>{category.name}</i>
                </Typography>
              ))}

            <br />
            <Divider />
            <br />

            <div className="msds-placards">
              {props.chemicalHandling.placard &&
                props.chemicalHandling.placard.map((placard) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "10px",
                    }}
                  >
                    <img src={placard.link} alt={placard.description} />
                    <i>{placard.description}</i>
                  </div>
                ))}
            </div>

            <br />
            <Divider />
            <br />

            <Typography variant="h5">
              <b>Chemical Identifiers</b>
            </Typography>
            <br />

            <Typography variant="h5">
              <b>CAS Number</b>
            </Typography>
            <Typography variant="h6">
              {props.chemicalHandling.casNumber.join(" ")}
            </Typography>
            <br />

            <Typography variant="h5">
              <b>General Description</b>
            </Typography>
            <Typography variant="h6">
              {props.chemicalHandling.description}
            </Typography>
            <br />

            <Typography variant="h5">
              <b>Chemical Formula</b>
            </Typography>
            <Typography variant="h6">
              {props.chemicalHandling.chemicalFormula}
            </Typography>
            <br />

            <br />
            <Divider />
            <br />

            {props.chemicalHandling.handling &&
              props.chemicalHandling.handling.map((section) => (
                <>
                  <Typography variant="h5">
                    <b>{section.sectionName}</b>
                  </Typography>
                  <br />

                  {section.dataPoints &&
                    section.dataPoints.map((datapoint) => (
                      <>
                        <Typography variant="h5">{`• ${datapoint.name}`}</Typography>

                        {datapoint.type == "normal" ? (
                          <Typography variant="h6">
                            {datapoint.value}
                          </Typography>
                        ) : datapoint.type == "multiple" ? (
                          datapoint.value &&
                          datapoint.value.map((value) => (
                            <Typography variant="h6">{value}</Typography>
                          ))
                        ) : datapoint.type == "html" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: datapoint.value,
                            }}
                          ></div>
                        ) : (
                          <></>
                        )}
                        <br />
                      </>
                    ))}
                </>
              ))}
          </div>
        )
      )}
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    chemicalHandling: state.chemicalHandling.chemical,
    chemicalHandlingError: state.chemicalHandling.error,
    chemicalHandlingIsLoading: state.chemicalHandling.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChemicalHandlingModal);
