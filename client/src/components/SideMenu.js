import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AllProjectsContent from './AllProjectsContent';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ProjectsContent from './ProjectsContent';
import ProjectDetails from './project/ProjectDetails';
import ActiveSprintsContent from './project/ActiveSprintsContent';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import WorkIcon from '@material-ui/icons/Work';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import { useHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";
import ComponentContent from './project/ComponentContent';
import BacklogContent from './project/backlogContent';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import CodeIcon from '@material-ui/icons/Code';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    top:'65px'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    top:'65px'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));
function SideMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  let location = useLocation()
  let content = ""
  if (location.pathname === "/project")
    content = <span><ActiveSprintsContent /></span>
  else
    if (location.pathname === "/components")
      content = <span><ComponentContent /></span>
    else
      if (location.pathname === "/backlog")
        content = <span><BacklogContent /></span>
      else
        if (location.pathname === "/sprint")
          content = <span><ActiveSprintsContent /></span>

  const [open, setOpen] = React.useState(true);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const FunctionalIcons = (index) => {
    if (index === 0)
      return <AssignmentOutlinedIcon />
    else
      if (index === 1)
        return <DnsOutlinedIcon />
      else
        if (index === 2)
          return <WorkOutlineOutlinedIcon />
  }

  const UnusedIcons = (index_unused) => {
    if (index_unused === 0)
      return <DynamicFeedIcon />
    else
      if (index_unused === 1)
        return <TrendingUpIcon />
    else
      if (index_unused === 2)
        return <AddToQueueIcon />
    else
      if (index_unused === 3)
        return <CodeIcon />
    else
      if (index_unused === 4)
        return <CloudQueueIcon />
    else
      if (index_unused === 5)
        return <DirectionsBoatIcon />
      if (index_unused === 6)
        return <PhoneCallbackIcon />
    else
      if (index_unused === 7)
        return  <MenuBookIcon />
    else
      if (index_unused === 8)
        return <SettingsIcon/>
  }


  const chooseStyle=()=>{
  if(location.pathname==="/backlog")
  {
    return [{ color: 'blue'},{ color: 'black'},{ color: 'black'}]
  }
  else  if(location.pathname==="/sprint")
  {
    return [{ color: 'black'},{ color: 'blue'},{ color: 'black'}]
    
  }else  if(location.pathname==="/components")
  {
    return [{ color: 'black'},{ color: 'black'},{ color: 'blue'}]
    
  }
}
  const slectedItem = (index) => {
    if (index === 0) {
      history.push({
        pathname: '/backlog',
        search: location.search,
        state: { detail: location.state.detail, id: location.state.id }
      })
    }
    else
      if (index === 1) {
        history.push({
          pathname: '/sprint',
          search: location.search,
          state: { detail: location.state.detail, id: location.state.id }
        })
      }
      else
        if (index === 2) {
          history.push({
            pathname: '/components',
            search: location.search,
            state: { detail: location.state.detail, id: location.state.id }
          })
        }

  }
  return (
    <div className={classes.root} className="left-menu-project">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose} style={open ? { color: 'black'} : { color: "transparent" }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <h2 style={open ? { color: "#597ef7", 'text-align': "center" } : { color: "#fff" }}>{location.state.detail}</h2>
          {['Backlog', 'Active Sprints', 'Components'].map((text, index) => (

            <ListItem button onClick={() => slectedItem(index)} key={text}  style={chooseStyle()[index]}>
              {<ListItemIcon>{FunctionalIcons(index)}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
          {['Roadmap', 'Reports', 'Issues', 'Code', 'Deployments', 'Releases', 'On-call', 'Project pages', 'Test session'].map((text, index_unused) => (

            <ListItem button key={text}>
              {<ListItemIcon>{UnusedIcons(index_unused)}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {content}
      </main>
    </div>

  );
}
SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SideMenu;