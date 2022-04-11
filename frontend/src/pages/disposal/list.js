import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxList(props) {
  const handleToggle = (value) => () => {
    props.handleChemicalSelect(value);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }} className="list-scrollable-disposal">
      <List>
        {props.allChemicals && props.allChemicals.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={props.checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Chemical ${value}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
