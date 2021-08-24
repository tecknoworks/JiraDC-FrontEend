import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Grid,
  Toolbar,
  Button,
  InputBase,
  Paper,
  List,
  ListItem,
  Divider,
  Card,
  CardContent,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Backdrop,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { getWorkItemProject } from "../../actions";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import Epic from "../../images/epic.svg";
import Story from "../../images/story.svg";
import Bug from "../../images/bug.svg";
import Task from "../../images/task.svg";
import Subtask from "../../images/subtask.svg";
import Blocker from "../../images/blocker.svg";
import Critical from "../../images/critical.svg";
import Major from "../../images/major.svg";
import Minor from "../../images/minor.svg";
import Trivial from "../../images/trivial.svg";
import StoryContentEdit from "../issues/StoryContentEdit";
const styles = (theme) => ({
  root: {
    width: "275px",
    height: "200px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: theme.spacing(-6),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listItem: {
    width: "100%",
  },
  gridItem: {
    "justify-content": "center",
    "align-items": "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paper: {
    width: "230px",
    margin: "auto",
    text: "center",
    overflow: "hidden",
    padding: "0px",
    "margin-bottom": "40px",
    backgroundColor:"rgb(244, 245, 247)",
  },
  title: {
    fontSize: 14,
  },
  rootCard: {
    "margin-bottom": "10px",
    "margin-top": "8px",
    width: "230px",
    height: "150px",
    width:"100%"
  },
  priorityIcon: {
    width: "15px",
    height: "15px",
  },
  divCards:{
      backgroundColor:"rgb(244, 245, 247)",
      height:"100%",
      width:"100%"
  },
  scrollClass:{
    "overflow-y": "scroll",
    "overflow-x": "hidden",
    height: "600px",
  },
  backdrop:{
    zIndex:theme.zIndex.drawer +1,
    color:'#fff',
  },
});

function ActiveSprintContent(props) {
  const [type, setType] = useState('No Sprint');
  const [idWi, setIdWi] = useState("");
  const [show, setShow] = useState(false);
  var workItem = props.workItemProject;
  let one = true;
  const { classes } = props;
  let location = useLocation();
  let iconIssue = <span></span>;
  let iconPriority = <span></span>;
  const handleIcon = (issue, priority) => {
    if (issue === "Epic") {
      iconIssue = (
        <span>
          <Epic />
        </span>
      );
    } else if (issue === "Story") {
      iconIssue = (
        <span>
          <Story />
        </span>
      );
    } else if (issue === "Bug") {
      iconIssue = (
        <span>
          <Bug />
        </span>
      );
    } else if (issue === "Task") {
      iconIssue = (
        <span>
          <Task />
        </span>
      );
    } else if (issue === "SubTask") {
      iconIssue = (
        <span>
          <Subtask />
        </span>
      );
    }

    if (priority === "Blocker") {
      iconPriority = (
        <span>
          <Blocker className={classes.priorityIcon} />
        </span>
      );
    } else if (priority === "Critical") {
      iconPriority = (
        <span>
          <Critical className={classes.priorityIcon} />
        </span>
      );
    } else if (priority === "Major") {
      iconPriority = (
        <span>
          <Major className={classes.priorityIcon} />
        </span>
      );
    } else if (priority === "Minor") {
      iconPriority = (
        <span>
          <Minor className={classes.priorityIcon} />
        </span>
      );
    } else if (priority === "Trivial") {
      iconPriority = (
        <span>
          <Trivial className={classes.priorityIcon} />
        </span>
      );
    }
  };

  useEffect(() => {
    const payload = {
      id: location.state.id,
    };
    if (payload !== {}) {
      console.log(payload);
      props.getWorkItemProject(payload);
    }
    for (var property in workItem) workItem[property].open = true;

    one = false;
  }, [one]);

  const handleChange = (event) => {
    setType(event.target.value)
  }
  const showClick = (idWi) => {
    setShow(!show);
    setIdWi(idWi);
  }
  var noSprint="No Sprint"
  var itemsToDo = [];
  var itemsInProgress = [];
  var itemsDone = [];

  var allSprints=[]
  console.log(props.workItemProject);
  for (var property in workItem) {
    if(property!=="Backlog")
        allSprints.push(
            <MenuItem value={property}>{property}</MenuItem>
        )
    const id = property.toString();
    if (id === type) {
      workItem[property].items.map((wi) => {
        let item = (
          <span>
            {handleIcon(wi.issue_type, wi.priority)}
            <List component="div" disablePadding className={classes.listItem}>
              <ListItem button  onClick={()=>showClick(wi._id)} style={{ cursor: "pointer" }} align="right">
                <Grid container spacing={3}>
                  <Card className={classes.rootCard}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textPrimary"
                        gutterBottom
                      >
                        {wi.summary}
                      </Typography>
                      
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {wi.epic_link}
                      </Typography>
                      <br></br>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                          <Grid item xs={2}>
                        {iconIssue}{iconPriority}
                        </Grid>
                        <Grid item xs={0.3}>
                        {wi.assignee}
                        </Grid>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </ListItem>
            </List>
          </span>
        );
        if (wi.status === "To do") {
          itemsToDo.push(item);
        } else if (wi.status === "In progress") {
          itemsInProgress.push(item);
        } else if (wi.status === "Done") {
          itemsDone.push(item);
        }
      });
    }
  }

  return (
      <div>
    <Grid container spacing={7}>
      <Grid item sm={0.3}></Grid>

      <Grid item sm={11}>
        <Grid container spacing={7}>
          <Grid item sm={10}>
            <h2>Active Sprint</h2>
          </Grid>
          <Grid item sm={2}></Grid>
        </Grid>

        <Grid container spacing={6}>
            <Grid items xs={3}>
        <Toolbar>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon color='action'/>
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <InputLabel id="sprint" defaultValue="No sprint"></InputLabel>
        <Select
          labelId="sprint"
          id="sprint"
          value={type}
          onChange={handleChange}
          renderValue={(selected) => {
            return selected;
          }}
        >
            <MenuItem value={noSprint} >{noSprint}</MenuItem>
          {allSprints}
        </Select>
        </Toolbar></Grid>
        </Grid>
      </Grid>
      </Grid>

        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item sm={0.3}></Grid>



        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={0}>
            <h4>To do</h4>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={0}>
            <h4>In Progress</h4>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={0}>
            <h4>Done</h4>
          </Paper>
        </Grid>
        <br></br>
      </Grid>


      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
        className={classes.scrollClass}
      >
        <Grid item sm={0.3}></Grid>

        <Grid item xs={2}>
         <div className={classes.divCards}>
            {itemsToDo}
          </div>
        </Grid>
        <Grid item xs={2}>
         <div className={classes.divCards}>
            {itemsInProgress}
          </div>
        </Grid>
        <Grid item xs={2}>
         <div className={classes.divCards}>
            {itemsDone}
          </div>
        </Grid>
      </Grid>
      {idWi && show &&  (
        <Backdrop className={classes.backdrop} open={show}>
          <StoryContentEdit _id={idWi} />
        </Backdrop>
      )}
      </div>
  );
}

ActiveSprintContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  workItemProject: state.getWorkItem.workItemProject,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getWorkItemProject: getWorkItemProject,
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ActiveSprintContent);
