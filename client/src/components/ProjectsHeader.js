import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
    BrowserRouter as Router,
    Switch,
    useLocation
  } from "react-router-dom";
const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
    backgroundColor: "#597ef7",
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  addProject: {
    marginRight: theme.spacing(1),
    color:"primary",
  },
});

function ProjectsHeader(props) {
  const { classes, onDrawerToggle } = props;

  let location=useLocation()
  let value=0
  if(location.pathname==="/mywork"){
       value=0
    }else if(location.pathname==="/people" ){
        value=1
    }else if(location.pathname==="/projects/create" || location.pathname==="/projects/create/kanban" || location.pathname==="/projects/create/scrum" || location.pathname==="/projects/create/bugtracking"){
        value=2
    }
  return (
    <React.Fragment>
      
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={value} textColor="inherit">
          <Tab href="/projects" textColor="inherit" label="Your Work" />
          <Tab href="/people" textColor="inherit" label="People" />
          <Button href="/projects/create" variant="text" size="medium" color="inherit" className={classes.addProject}  startIcon={<AddCircleOutlineIcon />} >
               Create New Project
          </Button>
        </Tabs>
        
      </AppBar>
    </React.Fragment>
  );
}

ProjectsHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProjectsHeader);