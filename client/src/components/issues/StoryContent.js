import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Divider, TextField, Box, Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, useLocation, Link,Route, Switch } from "react-router-dom";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from 'react-router-dom';
import { getIssue, getLabel, getProject, getWorkItem, postLabel, postWorkItem, getWorkItemEpic, getWorkItemProject, getComponentProject} from "../../actions";
import { getAllUsers, getPriority, getComponent, getLinkedIssues, getSprint,} from "../../actions";
import FormHelperText from "@material-ui/core/FormHelperText";
import BacklogContent from "../project/backlogContent";
import AllProjectsContent from "../AllProjectsContent";
import ActiveSprintsContent from "../project/ActiveSprintsContent";
import ComponentContent from "../project/ComponentContent";
import ProjectPage from "../ProjectPage";
import CreateProjectPage from "../CreateProjectPage";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
    height: "480px",
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
  header: {},
  mainBox: {
    overflow: "hidden",
    color: "#000",
    "background-color": "#fff",
  },
  headerWorkItem: {
    "padding-left": "24px",
  },
  footerWorkItem: {
    "padding-left": "24px",
    "padding-top": "10px",
  },
}));

function StoryContent(props) {
  const inputRef = useRef("form");
  
  const [resetKey, setResetKey] = useState(0);
  const [projectId, setProjectId] = useState("");
  const [issueTypeId, setIssueTypeId] = useState("");
  const [summary, setSummary] = useState("");
  const [componentsId, setComponentsId] = useState("");
  const [description, setDescription] = useState("");
  const [priorityId, setPriorityId] = useState("");
  const [labelsId, setLabelsId] = useState("");
  const [linkedIssueId, setLinkedIssueId] = useState("");
  const [issueId, setissueId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [epicLinkId, setEpicLinkId] = useState("");
  const [sprintId, setSprintId] = useState("");
  const [epicName, setEpicName] = useState("");
  const [disabledValue, setDisabledValue] = useState(true);
  let location = useLocation();
  let path=location.pathname + location.search
  let users = props.user;
  let priorities = props.priority;
  let components = props.component;
  let linkedissues = props.linkedissues;
  let sprints = props.sprint;
  var projects = props.project;
  var issues = props.issue;
  var labels = props.label;
  var workItem = props.workItem;
  var workItemEpic = props.workItemEpic;
  let one = true;
  useEffect(() => {
    props.getProject();
    props.getIssue();
    props.getLabel();
    props.getAllUsers();
    props.getPriority();
    props.getComponent();
    props.getLinkedIssues();
    props.getSprint();
    props.getWorkItem();
    props.getWorkItemEpic();
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

  const addLabel = (e) => {
    console.log(e.target.value);
  };
  const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));
  const handleCreate = () => {
    const payload = {
      project: projectId,
      issue_type: issueTypeId,
      epic_name: epicName,
      summary: summary,
      description: description,
      priority: priorityId,
      linked_issue: linkedIssueId,
      issue: issueId,
      assignee: assigneeId,
      epic_link: epicLinkId,
      sprint: sprintId,
      labels: labelsId,
      components: componentsId,
    };
    console.log(payload);
    props.postWorkItem(payload);
    wait(1*1000).then(() => {
      const payload = {
        id: location.state.id,
      };
      if (payload !== {}) {
        props.getWorkItemProject(payload);
        props.getComponentProject(payload);
      }
      setResetKey(resetKey + 1);
      setProjectId("")
      setIssueTypeId("")
      setSummary("")
      setComponentsId("")
      setDescription("")
      setPriorityId("")
      setLabelsId("")
      setLinkedIssueId("")
      setissueId("")
      setAssigneeId("")
      setEpicLinkId("")
      setSprintId("")
      setEpicName("")
      setDisabledValue(true)
    })
    props.closeOverlay()
    //history.push(path)
  };
  const resetValues =() =>{
    setResetKey(resetKey + 1);
    setProjectId("")
    setIssueTypeId("")
    setSummary("")
    setComponentsId("")
    setDescription("")
    setPriorityId("")
    setLabelsId("")
    setLinkedIssueId("")
    setissueId("")
    setAssigneeId("")
    setEpicLinkId("")
    setSprintId("")
    setEpicName("")
    setDisabledValue(true)
    props.closeOverlay()
  }
  const handleTextFieldChange = (e) => {
    console.log(e.target.value);
    setSummary(e.target.value);
  };
  const handleEditorChange = () => {
    let data = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    setDescription(data);

    console.log(EditorState.createWithContent(convertFromRaw(JSON.parse(data))))
  };
  const onEditorStateChange = (e) => {
    setEditorState(e);
  };
  const handleTextFieldEpicChange = (e) => {
    setEpicName(e.target.value);
  };
  const handleChangeIssueType = (e) => {
    if (e.name === "Epic") {
      setDisabledValue(!disabledValue);
    }else{
      setDisabledValue(true);
    }
    setIssueTypeId(e._id)
  };
  const choosePath = () =>{
    if(location.pathname==="/backlog")
      return <Route path={path}>
      <BacklogContent/>
      </Route>
    else  if(location.pathname==="/allprojects")
    return <Route path={path}>
    <AllProjectsContent/>
    </Route>
    else  if(location.pathname==="/sprint")
    return <Route path={path}>
    <ActiveSprintsContent/>
    </Route>
    else  if(location.pathname==="/component")
    return <Route path={path}>
    <ComponentContent/>
    </Route>
    else  if(location.pathname==="/mywork")
    return <Route path={path}>
    <ProjectPage/>
    </Route>
    else  if(location.pathname==="/projects/create")
    return <Route path={path}>
    <CreateProjectPage/>
    </Route>
  }
  return (
    <Router>
    <Box width="70%" className={classes.mainBox} height="600px">
      <Grid container spacing={3} className={classes.headerWorkItem}>
        <Grid item sm={12}>
          <h2 className={classes.header}>Create Issue</h2>
        </Grid>
      </Grid>
      <ValidatorForm
                ref={inputRef }
                onSubmit={handleCreate}
                onError={errors => console.log(errors)}
            >
      <Paper className={classes.boxStyle}>
        <Grid container spacing={3}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={11}>
            <br></br>
            <Grid item xs={12}>
              <InputLabel fullWidth shrink required={true}>
                Projects
              </InputLabel>
              <Autocomplete
                id="combo-box-demo"
                options={projects}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                key={resetKey}
                required
                renderInput={(params) => (
                  <TextValidator {...params} variant="outlined" value={projectId} validators={['required' ]}
                  errorMessages={['this field is required']}/>
                )}
                onChange={(event, value) => {
                  setProjectId(value._id);
                }}
              />
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink required={true}>
                Issue Type
              </InputLabel>
              <Autocomplete
                id="combo-box-demo"
                options={issues}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                required
                key={resetKey}
                renderInput={(params) => (
                  <TextValidator {...params} variant="outlined" value={issueTypeId} validators={['required' ]}
                  errorMessages={['this field is required']} />
                )}
                onChange={(event, value) => {
                  handleChangeIssueType(value);
                }}
              />
              <br></br>
              <Grid item sm={12} xs={6}>
                <TextField
                  id="standard-full-width"
                  label="Epic name"
                  required
                  style={{ margin: 0 }}
                  fullWidth
                  disabled={disabledValue}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={epicName}
                  onChange={handleTextFieldEpicChange}
                />
              </Grid>
              <br></br>
              <br></br>
              <Divider />
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <TextValidator
                id="standard-full-width"
                label="Summary"
                //required
                style={{ margin: 0 }}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={summary}
                onChange={handleTextFieldChange}
                validators={['required' ]}
                errorMessages={['this field is required']}
              />
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink>
                Components
              </InputLabel>
              <Autocomplete
                multiple
                id="combo-box-demo"
                limitTags={1}
                key={resetKey}
                options={components}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                onChange={(event, value) => {
                  setComponentsId(value);
                }}
              />
              <FormHelperText>
                Start typing to get a list of possible matches or press down to
                select.
              </FormHelperText>
              <br></br>
            </Grid>
            <br></br>

            <Grid item sm={12}>
              <InputLabel fullWidth shrink>
                Description
              </InputLabel>
              <div
                style={{
                  border: "1px solid black",
                  padding: "2px",
                  minHeight: "400px",
                }}
              >
                <Editor
                  editorState={editorState}
                  onChange={handleEditorChange}
                  onEditorStateChange={onEditorStateChange}
                />
              </div>
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}></Grid>

            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink>
                Priority
              </InputLabel>
              <Autocomplete
                id="combo-box-demo"
                key={resetKey}
                options={priorities}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                required
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                onChange={(event, value) => {
                  setPriorityId(value._id);
                }}
              />
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink>
                Labels
              </InputLabel>
              <Autocomplete
                multiple
                id="multiple-limit-tags"
                limitTags={1}
                options={labels}
                key={resetKey}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                onClose={addLabel}
                onChange={(event, value) => {
                  setLabelsId(value);
                }}
              />
              <br></br>
            </Grid>
            <br></br>
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
              <InputLabel fullWidth shrink>
                Linked Issues
              </InputLabel>
              <Autocomplete
                id="combo-box-demo"
                options={linkedissues}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                key={resetKey}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                onChange={(event, value) => {
                  setLinkedIssueId(value._id);
                }}
              />
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink>
                Issue
              </InputLabel>
              <Autocomplete
                id="combo-box-demo"
                options={workItem}
                getOptionLabel={(option) => option.summary}
                style={{ width: 300 }}
                key={resetKey}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                onChange={(event, value) => {
                  setissueId(value._id);
                }}
              />
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink>
                Assignee
              </InputLabel>
              <Autocomplete
                id="combo-box-demo"
                options={users}
                getOptionLabel={(option) => option.username}
                style={{ width: 300 }}
                required
                key={resetKey}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                onChange={(event, value) => {
                  setAssigneeId(value._id);
                }}
              />
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink>
                Epic Link
              </InputLabel>
              <Autocomplete
                id="combo-box-demo"
                options={workItemEpic}
                getOptionLabel={(option) => option.summary}
                style={{ width: 300 }}
                key={resetKey}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                onChange={(event, value) => {
                  setEpicLinkId(value._id);
                }}
              />
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink >
                Sprint
              </InputLabel>
              <Autocomplete
                id="combo-box-demo"
                options={sprints}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                key={resetKey}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                onChange={(event, value) => {
                  setSprintId(value._id);
                }}
              />
              <br></br>
            </Grid>
            <br></br>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={1} className={classes.footerWorkItem}>
        <Grid item xs={10}></Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
        </Grid>
        
        <Grid item xs={1}>
          <Button onClick={resetValues} color="primary">Cancel</Button>
        </Grid>
      </Grid>
      </ValidatorForm>
    </Box>
     <Switch>{choosePath}
     </Switch>
     </Router>
  );
}

StoryContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.getAllUsers.user,
  loading: state.getAllUsers.loading,
  priority: state.getPriority.priority,
  component: state.getComponent.component,
  project: state.getProject.project,
  loading: state.getProject.loading,
  issue: state.getIssue.issue,
  label: state.getLabel.label,
  linkedissues: state.getLinkedIssues.linkedissues,
  sprint: state.getSprint.sprint,
  workItem: state.getWorkItem.workItem,
  workItemEpic: state.getWorkItem.workItemEpic,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllUsers: getAllUsers,
      getPriority: getPriority,
      getComponent: getComponent,
      getProject: getProject,
      getIssue: getIssue,
      getLabel: getLabel,
      postLabel: postLabel,
      getLinkedIssues: getLinkedIssues,
      getSprint: getSprint,
      getWorkItem: getWorkItem,
      postWorkItem: postWorkItem,
      getWorkItemEpic: getWorkItemEpic,
      getWorkItemProject: getWorkItemProject,
      getComponentProject:getComponentProject,
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(StoryContent);
