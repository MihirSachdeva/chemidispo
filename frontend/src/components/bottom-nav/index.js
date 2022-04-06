import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PanToolIcon from '@mui/icons-material/PanTool';
import ScienceIcon from '@mui/icons-material/Science';

import { links, page_names } from '../../constants/frontend-urls';

import './styles.css';

const BottomNav = (props) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (props.page === page_names.HANDLING) {
      setValue(0);
    } else if (props.page === page_names.DISPOSAL) {
      setValue(1);
    }
  }, [props.page]);

  return (
    <Box className="bottom-nav-container">
      <BottomNavigation
        showLabels
        value={value}
      >
        <BottomNavigationAction
          component={Link}
          to={links.HANDLING()}
          label="Handling"
          icon={<PanToolIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to={links.DISPOSAL()}
          label="Disposal"
          icon={<ScienceIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.page.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);