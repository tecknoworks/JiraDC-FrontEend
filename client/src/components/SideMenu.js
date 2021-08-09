import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import DehazeIcon from '@material-ui/icons/Dehaze';
import WorkIcon from '@material-ui/icons/Work';
import { createTheme, ThemeProvider} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

const categoriesProject = [
  {
    id: 'Development',
    children: [
      { id: 'Projects', icon: <WorkIcon />, active: true },
      { id: 'Backlog', icon: <DehazeIcon /> },
      { id: 'Active sprints', icon: <DnsRoundedIcon /> },
    ],
  },
  {
    id: 'Settings',
    children: [
      { id: 'Test sessions', icon: <SettingsIcon /> },
      { id: 'Test sessions', icon: <SettingsIcon /> },
      { id: 'Test sessions', icon: <SettingsIcon /> },
      { id: 'Test sessions', icon: <SettingsIcon /> },
        { id: 'Test sessions', icon: <SettingsIcon /> },
      { id: 'Test sessions', icon: <SettingsIcon /> },
    ],
  },
];
const categoriesCreate = [
  {
    id: 'Project Templates',
    children: [
      { id: 'Software Development', icon: <WorkIcon />, active: true },
     
    ],
  }
];
let theme = createTheme({
  MuiDrawer: {
    paper: {
      backgroundColor: "#ffffff",
    },
  },
  MuiPaper:{
    root:{
    backgroundColor: "#232f3e",}
  },
});
const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 256,
      flexShrink: 0,
      backgroundColor:"#232f3e"
    },
  },
  
});

function SideMenu(props) {
  const { classes, ...other } = props;
  const history=useHistory();
  let categories=" "
    let location=useLocation()
    let content=" "
    if(location.pathname==="/projects" || location.pathname==="/backlog" ||  location.pathname==="/allprojects"){
       categories=categoriesProject
       content=<span>
         
         <ListItem className={clsx(classes.item, classes.itemCategory)}>
         <HomeIcon />Current Project
         </ListItem>
       </span>
    }else if(location.pathname==="/projects/create" || location.pathname==="/projects/create/kanban" || location.pathname==="/projects/create/scrum" || location.pathname==="/projects/create/bugtracking"){
        categories=categoriesCreate
        content=<span></span>
    }
 const selectedChildren=(id) =>{
    //console.log(categoriesProject[0].children)
    console.log(id)
    if(id==="Projects")
    {
      categoriesProject[0].children[0].active=true
      categoriesProject[0].children[1].active=false
      categoriesProject[0].children[2].active=false
      history.push('/allprojects')
    }
    else  if(id==="Backlog")
    {
      categoriesProject[0].children[0].active=false
      categoriesProject[0].children[1].active=true
      categoriesProject[0].children[2].active=false
      history.push('/backlog')
    }
    else  if(id==="Active sprints")
    {
      categoriesProject[0].children[0].active=false
      categoriesProject[0].children[1].active=false
      categoriesProject[0].children[2].active=true
      history.push('/')
    }
    }
  return (
    <ThemeProvider theme={theme}>
    <nav className={classes.drawer}>
      
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Side Menu
        </ListItem>
        {content}
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
                onClick={() => selectedChildren(childId)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </nav>
    </ThemeProvider>
  );
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideMenu);