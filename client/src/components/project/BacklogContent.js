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
import {  Grid,Toolbar,Button,InputBase, Backdrop, ListItem, ListItemText, ListItemIcon,ListSubheader, List, Divider, Collapse,} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { getWorkItemProject, getSprint } from "../../actions";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import StoryContentEdit from "../issues/StoryContentEdit";
import SprintCreateOverlay from "./SprintCreateOverlay";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import SprintEditOverlay from "./SprintEditOverlay";
import { DragDropContext,Droppable, Draggable} from "react-beautiful-dnd";
import RootRef from "@material-ui/core/RootRef";
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
  icon:{
    position: "absolute",
    left :"-25px",
    top:"21px",
    cursor: "pointer",
  },

});

function BacklogContent(props) {
 const [closed, setClosed]=useState([])
 const [idWi, setIdWi] = useState("");
 const [show, openEditOverlay] = useState(false);
 const [show1, openEditSprintOverlay] = useState(false);
 const [show2, openCreateOverlay] = useState(false);
 const [id_Sprint,setIdSprint]=useState("")
  const { classes } = props;
  var workItem = props.workItemProject;
  const { sprint } = props;
  let one = true;
  let location = useLocation();
  const projectName = location.state.id;
  useEffect(() => {
    const payload = {
      id: location.state.id,
    };
    if (payload !== {}) {
      console.log(payload);
      props.getWorkItemProject(payload);
      props.getSprint(payload);
    }
    
    one = false;
  }, [one]);

    
  const existingSprintIds = []
  for (var property in workItem) {
    if (workItem[property].id) {
      existingSprintIds.push(workItem[property].id);
    }
  }

  for (let index = 0; index < props.sprint.length; index++) {
    if (existingSprintIds.indexOf(props.sprint[index]._id) < 0) {
      workItem[props.sprint[index].name] = {
        items: [],
        id: props.sprint[index]._id,
      }
    }

    workItem[props.sprint[index].name].closed = props.sprint[index].closed;
  }
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
  const showClickSprintOverlay = (id_Sprint) => {
    openEditSprintOverlay(!show1);
    setIdSprint(id_Sprint);
  }
  const [columns, setColumns] = useState(workItem);
  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&destination.index === source.index
    )
    return null;

    // Set start and end variables
    const start = workItem[source.droppableId];
    const end = workItem[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      console.log(start);
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.wi._id,
        list: newList
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.wi._id,
        list: newStartList
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.workItem._id,
        list: newEndList
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }));
      return null;
    }
  };

  var itemsToShow = [];
  let itemList = [];

  for (var property in workItem) {
      const id = property.toString();
      const id_Sprint = workItem[property].id;
      const isClosed = closed.indexOf(id) > -1;
      const isBacklog = id == "Backlog";
      const sprintOpened = !workItem[property].closed;
    itemsToShow = [];
    workItem[property].items.map((wi) => {
      itemsToShow.push(
        <div > 
          {handleIcon(wi.issue_type, wi.priority)}
          <Collapse in={!isClosed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className={classes.listItem}>
            {/* <Droppable droppableId={wi._id}> */}
              <ListItem button onClick={()=>showClick(wi._id)} style={{"cursor":'pointer'}} align="right" className={classes.nested}>
                <Grid container spacing={3}>
                  <Grid item xs={10} className={classes.gridItem}>
                    {iconIssue} {wi.summary}
                  </Grid>
                  <Grid item xs={1}>
                    {iconPriority}
                  </Grid>
                </Grid>
              </ListItem>
              {/* </Droppable> */}
            </List>
          </Collapse>
          <Divider />
        </div>
      );
    });

    function test (props) {
      return(<div>bbb</div>);
    }

    itemList.push(
      <Droppable droppableId={workItem[property].id || "backlog"}>
        {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps}
              component="nav"
              aria-labelledby="nested-list-subheader"
              className={classes.root}
              className={classes.listItem}
            >
              {!isBacklog && <div className={classes.icon} onClick={() => showClickSprintOverlay(id_Sprint)}><BorderColorIcon style={{ fontSize: 17 }} /></div>}
              <ListItem button onClick={() => handleClick(id)} style={!sprintOpened ? { backgroundColor: '#eeeeee', 'border-radius': '15px', cursor: 'not-allowed' } : {}}>
                <ListItemText primary={id} />
                {sprintOpened && (isClosed ? <ExpandMore /> : <ExpandLess />)}
              </ListItem>
              <dv>aaa</dv>
              <test></test>
              {provided.placeholder}
            </List>
      )}
      </Droppable>
    );
    
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                <Button onClick={()=>openCreateOverlay(!show2)} variant="contained" color="primary">
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
        <Backdrop className={classes.backdrop} open={show2}>
          <SprintCreateOverlay/>
        </Backdrop>
        {id_Sprint && <Backdrop className={classes.backdrop} open={show1}>
            <SprintEditOverlay id={id_Sprint}/>
        </Backdrop>}
    </Grid>
    </DragDropContext>
    
  );
}

BacklogContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  workItemProject: state.getWorkItem.workItemProject,
  sprint: state.getSprint.sprint,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getWorkItemProject: getWorkItemProject,
      getSprint: getSprint,
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(BacklogContent);
