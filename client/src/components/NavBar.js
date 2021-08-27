import React, { useState } from 'react'
import { useRef } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { AppBar, Toolbar, IconButton, Button, makeStyles, Link, Drawer, List, ListItem, ListItemText, Backdrop, Paper } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../images/logo.png';
import ReactDOM from "react-dom";
import { withStyles } from '@material-ui/core';
import { logout } from '../actions';
import PersonIcon from '@material-ui/icons/Person';
import SideMenu from './SideMenu';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grid from '@material-ui/core/Grid';
import Overlay from "react-overlay-component";
import {
    BrowserRouter as Router,
    Switch,
    useLocation
} from "react-router-dom";
import StoryContent from './issues/StoryContent';
const styles = (theme) => ({

});
const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        width:"20%",
        position:'relative',
        left:'55px'
    },
    Logo: {
        position: 'absolute',
        left: '150px',
        top: '20%',
        width: "35px",
        height: "35px",
    },
    LogoMain:{
        position: 'absolute',
        left: '95px',
        top: '20%',
        width: "35px",
        height: "35px",
    },
    backdrop:{
      zIndex:theme.zIndex.drawer +1,
      color:'#fff',
    }
}));

function NavBar(props) {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [show, openOverlay] = useState(false);
    const target = useRef(null);
    const { isAuthUser, type, user } = props;
    const logOut = () => {
        const payload = {
            email: user.email,
            password: user.password
        }
        props.logout(payload)
    }

    const closeOverlayWorkItem =() =>{
        openOverlay(!show)
      }
    
    let logButton = " "
    if (isAuthUser) {
        logButton = <span><Button href="/" color="inherit" style={{float:'right'}} onClick={logOut}><PersonIcon/>Log Out</Button></span>
    } else {
        logButton = <span><Button href="/login" color="inherit" style={{float:'right'}}><PersonIcon/>Log In</Button></span>
    }

    let location = useLocation()
    let content = " "
    if (location.pathname === "/") {
        content = <span></span>
    } else {
      //  content = <span><Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}><SideMenu /></Drawer></span>
    }
    let value = 0
    if (location.pathname === "/projects") {
        value = 0
    } else if (location.pathname === "/allprojects") {
        value = 1
    }
    else if (location.pathname ==="/people") {
        value = 2
    }
    
    let navMenu = " "
    if (location.pathname === "/"||location.pathname === "/login"||location.pathname === "/signup") {
        navMenu = <span>
        </span>
    } else {
        navMenu = <span><Grid items xs={3} sm={12}>
        <Tabs value={value} textColor="inherit">
            <Tab href="/projects" textColor="inherit" label="Your work" />
            <Tab href="/allprojects" textColor="inherit" label="Projects" />
            <Tab href="/projects" textColor="inherit" label="People" />
            <Button  onClick={()=>openOverlay(!show)} variant="text" size="medium" color="inherit" className={classes.addProject} startIcon={<AddCircleOutlineIcon />} >
                Create Issue 
            </Button>
            <Backdrop className={classes.backdrop} open={show} >
                <StoryContent closeOverlay={closeOverlayWorkItem}/>
            </Backdrop>
        </Tabs> 
        </Grid></span>
    }

    let logo=" "
    if (location.pathname === "/"||location.pathname === "/login"||location.pathname === "/signup") {
      logo = 
        <span>
             <img src={Logo} alt="logo" className={classes.LogoMain}/>
        </span>
      
    } else {
      logo = <span> <img src={Logo} alt="logo" className={classes.Logo}/></span>
    }
    return (
        <AppBar position="static">
            <Toolbar>
            
                <Link href="/" color="inherit" underline="none" variant="h6" className={classes.title}>
                    Jira DC
                </Link>
                <a href="/">
                   {logo}
                </a>
                 {navMenu}
                <Grid items  sm={10}>   
                  {logButton} 
                </Grid>
            </Toolbar>
            {content}
        </AppBar>
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