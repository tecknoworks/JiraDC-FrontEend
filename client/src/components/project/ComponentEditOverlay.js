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
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { getIssue, getLabel, getProject, postLabel } from "../../actions";
import { getAllUsers, getPriority ,getComponent,getLinkedIssues,getSprint, updateComponent, userUpdateComponent} from "../../actions";
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

function ComponentEditOverlay(props) {
  let location = useLocation();
  let path=location.pathname+location.search
  let users = props.users.map(it => ({_id: it._id, username: it.username}));
  var projects = props.project

  useEffect(() => {
    const temp = props.components.find(it => it._id == props.id);
    if (!temp) {
      return;
    }

    const component = {
      _id: temp._id,
      name: temp.name,
      description: temp.description,
      user_id:temp.user_id, 
      project_id:temp.project_id,
      projectName: temp.projectName
    }
    props.userUpdateComponent(component);

  }, [props.components]);
 
  
  const[name,setName]=useState("");
  const[username,setUsername]=useState("");
  const[description,setDescription]=useState("");
  const userData = localStorage.getItem("userData")

  const updateComponent = () =>{
    const component = {
      _id: props.component._id,
      name: props.component.name,
      description: props.component.description,
      user_id:props.component.user_id, 
      project_id:props.component.project_id,
    }
    console.log(component)
    props.updateComponent(component);
    
  }
  const handleTextFieldChange = e => {
    const component = {
      _id: props.component._id,
      name: props.component.name,
      description: props.component.description,
      user_id:props.component.user_id, 
      project_id:props.component.project_id,
    }
     component.name = e.target.value;
     props.userUpdateComponent(component);
};
const handleTextareaChange = e => {
  const component = {
    _id: props.component._id,
    name: props.component.name,
    description: props.component.description,
    user_id:props.component.user_id, 
    project_id:props.component.project_id,
  }
   component.description = e.target.value;
   props.userUpdateComponent(component);
};

  const classes = useStyles();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const userIndex = users.findIndex(u => u._id === props.component.user_id);
  const selectedUser = users[userIndex];
  console.log("user index" + userIndex)
  // const selectedUser = users.find(it => it._id == props.component.user_id)


  return (
    <Box width="70%" className={classes.mainBox} height="600px">
      <Grid container spacing={3} className={classes.headerWorkItem}>
        <Grid item sm={12}>
          <h2 className={classes.header}>Edit Component</h2>
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
                <TextField  
                    id="outlined-required"
                    variant="outlined"
                    style={{ width: 300 }}
                    value={props.component.name}
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <br></br>
            <Divider/>
            <br></br>
            <InputLabel fullWidth shrink required={true}>
               Description
              </InputLabel>
            <TextareaAutosize onChange={handleTextareaChange}
            value={props.component.description}
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
                {selectedUser && <Autocomplete
                  disabled
                  id="combo-box-demo"
                  options={users}
                  getOptionLabel={(option) => option.username}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  value={selectedUser}
                  onChange={(event, value) => {setUsername(value)}}
                />}
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
                    value={props.component.projectName}
                />
            </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={1} className={classes.footerWorkItem}>
        <Grid item xs={10}></Grid>
        <Grid item xs={1}>
          <Button  href ={path} onClick={updateComponent} variant="contained" color="primary">
            Save
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button href={path} color="primary">Cancel</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

ComponentEditOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.getAllUsers.user,
  components: state.getComponent.component,
  component: state.updateComponent.component,
  project: state.getProject.project,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllUsers: getAllUsers,
      getComponent : getComponent,
      getProject: getProject,
      updateComponent: updateComponent,
      userUpdateComponent: userUpdateComponent
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ComponentEditOverlay);
