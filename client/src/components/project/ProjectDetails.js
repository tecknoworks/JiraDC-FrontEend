import React,  { useState } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, 
    useLocation } from "react-router-dom";
import backlogContent from './backlogContent';

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
};

function ProjectDetails(props) {

  const { classes } = props;

  let content=" "
    let location=useLocation()
    if(location.pathname==="/project"){
        content= <span><h2>hey</h2></span>
    }else if(location.pathname==="/components"){
        content= <span><ComponentContent/></span>
    }else if(location.pathname==="/backlog"){
      content= <span><backlogContent/></span>
    }
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.app}>
          <main className={classes.main}>
            {content}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

ProjectDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectDetails);