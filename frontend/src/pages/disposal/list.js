import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

export default function CheckboxList(props) {
  const handleToggle = (chemical) => () => {
    props.handleChemicalSelect(chemical);
  };

  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper" }}
      className="list-scrollable-disposal"
    >
      <List>
        {props.allChemicals &&
          props.allChemicals.map((chemical) => {
            const labelId = `checkbox-list-label-${chemical.casNumber[0]}`;

            return (
              <>
                <ListItem key={chemical.casNumber[0]} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(chemical)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={props.checked.indexOf(chemical) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={chemical.name}
                      secondary={
                        <>
                          CAS Number: {chemical.casNumber.join(" ")}
                          <br />
                          {chemical.category.map((category) => (
                            <div>{category.name}</div>
                          ))}
                        </>
                      }
                    />
                  </ListItemButton>
                </ListItem>

                <Divider variant="inset" component="li" />
              </>
            );
          })}
      </List>
    </Box>
  );
}
