import React, {useState} from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import KanbanTemplatePhoto1 from "../images/kanbantemplate1.png";
import KanbanTemplatePhoto2 from "../images/kanbantemplate2.png";
import KanbanTemplatePhoto3 from "../images/kanbantemplate3.png";
import { bindActionCreators, compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import Epic from "../images/epic.svg";
import Story from "../images/story.svg";
import Bug from "../images/bug.svg";
import Task from "../images/task.svg";
import Subtask from "../images/subtask.svg";
import { postProject } from '../actions';

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
  Kanban: {
    position: "absolute",
    left: "150px",
    top: "20%",
    width: "35px",
    height: "35px",
  },
});
function KanbanTemplate(props) {

  const[name,setName]=useState("");

  const { classes } = props;
  const userData = localStorage.getItem("userData")
  const obj = JSON.parse(userData)
  const postProject = () =>{
    const payload = {
      name: name,
      type:"kanban",
      user_id:obj.id
    }
     console.log(payload)
     props.postProject(payload);
  }
  const handleTextFieldChange = e => {
      setName(e.target.value)
  };
  return (
    <div>
      <Paper className={classes.paper}>


      <Grid container spacing={3}>
            <Grid item xs={2}> </Grid>
     </Grid>

        <Grid container spacing={3}>
            <Grid item xs={1}> </Grid>
            <Grid item xs={4}><TextField id="standard-basic" label="Kanban"  onChange={handleTextFieldChange}/></Grid>
            <Grid item xs={3}> </Grid>
            <Grid item xs={2}> </Grid>
            <Grid item xs={2}></Grid>

        </Grid>




        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={8}>
                <p>
                  Kanban (the Japanese word for "visual signal") is all about
                  helping teams visualize their work, limit work currently in
                  progress, and maximize efficiency. Use the Kanban template to
                  increase planing flexibility, reduce bottlenecks and promote
                  transparency throughout the development cycle.
                </p>
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={3}></Grid>
                <Grid container spacing={3}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={4}>
                    <img
                      src={KanbanTemplatePhoto1}
                      alt="kanbantemplate1"
                      width="250px"
                      height="180px"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    {" "}
                    <h3>Track work using a simple board</h3>
                    <p>
                      Work items are represented visually on your kanban board,
                      allowing teams to track the status of work at any time.
                      The columns on your board represent each step in your
                      team's workflow, from to-do to done{" "}
                    </p>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={3}></Grid>
                <Grid container spacing={3}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={5}>
                    <h3>Use the borad to limit work in progress</h3>
                    <p>
                      Set the maximum amount of work that can exist in each
                      status with work in progress (WIP) limits. By limiting
                      work in progress, you can improve team focus, and better
                      identify inefficiencies and bottlenecks.
                    </p>
                  </Grid>
                  <Grid item xs={6}>
                    <img
                      src={KanbanTemplatePhoto2}
                      alt="kanbantemplate2"
                      width="250px"
                      height="180px"
                    ></img>{" "}
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={3}></Grid>
                <Grid container spacing={3}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={4}>
                    <img
                      src={KanbanTemplatePhoto3}
                      alt="kanbantemplate3"
                      width="250px"
                      height="180px"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <h3>Continuously improve with agile reports</h3>
                    <p>
                      One of the key tenets of kanban is optimizing flow for
                      continuous flow diagram, help ensure your team and
                      consistenly delivering maximum value back to your
                      bussines.
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <h3>Issue Types</h3>

            <Grid container spacing={3}>
            <Grid item xs={1}>
                <Epic/>
            </Grid>
            <Grid item xs={1}>
                 Epic
            </Grid>
            </Grid>

            <Grid container spacing={3}>
            <Grid item xs={1}>
                <Story/>
            </Grid>
            <Grid item xs={1}>
                 Story
            </Grid>
            </Grid>

            <Grid container spacing={3}>
            <Grid item xs={1}>
                <Bug/>
            </Grid>
            <Grid item xs={1}>
                 Bug
            </Grid>
            </Grid>

            <Grid container spacing={3}>
            <Grid item xs={1}>
                <Task/>
            </Grid>
            <Grid item xs={1}>
                 Task
            </Grid>
            </Grid>

            <Grid container spacing={3}>
            <Grid item xs={1}>
                <Subtask/>
            </Grid>
            <Grid item xs={4}>
                 Sub-task
            </Grid>
            </Grid>


            <br></br>
           <h3>Workflow</h3>
         
           <Grid container spacing={3}>
            <Grid item xs={5}>
                 To Do
            </Grid>
            </Grid>

            <Grid container spacing={3}>

            <Grid item xs={5}>
                 In progress
            </Grid>
            </Grid>

            <Grid container spacing={3}>

            <Grid item xs={5}>
                 Done
            </Grid>
            </Grid>

          </Grid>
        </Grid>

        <Grid container spacing={3}>
            <Grid item xs={1}> </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={3}> </Grid>
            <Grid item xs={2}> </Grid>
            <Grid item xs={2}><Button href='/projects' onClick={postProject} variant="contained" color="primary">Use template</Button></Grid>

        </Grid>
        <Grid container spacing={3}>
            <Grid item xs={2}> </Grid>
        </Grid>

      </Paper>
    </div>
  );
}

KanbanTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  project: state.postProject.project,
  loading: state.postProject.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  postProject: postProject
}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(KanbanTemplate);