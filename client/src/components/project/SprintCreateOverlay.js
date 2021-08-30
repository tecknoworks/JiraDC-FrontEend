import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import {withStyles,makeStyles,} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Divider,TextField,Box,Button,} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, useLocation, Link,Route, Switch } from "react-router-dom";
import { getIssue, getLabel, getProject, postLabel } from "../../actions";
import { getAllUsers, getPriority ,getComponent,getLinkedIssues,getSprint, postComponent, postSprint} from "../../actions";
import FormHelperText from '@material-ui/core/FormHelperText';
import { Component } from "react";
import { TextareaAutosize } from '@material-ui/core';
import BacklogContent from "../project/backlogContent";
const defaultTheme = createMuiTheme();
const styles = (theme) => ({});
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  label: {
    width: "200px",
  },
  boxStyle: {
    "overflow-y": "hidden",
    "overflow-x": "hidden",
    "height": "480px",
  },
  dropDown: {
    flex: "1",
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    padding: "20px",
    "border-width": "2px",
    "border-radius": "2px",
    "border-style": "dashed",
    "background-color": "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    height: "50px",
  },
  formControl: {
    minWidth: "300px",
  },
  header: {

  },
  mainBox: {
    "overflow": "hidden",
    "color": "#000",
    "background-color": "#fff"
  },
  headerWorkItem: {
    "padding-left": "24px"
  },
  footerWorkItem: {
    "padding-left": "24px",
    "padding-top": "10px"
  }
}));

function SprintCreateOverlay(props) {
  let location = useLocation();
  let path=location.pathname+location.search
  let currentProject=location.state.detail;
  var projects = props.project
  let one = true;


  const[name,setName]=useState("");
  const[description,setDescription]=useState("");
    var filp= projects.filter(function (el) {
            return el.name == location.state.detail
        })
  const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));      
  const postSprint = () =>{
    const payload = {
      name: name,
      description: description,
      project_id:filp[0]._id,
    }
    console.log(payload)
    props.postSprint(payload);
    wait(2*1000).then(() => {
      props.refreshData()
    })
    props.closeOverlay()
  }

const handleTextFieldChange = e => {
    setName(e.target.value)
};
const handleTextareaChange = e => {
    setDescription(e.target.value)
};
  useEffect(() => {
    props.getProject()
    props.getSprint()
    props.postSprint()
    one = false;
  }, [one]);
  
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);
  const classes = useStyles();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const addLabel = e =>{
    console.log(e.target.value)

  }
  const choosePath = () =>{
    if(location.pathname==="/backlog")
      return <Route path={path}>
      <BacklogContent />
      </Route>
  }
  return (
    <Router>
    <Box width="70%" className={classes.mainBox} height="600px">
      <Grid container spacing={3} className={classes.headerWorkItem}>
        <Grid item sm={12}>
          <h2 className={classes.header}>Create New Sprint</h2>
        </Grid>
      </Grid>
      <Paper className={classes.boxStyle}>
        <Grid container spacing={3}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={11}>
            <br></br>
            <Grid item sm={12} xs={6}>
                <InputLabel fullWidth shrink required={true}>
                    Sprint Name
                </InputLabel>
                <TextField  onChange={handleTextFieldChange}
                    required
                    id="outlined-required"
                    variant="outlined"
                    style={{ width: 300 }}
                />
            </Grid>
            <br></br>
            <br></br>
            <Divider/>
            <br></br>
            <br></br>
            <InputLabel fullWidth shrink required={true}>
               Description
              </InputLabel>
            <TextareaAutosize onChange={handleTextareaChange}
            style={{ width: 600 , height: 100 ,"resize": "none"}}
            maxRows={4}
            />
            <br></br>
            <Grid item sm={12} xs={6}></Grid>
            <br></br>
            <br></br>
            <Grid item xs={12}>
                <InputLabel fullWidth shrink required={false}>
                    Project
                </InputLabel>
                <TextField 
                    disabled
                    id="outlined-required"
                    variant="outlined"
                    style={{ width: 300 }}
                    defaultValue={currentProject}
                />
            </Grid>
          
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={1} className={classes.footerWorkItem}>
        <Grid item xs={10}></Grid>
        <Grid item xs={1}>
        <Link to={path}>
          <Button onClick={postSprint} variant="contained" color="primary">
            Create
          </Button>
          </Link>
        </Grid>
        <Grid item xs={1}>
        <Link to={path}>
          <Button onClick={props.closeOverlay} color="primary">Cancel</Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
    <Switch>{choosePath}
    </Switch>
    </Router>
  );
}

SprintCreateOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.getAllUsers.user,
  loading: state.getAllUsers.loading,
  priority: state.getPriority.priority,
  component: state.getComponent.component,
  component: state.postComponent.component,
  loading: state.postProject.loading,
  project: state.getProject.project,
  loading: state.getProject.loading,
  issue:state.getIssue.issue,
  label:state.getLabel.label,
  linkedissues: state.getLinkedIssues.linkedissues,
  sprint:state.getSprint.sprint,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProject: getProject,
      getSprint:getSprint,
      postSprint: postSprint,
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SprintCreateOverlay);
