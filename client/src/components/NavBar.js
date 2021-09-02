import React, { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Logo from '../images/logo.png';
import { AppBar, Toolbar, IconButton, Button, Link, Drawer, List, ListItem, ListItemText, Backdrop, Paper } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import StoryContent from './issues/StoryContent';
import { useRef } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { compose, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core';
import { logout } from '../actions';
const styles = (theme) => ({

});
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    LogoMain: {
      position: 'absolute',
      left: '95px',
      top: '20%',
      width: "35px",
      height: "35px",
    },
    Logo: {
      height: "40px",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

function NavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [show, openOverlay] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const target = useRef(null);
  const { isAuthUser, type, user } = props;
  const logOut = () => {
    const payload = {
      email: user.email,
      password: user.password
    }
    props.logout(payload)
  }
  let logButton = " "
  if (isAuthUser) {
    logButton = <span><Button href="/" color="inherit" style={{ cursor: 'pointer' }} onClick={logOut}><PersonIcon />Log Out</Button></span>
  } else {
    logButton = <span><Button href="/login" color="inherit" style={{ cursor: 'pointer' }}><PersonIcon />Log In</Button></span>
  }


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  let logo = <img src={Logo} alt="logo" className="app-logo" style={{ cursor: 'pointer' }} />
  let value = -1
  if (location.pathname === "/mywork") {
    value = 0
  } else if (location.pathname === "/projects") {
    value = 1
  }
  else if (location.pathname === "/people") {
    value = 2
  }
  const closeOverlayWorkItem = () => {
    openOverlay(!show)
  }

  let navMenu = " "
  if ((location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") && !isAuthUser) {
    navMenu = <span>
    </span>
  } else {
    navMenu = <span><Grid items xs={3} sm={12}>
      <Tabs value={value} textColor="inherit">
        <Tab href="/mywork" textColor="inherit" label="Your work" style={{ cursor: 'pointer' }} />
        <Tab href="/projects" textColor="inherit" label="Projects" style={{ cursor: 'pointer' }} />
        <Tab href="/projects" textColor="inherit" label="People" style={{ cursor: 'pointer' }} />
        <Button onClick={() => openOverlay(!show)} variant="text" size="medium" color="inherit" className={classes.addProject} startIcon={<AddCircleOutlineIcon />} style={{ cursor: 'pointer' }} >
          Create Issue
        </Button>
        <Backdrop className={classes.backdrop} open={show} >
          <StoryContent closeOverlay={closeOverlayWorkItem} />
        </Backdrop>
      </Tabs>
    </Grid></span>
  }
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <a href="/">
            {logo}
          </a>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/" color="inherit" underline="none" variant="h6" className={classes.title} style={{ cursor: 'pointer' }}>
              Jira DC
            </Link>
          </Typography>
          {navMenu}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {logButton}
          </div>

        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
const mapStateToProps = state => ({
  isAuthUser: state.login.isAuthUser,
  user: state.login.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout: logout
}, dispatch);


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(NavBar);