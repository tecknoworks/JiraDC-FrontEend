import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles, MuiThemeProvider, } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import { Divider, Toolbar, TextField, Box, Card, Slide, Button, } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import MUIRichTextEditor from "mui-rte";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createMuiTheme } from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
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
    "overflow-y": "scroll",
    "overflow-x": "hidden",

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
    height: '50px'
  },
  formControl:{
    minWidth:'300px',
  }

}));

function StoryContent(props) {
  let location = useLocation()
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);
  const classes = useStyles();
  const [project, setProject] = useState("");
  const [issuetype, setIssueType] = useState("");
  const [priority, setPriority] = useState("");
  const [component, setComponent] = useState("");
  const [labels, setLabels] = useState("");

  const [linkedissues, setLinkedIssues] = useState("");
  const [issue, setIssue] = useState("");
  const [assignee, setAssignee] = useState("");
  const [epiclink, setEpicLink] = useState("");
  const [sprint, setSprint] = useState("");

  const handleChangeProject = (event) => {
    setProject(event.target.value);
  };
  const handleChangeIssueType = (event) => {
    setIssueType(event.target.value);
  };
  const handleChangeComponent = (event) => {
    setComponent(event.target.value);
  };
  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };
  const handleChangeLabels = (event) => {
    setLabels(event.target.value);
  };


  const handleChangeLinkedIssues = (event) => {
    setLinkedIssues(event.target.value);
  };
  const handleChangeIssue = (event) => {
    setIssue(event.target.value);
  };
  const handleChangeAssignee = (event) => {
    setAssignee(event.target.value);
  };
  const handleChangeEpicLink = (event) => {
    setEpicLink(event.target.value);
  };
  const handleChangeSprint = (event) => {
    setSprint(event.target.value);
  };
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <Box width="70%" className={classes.boxStyle} height="75%">
      <Paper>
        <Grid container spacing={3}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={11}>
            <Grid item sm={12}>
              <h2>Create Issue</h2>
            </Grid>

            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.label} shrink required={true}>
                  Project
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={project}
                  onChange={handleChangeProject}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel fullWidth shrink required={true}>
                  Issue Type
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={issuetype}
                  onChange={handleChangeIssueType}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <br></br>
              <br></br>
              <Divider />
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <TextField
                id="standard-full-width"
                label="Summary"
                required
                style={{ margin: 0 }}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel fullWidth shrink required={true}>
                  Components
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={component}
                  onChange={handleChangeComponent}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <br></br>
            </Grid>
            <br></br>

            <Grid item sm={12}>
              <div
                style={{
                  border: "1px solid black",
                  padding: "2px",
                  minHeight: "400px",
                }}
              >
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                />
              </div>
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}></Grid>

            <Grid item sm={12} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel fullWidth shrink required={true}>
                  Priority
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={priority}
                  onChange={handleChangePriority}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel fullWidth shrink required={true}>
                  Labels
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={labels}
                  onChange={handleChangeLabels}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}></Grid>

            <Grid item sm={12} xs={6}>
              <br></br>
              Attachment

              <section className={classes.dropDown}>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <CloudUploadIcon />
                  Drop files to attach, or browse.
                </div>
              </section>
              <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
              </aside>
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel fullWidth shrink required={true}>
                  Linked Issues
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={linkedissues}
                  onChange={handleChangeLinkedIssues}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel fullWidth shrink required={true}>
                  Issue
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={issue}
                  onChange={handleChangeIssue}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel fullWidth shrink required={true}>
                  Assignee
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={assignee}
                  onChange={handleChangeAssignee}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel fullWidth shrink required={true}>
                  Epic Link
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={epiclink}
                  onChange={handleChangeEpicLink}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel fullWidth shrink required={true}>
                  Sprint
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={sprint}
                  onChange={handleChangeSprint}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br></br>
            <Grid container spacing={1}>
              <Grid item xs={10}></Grid>
              <Grid item xs={1}>
                <Button variant="contained" color="primary">
                  Create
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button href={location.pathname} color="primary">Cancel</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

StoryContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default StoryContent;
