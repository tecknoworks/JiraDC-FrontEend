import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import {withStyles,makeStyles,} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Divider,TextField,Box,Button,} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { getIssue, getLabel, getProject, postLabel } from "../../actions";
import { getAllUsers, getPriority ,getComponent,getLinkedIssues,getSprint, postComponent} from "../../actions";
import FormHelperText from '@material-ui/core/FormHelperText';
import { Component } from "react";
import { TextareaAutosize } from '@material-ui/core';

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
    // Use the system font instead of the default Roboto font.
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

function ComponentOverlay(props) {
  let location = useLocation();
  let path=location.pathname+location.search
  let currentProject=location.state.detail;
  let users = props.user;
  let priorities = props.priority;
  let components = props.component;
  let linkedissues = props.linkedissues;
  let sprints = props.sprint;

  var projects = props.project
  var issues=props.issue
  var labels=props.label
  var tbc=[]

  let one = true;
  const[name,setName]=useState("");
  const[username,setUsername]=useState("");
  const[description,setDescription]=useState("");
  const userData = localStorage.getItem("userData")
    var fil= users.filter(function (el) {
            return el._id == username._id
        })
    var filp= projects.filter(function (el) {
            return el.name == location.state.detail
        })
  const postComponent = () =>{
    const payload = {
      name: name,
      description: description,
      user_id:fil[0]._id, 
      project_id:filp[0]._id,
    }
    console.log(payload)
     props.postComponent(payload);
  }

  const handleTextFieldChange = e => {
    setName(e.target.value)
};
const handleTextareaChange = e => {
    setDescription(e.target.value)
};
  useEffect(() => {
    props.getProject()
    props.getIssue()
    props.getLabel()
    props.getAllUsers()
    props.getPriority()
    props.getComponent()
    props.getLinkedIssues()
    props.getSprint()
    console.log(props.project);
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
  return (
    <Box width="70%" className={classes.mainBox} height="600px">
      <Grid container spacing={3} className={classes.headerWorkItem}>
        <Grid item sm={12}>
          <h2 className={classes.header}>Create New Component</h2>
        </Grid>
      </Grid>
      <Paper className={classes.boxStyle}>
        <Grid container spacing={3}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={11}>
            <br></br>
            <Grid item sm={12} xs={6}>
                <InputLabel fullWidth shrink required={true}>
                    Component Name
                </InputLabel>
                <TextField  onChange={handleTextFieldChange}
                    required
                    id="outlined-required"
                    variant="outlined"
                    style={{ width: 300 }}
                />
            </Grid>
            <br></br>
            <Divider/>
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

            <Grid item sm={12} xs={6}>
                <InputLabel fullWidth shrink required={true}>
                  Component Lead
                </InputLabel>
                <Autocomplete
                  id="combo-box-demo"
                  options={users}
                  getOptionLabel={(option) => option.username}
                  style={{ width: 300 }}
                  required
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  onChange={(event, value) => {setUsername(value)}}
                />
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
        </Grid>
      </Paper>
      <Grid container spacing={1} className={classes.footerWorkItem}>
        <Grid item xs={10}></Grid>
        <Grid item xs={1}>
          <Button href ={path} onClick={postComponent} variant="contained" color="primary">
            Create
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button href={path} color="primary">Cancel</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

ComponentOverlay.propTypes = {
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
      getAllUsers: getAllUsers,
      getPriority: getPriority,
      getComponent : getComponent,
      getProject: getProject,
      getIssue: getIssue,
      getLabel: getLabel,
      postLabel: postLabel,
      getLinkedIssues:getLinkedIssues,
      getSprint:getSprint,
      postComponent: postComponent,
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ComponentOverlay);