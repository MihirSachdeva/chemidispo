import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import "./styles.css";

const ChemicalList = (props) => {
  const showModal = (chemical) => {
    props.showModal(chemical);
  };

  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper" }}
      className="list-scrollable-handling"
    >
      <List>
        {props.chemicals.map((chemical) => (
          <>
            <ListItem
              disablePadding
              onClick={() => {
                showModal(chemical.id);
              }}
              key={chemical.casNumber[0]}
            >
              <ListItemButton>
                <ListItemText
                  primary={chemical.name}
                  secondary={`CAS Number: ${chemical.casNumber.join(" ")}`}
                />
              </ListItemButton>
            </ListItem>

            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </Box>
  );
};

export default ChemicalList;
