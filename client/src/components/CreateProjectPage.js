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
});
function CreateProjectPage(props) {
  const { classes } = props;

  return (
    <div>
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
                <Button href="/projects/create/kanban" >
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
  );
}

CreateProjectPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateProjectPage);
