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

const getIssueIcon = (issue) => {
  if (issue === "Epic") {
    return (
      <span>
        <Epic />
      </span>
    );
  } else if (issue === "Story") {
    return (
      <span>
        <Story />
      </span>
    );
  } else if (issue === "Bug") {
    return (
      <span>
        <Bug />
      </span>
    );
  } else if (issue === "Task") {
    return (
      <span>
        <Task />
      </span>
    );
  } else if (issue === "SubTask") {
    return (
      <span>
        <Subtask />
      </span>
    );
  }

  return (
    <span>
      <Subtask />
    </span>
  );
}

const getPriorityIcon = (priority) => {
  if (priority === "Blocker") {
    return (
      <span>
        <Blocker width="35%" height="35%" />
      </span>
    );
  } else if (priority === "Critical") {
    return (
      <span>
        <Critical width="35%" height="35%" />
      </span>
    );
  } else if (priority === "Major") {
    return (
      <span>
        <Major width="35%" height="35%" />
      </span>
    );
  } else if (priority === "Minor") {
    return (
      <span>
        <Minor width="35%" height="35%" />
      </span>
    );
  } else if (priority === "Trivial") {
    return (
      <span>
        <Trivial width="35%" height="35%" />
      </span>
    );
  }

  return (
    <span>
      <Subtask />
    </span>
  );
}

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom = {
    id: `id-${k}`,
    content: `Quote ${k}`
  };

  return custom;
});

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function WorkItem({ workItem, index, classes }) {
  return (
    <Draggable draggableId={workItem._id} index={index} classes={classes}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <ListItem button onClick={() => showClick(workItem._id)} style={{ "cursor": 'pointer' }} align="right" className={classes.nested}> 
              <Grid container spacing={3}>
                <Grid item xs={10} className={classes.gridItem}>
                  {getIssueIcon(workItem.issue_type)} {workItem.summary}
                </Grid>
                <Grid item xs={1}>
                  {getPriorityIcon(workItem.priority)}
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        </div>
      )}
    </Draggable>
  );
}

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.content}
        </div>
      )}
    </Draggable>
  );
}

const WorkItemList = React.memo(function WorkItemList({ workItems, classes }) {
  return workItems.map((workItem, index) => (
    <WorkItem workItem={workItem} index={index} key={workItem.id} classes={classes} />
  ));
});

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return quotes.map((quote, index) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ));
});

function BacklogContent(props) {

  const [state, setState] = useState({ quotes: initial });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({ quotes });
  }

 const [closed, setClosed]=useState([])
 const [idWi, setIdWi] = useState("");
 const [show, openEditOverlay] = useState(false);
 const [show1, openEditSprintOverlay] = useState(false);
 const [show2, openCreateOverlay] = useState(false);
 const [id_Sprint,setIdSprint]=useState("")
 const { classes } = props;

  var workItem = props.workItemProject;
  debugger
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

  var itemsToShow = [];
  let itemList = [];
  let sprints = [];
  let sprintNames = [];
  const sortWorkItemsByPosition = ( a, b ) => {
    if (a.positionInSprint < b.positionInSprint) {
      return -1;
    }
    if (a.positionInSprint > b.positionInSprint) {
      return 1;
    }
  
    // names must be equal
    return 0;
  } 
  for (var property in workItem) {
    workItem[property].items.sort(sortWorkItemsByPosition)
    sprints.push(workItem[property]);
    sprintNames.push(property);
  }

  function onDragEndItems(result) {
    debugger
    const sprint = sprints.filter(s => s.id == result.destination.droppableId)[0];
    const [removed] = sprint.items.splice(result.source.index, 1);
    sprint.items.splice(result.destination.index, 0, removed);
    debugger
    
    // let sourceItem = sprint.items[result.source.index];
    // let destinationItem = sprint.items[result.destination.index];
    // sourceItem.positionInSprint = destinationItem.positionInSprint;
    // for (let index = result.destination.index; index < result.source.index; index++ ) {
    //   sprint.item[index].positionInSprint = sprint.item[index].positionInSprint + 1;
    // }
    
  }

  //workItem.sort((a, b) => (a.color > b.color) ? 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 )
  
 const isCollapsed = (id) => {
    return sprintNames.indexOf(id) > -1
  };

  for (var property in workItem) {
      const id = property.toString();
      const id_Sprint = workItem[property].id;
      const isClosed = closed.indexOf(id) > -1;
      const sprintOpened = !workItem[property].closed;
    itemsToShow = [];
    workItem[property].items.map((wi) => {
      itemsToShow.push(
        <div> 
          {handleIcon(wi.issue_type, wi.priority)}
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
          <Divider />
        </div>
      );
    });
    itemList.push(
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root, classes.listItem}
      >
        <div className={classes.icon} onClick={() => showClickSprintOverlay(id_Sprint)}><BorderColorIcon style={{ fontSize: 17 }} /></div>
        <ListItem button onClick={() => handleClick(id)} style={!sprintOpened ? { backgroundColor: '#eeeeee', 'border-radius': '15px', cursor: 'not-allowed' } : {}}>
          <ListItemText primary={id} />
          {sprintOpened && (isClosed ? <ExpandMore /> : <ExpandLess />)}
        </ListItem>
        <Collapse in={!isClosed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.listItem}>
          {itemsToShow}
          </List>
        </Collapse>
      </List>
    );
  }
  let workItemListDrop = null;
    if (workItem && workItem["Sprint 1"]) {
      workItemListDrop = workItem["Sprint 1"];
    }

    debugger
  return (
    <Grid container spacing={7}>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <span>Test</span>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

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
        {sprints.map((sprint, index) => (
          <DragDropContext onDragEnd={onDragEndItems}>
          <Droppable droppableId={sprint.id.toString()}>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div>
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      className={classes.root, classes.listItem}
                    >
                      <div className={classes.icon} onClick={() => showClickSprintOverlay(sprint.id)}><BorderColorIcon style={{ fontSize: 17 }} /></div>
                      <ListItem button onClick={() => handleClick(sprintNames[index])} style={sprint.closed ? { backgroundColor: '#eeeeee', 'border-radius': '15px', cursor: 'not-allowed' } : {}}>
                        <ListItemText primary={sprintNames[index]} />
                        {!sprint.closed && (isCollapsed(sprints[index]) ? <ExpandMore /> : <ExpandLess />)}
                      </ListItem>
                      <Collapse in={!isCollapsed(sprints[index])} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding className={classes.listItem}>
                          <WorkItemList workItems={sprint.items} classes={classes} />
                        </List>
                      </Collapse>
                    </List>
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        ))}
        
        {/* {itemList} */}
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
