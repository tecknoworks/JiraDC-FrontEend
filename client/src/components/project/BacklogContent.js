import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
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

import {
  Grid,
  Toolbar,
  Button,
  InputBase,
  Backdrop,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  List,
  Divider,
  Collapse,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { getWorkItemProject } from "../../actions";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
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
  backdrop:{
    zIndex:theme.zIndex.drawer +1,
    color:'#fff',
  },
});

function BacklogContent(props) {
 const [closed, setClosed]=useState([])
 const [idWi, setIdWi] = useState("");
 const [show, openEditOverlay] = useState(false);
  const { classes } = props;
  var workItem = props.workItemProject;
  let one = true;
  let location = useLocation();
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
          <Blocker width="35%" height="35%" />
        </span>
      );
    } else if (priority === "Critical") {
      iconPriority = (
        <span>
          <Critical width="35%" height="35%" />
        </span>
      );
    } else if (priority === "Major") {
      iconPriority = (
        <span>
          <Major width="35%" height="35%" />
        </span>
      );
    } else if (priority === "Minor") {
      iconPriority = (
        <span>
          <Minor width="35%" height="35%" />
        </span>
      );
    } else if (priority === "Trivial") {
      iconPriority = (
        <span>
          <Trivial width="35%" height="35%" />
        </span>
      );
    }
  };

  const handleClick = (property) => {
    const newClosed = JSON.parse(JSON.stringify(closed));
    const index = newClosed.indexOf(property);
    if (index > -1) {
        newClosed.splice(index, 1);
    }
    else {
        newClosed.push(property);
    }
    
    setClosed(newClosed)
  };

  const showClick = (idWi) => {
    openEditOverlay(!show);
    setIdWi(idWi);
  }

  var itemsToShow = [];
  let itemList = [];
  for (var property in workItem) {
      const id = property.toString();
      const isClosed = closed.indexOf(id) > -1;
    itemsToShow = [];
    workItem[property].map((wi) => {
      itemsToShow.push(
        <div>
          {handleIcon(wi.issue_type, wi.priority)}
          <Collapse in={!isClosed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className={classes.listItem}>
              <ListItem button onClick={()=>showClick(wi._id)} style={{"cursor":'pointer'}}align="right" className={classes.nested}>
                <Grid container spacing={3}>
                  <Grid item xs={10} className={classes.gridItem}>
                    {iconIssue} {wi.summary}
                  </Grid>
                  <Grid item xs={1}>
                    {iconPriority}
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Collapse>
          <Divider />
        </div>
      );
    });
    itemList.push(
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
        className={classes.listItem}
      >
        <ListItem button onClick={() => handleClick(id)}>
          <ListItemText primary={id} />
          {isClosed ? <ExpandMore /> : <ExpandLess />}
        </ListItem>
        {itemsToShow}
      </List>
    );
  }
  return (
    <Grid container spacing={7}>
      <Grid item sm={0.3}></Grid>

      <Grid item sm={11}>
        <Grid container spacing={7}>
          <Grid item sm={10}>
            <h2>Backlog</h2>
          </Grid>
          <Grid item sm={2}></Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid items xs={12}>
            <Toolbar>
              <Grid item xs={12}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon color="action" />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Grid>
              <Grid item sm={2}>
                <Button variant="contained" color="primary">
                  Create Sprint
                </Button>
              </Grid>
            </Toolbar>
          </Grid>
        </Grid>

        {itemList}
      </Grid>
      {idWi && show &&  (
        <Backdrop className={classes.backdrop} open={show}>
          <StoryContentEdit _id={idWi} />
        </Backdrop>
      )}
    </Grid>
  );
}

BacklogContent.propTypes = {
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
)(BacklogContent);
