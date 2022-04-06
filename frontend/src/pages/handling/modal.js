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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChemicalHandlingModal(props) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
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
      {/* <List>
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary="Default notification ringtone"
            secondary="Tethys"
          />
        </ListItem>
      </List> */}
      <div className="msds-container">
        <Typography variant="h5">BARIUM PERCHLORATE</Typography>

        <br />
        <Divider />
        <br />

        <div className="msds-placards">
          <img src="https://cameochemicals.noaa.gov/images/placards/Placard5.1.gif" />
          <img src="https://cameochemicals.noaa.gov/images/placards/Placard6.1.gif" />
        </div>

        <br />
        <Divider />
        <br />

        <Typography variant="h5">Chemical Identifiers</Typography>
        <br />

        <Typography variant="h5">CAS Number</Typography>
        <Typography variant="h6">10294-39-0</Typography>
        <br />

        <Typography variant="h5">General Description</Typography>
        <Typography variant="h6">PHYSICAL DESCRIPTION: A white crystalline solid. Noncombustible, but accelerates burning of combustible materials. May explode if large quantities are involved in a fire or the combustible material is finely divided. Prolonged exposure to fire or heat may result in an explosion. Used to make explosives. (NTP, 1992)</Typography>
        <br />

        <br />
        <Divider />
        <br />

        <Typography variant="h5">Hazards</Typography>
        <br />

        <Typography variant="h5">Reactivity Alerts</Typography>
        <Typography variant="h6">Explosive</Typography>
        <Typography variant="h6">Strong Oxidizing Agent</Typography>
        <br />

        <Typography variant="h5">Air & Water Reactions</Typography>
        <Typography variant="h6">Water soluble.</Typography>
        <br />

        <Typography variant="h5">Fire Hazard</Typography>
        <Typography variant="h6">Behavior in Fire: Increases the intensity of fire. Containers may explode. (USCG, 1999)</Typography>
        <br />

        <Typography variant="h5">Health Hazard</Typography>
        <Typography variant="h6">Inhalation or contact with eyes or skin causes irritation. Ingestion causes excessive salivation, vomiting, colic, diarrhea, convulsive tremors, slow, hard pulse, and elevated blood pressure; hemorrhages may occur in the stomach, intestines, and kidneys; muscular paralysis may follow. (USCG, 1999)</Typography>
        <br />

        <Typography variant="h5">Reactivity Profile</Typography>
        <Typography variant="h6">Reflux heating of BARIUM PERCHLORATE with alcohols yields perchlorate esters, which are highly explosive [Kirk-Othmer 2nd ed. 5:75 1963]. A strong oxidizing agent. May react violently with organic materials.</Typography>
        <br />

        <br />
        <Divider />
        <br />

        <Typography variant="h5">Response Recommendations </Typography>
        <br />

        <Typography variant="h5">Isolation and Evacuation</Typography>
        <Typography variant="h6">As an immediate precautionary measure, isolate spill or leak area in all directions for at least 50 meters (150 feet) for liquids and at least 25 meters (75 feet) for solids.

          LARGE SPILL: Consider initial downwind evacuation for at least 100 meters (330 feet).

          FIRE: If tank, rail car or tank truck is involved in a fire, ISOLATE for 800 meters (1/2 mile) in all directions; also, consider initial evacuation for 800 meters (1/2 mile) in all directions. (ERG, 2016)
        </Typography>
        <br />

        <Typography variant="h5">First Aid</Typography>
        <Typography variant="h6">
          Get medical attention. Alert doctor to possibility of barium poisoning, particularly if compound was swallowed.

          INHALATION: remove to fresh air.

          EYES: flush with water for at least 15 min.

          SKIN: flush with water.

          INGESTION: oral administration of an aqueous 10% solution of magnesium or sodium sulfate; for severe intoxication, calcium or a magnesium salt may have to be given I.V. with caution; treatment otherwise is supportive and symptomatic. (USCG, 1999)
        </Typography>
        <br />

      </div>
    </Dialog>
  );
};