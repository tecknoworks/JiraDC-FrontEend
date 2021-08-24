import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles, } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Divider, TextField, Box, Button, } from "@material-ui/core";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { getSprint, updateSprint, userUpdateSprint } from "../../actions";
import { TextareaAutosize } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = (theme) => ({});

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

function SprintEditOverlay(props) {
  let location = useLocation();
  let path = location.pathname + location.search
  let currentProject = location.state.detail;

  const handleChange = (event) => {
    const sprint = getSprintPayload(props.sprint);
    sprint.closed = event.target.checked;
    props.updateSprint(sprint);
  };
  useEffect(() => {
    const temp = props.sprints.find(it => it._id == props.id);
    if (!temp) {
      return;
    }

    const sprint = getSprintPayload(temp);
    props.userUpdateSprint(sprint);

  }, [props.sprints]);

  const updateSprint = () => {
    const sprint = getSprintPayload(props.sprint);
    console.log(sprint)
    debugger
    props.updateSprint(sprint);
  }

  const handleTextFieldChange = e => {
    const sprint = getSprintPayload(props.sprint);
    sprint.name = e.target.value;
    props.userUpdateSprint(sprint);
  };
  const handleTextareaChange = e => {
    const sprint = getSprintPayload(props.sprint);
    sprint.description = e.target.value;
    props.userUpdateSprint(sprint);
  };

  const getSprintPayload = source => {
    return {
      _id: source._id,
      name: source.name,
      description: source.description,
      closed: source.closed,
      project_id: source.project_id,
    }
  }

  useEffect(() => {
    props.getSprint()
  }, []);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);
  const classes = useStyles();

  return (
    <Box width="70%" className={classes.mainBox} height="600px">
      <Grid container spacing={3} className={classes.headerWorkItem}>
        <Grid item sm={12}>
          <h2 className={classes.header}>Edit Sprint Details</h2>
        </Grid>
      </Grid>
      {props.sprint && <Paper className={classes.boxStyle}>
        <Grid container spacing={3}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={11}>
            <FormControlLabel
              control={<Checkbox checked={props.sprint.closed} onChange={handleChange} name="checkedA" />}
              label="Close sprint"
            />
            <br></br>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink required={true}>
                Sprint Name
              </InputLabel>
              <TextField onChange={handleTextFieldChange}
                required
                id="outlined-required"
                variant="outlined"
                style={{ width: 300 }}
                value={props.sprint.name}
              />
            </Grid>
            <br></br>
            <Divider />
            <br></br>
            <InputLabel fullWidth shrink required={true}>
              Description
            </InputLabel>
            <TextareaAutosize onChange={handleTextareaChange}
              value={props.sprint.description}
              style={{ width: 600, height: 100, "resize": "none" }}
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
                value={currentProject}
              />
            </Grid>

          </Grid>
        </Grid>
      </Paper>}
      <Grid container spacing={1} className={classes.footerWorkItem}>
        <Grid item xs={10}></Grid>
        <Grid item xs={1}>
          <Button href={path} onClick={updateSprint} variant="contained" color="primary">
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

SprintEditOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  sprints: state.getSprint.sprint,
  sprint: state.updateSprint.sprint,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSprint: getSprint,
      updateSprint: updateSprint,
      userUpdateSprint: userUpdateSprint,
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SprintEditOverlay);
