import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Kanban from '../images/kanban.svg';
import Scrum from '../images/scrum.svg';
import Bugtracking from '../images/bugtracking.svg';
import { createTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;
const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
  Kanban:{
    position:'absolute',
    left:'150px',
    top:'20%',
    width:"35px",
    height: "35px"
},
root: {
  display: 'flex',
  minHeight: '100vh',
},
drawer: {
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
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
footer: {
  padding: theme.spacing(2),
  background: '#eaeff1',
},
contentShift: {
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: 0,
},
});
function CreateProjectPage(props) {
  const { classes } = props;

  return (
  
    <ThemeProvider theme={theme} >   
      <div className={classes.root} >
        <CssBaseline />
        <div className={classes.app}> 
          <main className={classes.main} >  
             
         
    <Grid >
    <div >
        <h2>Software development</h2>
        <p>Plan, track and release great software. Get up and running quickly with templates that suit the way your team works. Plus, integrations
            for DevOps teams that want to connect work across their entire toolchain
        </p>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary" align="left">
            <h3>Kanban</h3>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography color="textSecondary" align="left">
                <p>
                  Visualize and adbance your project forward using issues on a
                  powerful board.
                </p>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}><Kanban /></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                <Button href="/kanban" >
                        <ArrowForwardIosIcon align="right" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
      <br></br>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary" align="left">
            <h3>Scrum</h3>
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography color="textSecondary" align="left">
                <p>
                  Sprint toward your project goals with a board, backlog, and
                  roadmap.
                </p>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}><Scrum /></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                    <Button href="/projects/create/scrum" >
                        <ArrowForwardIosIcon align="right" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
      <br></br>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary" align="left">
            <h3>Bug tracking</h3>
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography color="textSecondary" align="left">
                <p>Manage a list of development tasks and bugs.</p>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}><Bugtracking/></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                <Button href="/projects/create/bugtracking" >
                        <ArrowForwardIosIcon align="right" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
    </Grid>
    </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

CreateProjectPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateProjectPage);
