import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import {Grid,Toolbar, Button,InputBase,Paper, List,ListItem,Divider, Card, CardContent, Typography,InputLabel,Select,MenuItem,Backdrop,} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {
  getWorkItemProject,
  localUpdateWorkItemStatusItems,
  changeItemPositionStatus,
  changeItemStatus,
} from "../../actions";
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
    width: "99%",
    overflow: "hidden",
    "margin-bottom": "40px",
    backgroundColor: "rgb(244, 245, 247)",
    paddingLeft:"12px"
  },
  title: {
    fontSize: 14,
  },
  rootCard: {
    "margin-bottom": "10px",
    "margin-top": "8px",
    width: "230px",
    height: "150px",
    width: "100%",
  },
  priorityIcon: {
    width: "15px",
    height: "15px",
  },
  divCards: {
    backgroundColor: "rgb(244, 245, 247)",
    height: "100%",
    width: "100%",
  },
  scrollClass: {
    "overflow-y": "scroll",
    "overflow-x": "hidden",
    height: "600px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});
const getIssueIcon = (issue, classes) => {
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
};

const getPriorityIcon = (priority, classes) => {
  if (priority === "Blocker") {
    return (
      <span>
        <Blocker className={classes.priorityIcon} />
      </span>
    );
  } else if (priority === "Critical") {
    return (
      <span>
        <Critical className={classes.priorityIcon} />
      </span>
    );
  } else if (priority === "Major") {
    return (
      <span>
        <Major className={classes.priorityIcon} />
      </span>
    );
  } else if (priority === "Minor") {
    return (
      <span>
        <Minor className={classes.priorityIcon} />
      </span>
    );
  } else if (priority === "Trivial") {
    return (
      <span>
        <Trivial className={classes.priorityIcon} />
      </span>
    );
  }

  return (
    <span>
      <Subtask />
    </span>
  );
};
function WorkItem({ workItem, index, classes,showClick }) {
  return (
    <Draggable draggableId={workItem._id} index={index} classes={classes}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <ListItem
              button
              onClick={() => showClick(workItem._id)}
              style={{ cursor: "pointer" }}
              align="right"
            >
              <Grid container spacing={3}>
                <Card className={classes.rootCard}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textPrimary"
                      gutterBottom
                    >
                      {workItem.summary}
                    </Typography>

                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {workItem.epic_link}
                    </Typography>
                    <br></br>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      <Grid item xs={2}>
                        {getIssueIcon(workItem.issue_type, classes)}
                        {getPriorityIcon(workItem.priority, classes)}
                      </Grid>
                      <Grid item xs={0.3}>
                        {workItem.assignee}
                      </Grid>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </ListItem>
          </div>
        </div>
      )}
    </Draggable>
  );
}

const WorkItemList = React.memo(function WorkItemList({ workItems, classes, showClick }) {
  return workItems.map((workItem, index) => (
    <WorkItem
      workItem={workItem}
      index={index}
      key={workItem.id}
      classes={classes}
      showClick={showClick}
    />
  ));
});

function ActiveSprintContent(props) {
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState('');
  const [idWi, setIdWi] = useState("");
  const [show, setShow] = useState(false);
  var workItem = props.workItemProject;
  let one = true;
  const { classes } = props;
  let location = useLocation();

  function onDragEndItems(result) {
    const destinationStatus = status.filter((s) => s.id == result.destination.droppableId)[0];
    const sourceStatus = status.filter((s) => s.id == result.source.droppableId)[0];

    if (sourceStatus.id !== destinationStatus.id) {
      const [deleted] =  sourceStatus.items.splice(result.source.index, 1);
      let newArrangedItems = []
      for (let index = 0; index < sourceStatus.items.length; index ++) {
        newArrangedItems[index]= sourceStatus.items[index]
        newArrangedItems[index].positionInStatus = index;
        newArrangedItems[index].status = sourceStatus.name;
      }

      let newArrangedItemsDestination = []
      for (let index = 0; index < destinationStatus.items.length; index ++) {
        newArrangedItemsDestination[index]= destinationStatus.items[index]
        newArrangedItemsDestination[index].positionInStatus = index;
        newArrangedItemsDestination[index].status = destinationStatus.name;
      }
      newArrangedItemsDestination[result.destination.index] =  deleted;
      newArrangedItemsDestination[result.destination.index].positionInStatus =  result.destination.index;
      newArrangedItemsDestination[result.destination.index].status=destinationStatus.name
      for (let index = result.destination.index+1; index < destinationStatus.items.length+1; index ++) {
        newArrangedItemsDestination[index]= destinationStatus.items[index-1]
        newArrangedItemsDestination[index].positionInStatus = index ;
        newArrangedItemsDestination[index].status = destinationStatus.name;
      }
      newArrangedItemsDestination.map(i=>{
        newArrangedItems.push(i)
      })
      for(let index=0;index<3;index++){
        if(index!=sourceStatus.id && index!=destinationStatus.id )
          status[index].items.map(i=>{
            i.status=status[index].name
            newArrangedItems.push(i)
          })
      }
      props.localUpdateWorkItemStatusItems({ sprint:destinationStatus.sprint, id: destinationStatus.id, items: newArrangedItems })
      props.changeItemStatus({ id: sourceStatus.id, items: newArrangedItems, status:newArrangedItems.status })

    } else {
      const indexStatus = status.indexOf(destinationStatus);
      let newArrangedItems = [];
      const [removed] = destinationStatus.items.splice(result.source.index, 1);
      for (let index = 0; index < result.destination.index; index++) {
        newArrangedItems[index] = destinationStatus.items[index];
        newArrangedItems[index].positionInStatus = index;
      }
      for (
        let index = result.destination.index;
        index < destinationStatus.items.length;
        index++
      ) {
        newArrangedItems[index + 1] = destinationStatus.items[index];
        newArrangedItems[index + 1].positionInStatus = index + 1;
      }

      removed.positionInStatus = result.destination.index;
      newArrangedItems[result.destination.index] = removed;
      for(let index=0;index<3;index++){
        if(index!=sourceStatus.id)
          status[index].items.map(i=>{
            i.status=status[index].name
            newArrangedItems.push(i)
          })
      }
      props.localUpdateWorkItemStatusItems({
        sprint:destinationStatus.sprint,
        id: destinationStatus.id,
        items: newArrangedItems,
      });
      props.changeItemPositionStatus({
        id: destinationStatus.id,
        items: newArrangedItems,
      });
    }
    console.log(status)

  }

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
  useEffect(() => {
    for (var property in workItem) {
      if(property!=="Backlog"){
        setType(property)
        break
      }
    }
  }, [workItem]);

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const showClick = (idWi) => {
    setShow(!show);
    setIdWi(idWi);
  };
  var itemsToDo = [];
  var itemsInProgress = [];
  var itemsDone = [];

  var allSprints = [];
  var status = [];
  const sortWorkItemsByPosition = (a, b) => {
    if (a.positionInStatus < b.positionInStatus) {
      return -1;
    }
    if (a.positionInStatus > b.positionInStatus) {
      return 1;
    }

    return 0;
  };
  for (var property in workItem) {
    if (property !== "Backlog" && !workItem[property].closed)
      allSprints.push(<MenuItem value={property}>{property}</MenuItem>);
    const id = property.toString();
    if (id === type) {
      workItem[property].items.map((wi) => {
        let item = wi;
        if (wi.status === "To do") {
          itemsToDo.push(item);
        } else if (wi.status === "In progress") {
          itemsInProgress.push(item);
        } else if (wi.status === "Done") {
          itemsDone.push(item);
        }
      });

      status.push({ sprint:id, id: 0, name: "To do", items: itemsToDo });
      status.push({ sprint:id, id: 1, name: "In progress", items: itemsInProgress });
      status.push({ sprint:id, id: 2, name: "Done", items: itemsDone });

      status.map((s) => {
        s.items.sort(sortWorkItemsByPosition);
      });
      console.log(status);
    }
  }

  const refreshData = () =>{
    const payload = {
        id: location.state.id,
      };
      if (payload !== {}) {
        props.getWorkItemProject(payload);
        props.getSprint(payload);
      }
      console.log(props.workItemProject)
    }

  const closeOverlay =() =>{
    setShow(!show)
  }
  const handleSearch = e =>{
    setSearchValue(e.target.value)
  }
  const filterWorkItems = (status) =>{
    let finalItems=[]
    status.items.map(i=>{
      if(i.summary.toUpperCase().substring(0,searchValue.length)===searchValue.toUpperCase()){
        finalItems.push(i)
      }
      
    })
    return finalItems
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
                <InputLabel id="sprint"></InputLabel>
                <Select
                  labelId="sprint"
                  id="sprint"
                  value={type}
                  onChange={handleChange}
                  renderValue={(selected) => {
                    return selected;
                  }}
                >
                  {allSprints}
                </Select>
              </Toolbar>
            </Grid>
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
        <Grid item xs={2} className="paper">
          <Paper className={classes.paper} elevation={0} >
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

        <DragDropContext onDragEnd={onDragEndItems}>
          {status.map((status) => (
            <Droppable droppableId={status.id.toString()}>
              {(provided) => (
                <Grid item xs={2}>
                  <div className={classes.divCards}>
                    <div ref={provided.innerRef} {...provided.droppableProps} className={classes.divCards}>
                      <List
                        component="div" 
                        disablePadding
                        className={classes.listItem}
                      >
                        <WorkItemList
                          workItems={filterWorkItems(status)}
                          classes={classes}
                          showClick={showClick}
                          
                        />
                      </List>
                      {provided.placeholder}
                    </div>
                  </div>
                </Grid>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </Grid>
      {idWi && show && (
        <Backdrop className={classes.backdrop} open={show}>
          <StoryContentEdit _id={idWi} closeOverlay={closeOverlay} refreshData={refreshData}/>
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
      localUpdateWorkItemStatusItems: localUpdateWorkItemStatusItems,
      changeItemPositionStatus: changeItemPositionStatus,
      changeItemStatus:changeItemStatus,
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ActiveSprintContent);
