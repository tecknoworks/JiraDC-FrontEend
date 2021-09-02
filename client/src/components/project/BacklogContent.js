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
import { getWorkItemProject,localUpdateWorkItemSprintItems, changeItemPosition, changeItemPositionBTSprints} from "../../actions";
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
  workItem:{
    "padding-top":"5px",
    "padding-bottom":"5px",
  },
  iconImage:{
    width:"10%",
    "padding-top":"0px",
    "padding-bottom":"0px",
    
  },
  priorityGrid:{
    "max-width": "min-content",
  },
  summary :{
    top:"0px",
  },
  iconPosition:{
    "vertical-align": "top"
  },
  priorityIcon:{
    "vertical-align": "text-bottom",
  },
  buttonCreate:{
    "text-align": "-webkit-right",
  },

});

const getIssueIcon = (issue,classes) => {
  if (issue === "Epic") {
    return (
      
        <Epic className={classes.iconPosition}/>
      
    );
  } else if (issue === "Story") {
    return (
      
        <Story className={classes.iconPosition} />
      
    );
  } else if (issue === "Bug") {
    return (
      
        <Bug className={classes.iconPosition}/>
      
    );
  } else if (issue === "Task") {
    return (
      
        <Task className={classes.iconPosition}/>
      
    );
  } else if (issue === "SubTask") {
    return (
      
        <Subtask className={classes.iconPosition} />
      
    );
  }
}

const getPriorityIcon = (priority, classes) => {
  if (priority === "Blocker") {
    return (
      
        <Blocker width="15" height="15" className={classes.iconPosition, classes.priorityIcon}/>
      
    );
  } else if (priority === "Critical") {
    return (
      
        <Critical width="15" height="15" className={classes.iconPosition, classes.priorityIcon}/>
      
    );
  } else if (priority === "Major") {
    return (
      
        <Major width="15" height="15" className={classes.iconPosition, classes.priorityIcon}/>
      
    );
  } else if (priority === "Minor") {
    return (
      
        <Minor width="15" height="15" className={classes.iconPosition, classes.priorityIcon}/>
      
    );
  } else if (priority === "Trivial") {
    return (
      
        <Trivial width="15" height="15" className={classes.iconPosition, classes.priorityIcon}/>
      
    );
  }
}

function WorkItem({ workItem, index, classes, showClick }) {
  return (
    <Draggable draggableId={workItem._id} index={index} classes={classes}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <ListItem button onClick={() => showClick(workItem._id)} style={{ "cursor": 'pointer',  }} align="right" className={classes.nested, classes.workItem}> 
              <Grid container spacing={0}>
                <Grid item xs={7} className={classes.gridItem}>
                {getIssueIcon(workItem.issue_type,classes)} {workItem.summary}
                </Grid>
                <Grid item xs={2} className={classes.iconImage}>
                {workItem.assignee}
                </Grid>
                <Grid item xs={1} className={classes.iconImage}>
                {workItem.key}
                </Grid>
                <Grid item xs={1} className={classes.iconImage, classes.priorityGrid}>
                {getPriorityIcon(workItem.priority,classes)}
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

const WorkItemList = React.memo(function WorkItemList({ workItems, classes, showClick }) {
  return workItems.map((workItem, index) => (
    <WorkItem workItem={workItem} index={index} key={workItem.id} classes={classes} showClick={showClick}/>
  ));
});


function BacklogContent(props) {
  const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));
 const [searchValue, setSearchValue] = useState("");
 const [closed, setClosed]=useState([])
 const [idWi, setIdWi] = useState("");
 const [show, openEditOverlay] = useState(false);
 const [show1, openEditSprintOverlay] = useState(false);
 const [show2, openCreateOverlay] = useState(false);
 const [id_Sprint,setIdSprint]=useState("")
 const { classes } = props;

  var workItem = props.workItemProject;
  // const { sprint } = props;
  let one = true;
  let location = useLocation();
  const projectName = location.state.id;
  useEffect(() => {
    const payload = {
      id: location.state.id,
    };
    if (payload !== {}) {
      props.getWorkItemProject(payload);
    }
    
    one = false;
  }, [one]);

  const existingSprintIds = []
  for (var property in workItem) {
    if (workItem[property].id) {
      existingSprintIds.push(workItem[property].id);
    }
  }

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
    const sprint = sprints.filter(s => s.id == result.destination.droppableId)[0]; 

    //MOVE ITEMS FROM ONE SPRINT TO ANOTHER
    const Anothersprint = sprints.filter(s => s.id == result.source.droppableId)[0]; 
    if(sprint.id != Anothersprint.id)
    {
      const [deleted] =  Anothersprint.items.splice(result.source.index, 1);
      let newArrangedItems = []
      for (let index = 0; index < Anothersprint.items.length; index ++) {
        newArrangedItems[index]= Anothersprint.items[index]
        newArrangedItems[index].positionInSprint = index;
      }
      
      props.localUpdateWorkItemSprintItems({ id: Anothersprint.id, items: newArrangedItems })
      props.changeItemPosition({ id: Anothersprint.id, items: newArrangedItems })    

      let newArrangedItemsDestination = []
      for (let index = 0; index < sprint.items.length; index ++) {
        newArrangedItemsDestination[index]= sprint.items[index]
        newArrangedItemsDestination[index].positionInSprint = index;
        newArrangedItemsDestination[index].sprint_id=sprint.id
      }
      newArrangedItemsDestination[result.destination.index] =  deleted;
      newArrangedItemsDestination[result.destination.index].positionInSprint =  result.destination.index;
      newArrangedItemsDestination[result.destination.index].sprint_id=sprint.id
      for (let index = result.destination.index+1; index < sprint.items.length+1; index ++) {
        newArrangedItemsDestination[index]= sprint.items[index-1]
        newArrangedItemsDestination[index].positionInSprint = index ;
        newArrangedItemsDestination[index].sprint_id=sprint.id
      }

      props.localUpdateWorkItemSprintItems({ id: sprint.id, items: newArrangedItemsDestination })
      props.changeItemPositionBTSprints({ id: Anothersprint.id, items: newArrangedItemsDestination })    
      wait(1*500).then(() => {
      props.getWorkItemProject(payload);
      })
    }else{
    const indexSprint= sprints.indexOf(sprint)
    let newArrangedItems = []
    const [removed] =  sprint.items.splice(result.source.index, 1);
    for (let index = 0; index < result.destination.index; index ++) {
      newArrangedItems[index]= sprint.items[index]
      newArrangedItems[index].positionInSprint = index;
    }
    for (let index = result.destination.index; index < sprint.items.length; index ++) {
      newArrangedItems[index + 1]= sprint.items[index]
      newArrangedItems[index + 1].positionInSprint = index + 1;
    }

    removed.positionInSprint = result.destination.index;
    newArrangedItems[result.destination.index] =  removed;
    props.localUpdateWorkItemSprintItems({ id: sprint.id, items: newArrangedItems })
    props.changeItemPosition({ id: sprint.id, items: newArrangedItems })    
    wait(1*500).then(() => {
    props.getWorkItemProject(payload);
    })
    }
    
  }
  
  const refreshDataWorkItem = () => {
    const payload = {
      id: location.state.id,
    };
    if (payload !== {}) {
      props.getWorkItemProject(payload);
    }
    console.log(props.workItemProject)
  }
  const closeOverlayWorkItem =() =>{
    openEditOverlay(!show)
  }

  const refreshDataSprint = () => {
    const payload = {
      id: location.state.id,
    };
    if (payload !== {}) {
      console.log("heyyy")
        props.getWorkItemProject(payload);
        wait(2*1000).then(() => {
          console.log("heheheh")
         props.getWorkItemProject(payload);
        })
        
    }
    console.log(props.workItemProject)
  }
  const closeOverlaySprint =() =>{
    openEditSprintOverlay(!show1)
  }

  const refreshDataCreateSprint = () => {
    const payload = {
      id: location.state.id,
    };
    if (payload !== {}) {
      props.getWorkItemProject(payload);
      
    }
    console.log(props.workItemProject)
  }
  const closeOverlayCreateSprint =() =>{
    openCreateOverlay(!show2)
  }

const handleSearch = e =>{
  setSearchValue(e.target.value)
}
//console.log(sprints)
//console.log(workItem)
const filterWorkItems = (sprint) =>{
  let finalItems=[]
  sprint.items.map(i=>{
    if(i.summary.toUpperCase().substring(0,searchValue.length)===searchValue.toUpperCase() && !sprint.closed){
      finalItems.push(i)
    }
    
  })
  return finalItems
}
 const isCollapsed = (id) => {
    return closed.indexOf(id) > -1
  };

  debugger
  return (
    <div>
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
                    onChange={handleSearch}
                  />
                </div>
              </Grid>
              <Grid item sm={2} className={classes.buttonCreate}>
                <Button onClick={()=>openCreateOverlay(!show2)} variant="contained" color="primary">
                  Create Sprint
                </Button>
              </Grid>
            </Toolbar>
          </Grid>
        </Grid>
        <DragDropContext onDragEnd={onDragEndItems}>
          {sprints.map((sprint, index) => (
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
                        {(isCollapsed(sprints[index]) ? <ExpandMore /> : <ExpandLess />)}
                      </ListItem>
                      <Collapse in={!isCollapsed(sprintNames[index])} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding className={classes.listItem}>
                          <WorkItemList workItems={filterWorkItems(sprint)} classes={classes} showClick={showClick}/>
                        </List>
                      </Collapse>
                    </List>
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </Grid>
      {idWi && show &&  (
        <Backdrop className={classes.backdrop} open={show}>
          <StoryContentEdit _id={idWi} refreshData={refreshDataWorkItem} closeOverlay={closeOverlayWorkItem} show={show}/>
        </Backdrop>
      )}
        <Backdrop className={classes.backdrop} open={show2}>
          <SprintCreateOverlay refreshData={refreshDataCreateSprint} closeOverlay={closeOverlayCreateSprint}/>
        </Backdrop>
        {id_Sprint && <Backdrop className={classes.backdrop} open={show1}>
            <SprintEditOverlay id={id_Sprint} refreshData={refreshDataSprint} closeOverlay={closeOverlaySprint}/>
        </Backdrop>}
    </Grid>
    </div>
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
      localUpdateWorkItemSprintItems: localUpdateWorkItemSprintItems,
      changeItemPosition: changeItemPosition,
      changeItemPositionBTSprints: changeItemPositionBTSprints,
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(BacklogContent);
