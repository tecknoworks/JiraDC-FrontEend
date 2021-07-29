import React, { useState } from 'react';

import { AppBar, Toolbar, IconButton, Button, makeStyles, Link, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavBar() {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton onClick={() => setDrawerOpen(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>

                <Link href="/" color="textPrimary" underline="none" variant="h6" className={classes.title}>
                   Jira DC
                </Link>

                <Button href="/login" color="inherit">Log In</Button>
            </Toolbar>
        </AppBar>
    );
}