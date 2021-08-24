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
import { Divider, TextField, Box, Button, IconButton } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  getIssue,
  getLabel,
  getProject,
  getWorkItem,
  postLabel,
  postWorkItem,
  getWorkItemEpic,
  getWorkItemById,
  userUpdateWorkItem,
  updateWorkItem,
  getAllUsers,
  getPriority,
  getComponent,
  getLinkedIssues,
  getSprint,
  postComment,
  putComment,
} from "../../actions";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Comment, Form, Header } from "semantic-ui-react";
import EditIcon from '@material-ui/icons/Edit';
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function StoryContentEdit(props) {
  const [message, setMessage] = useState("");
  const [commentsButton, setCommentsButton]=useState("")
  const textMessage= useRef("")
  const [editedMessage, setEditedMessage]=useState("")
  const [commentsToShow, setCommentsToShow] = useState([]);
  const [componentsId, setComponentsId] = useState("");
  const [labelsId, setLabelsId] = useState("");
  const [disabledValue, setDisabledValue] = useState(true);
  let location = useLocation();
  let path = location.pathname + location.search;
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
  var workItemById = props.workItemById;
  var updatedWorkItem = props.updatedWorkItem;

  const userData = localStorage.getItem("userData");
  const obj = JSON.parse(userData);
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
    props.getWorkItemById({ _id: props._id });

    one = false;
  }, [one]);

  let selectedComponent = [];
  var selectedComponentFinal = [{ name: " " }];

  let selectedLabel = [];
  var selectedLabelFinal = [{ name: " " }];

  const handleSaveEdit = (user,date,old_content ) =>{
    let payload = takeValues();
    let lastComments = payload.comments;

    var [userComment]= users.filter(function (el) {
      return el.username == user
  })

  console.log(userComment)
    console.log(textMessage.current)
    let comm = {
      user: user,
      work_item: props._id,
      content: textMessage.current,
      date: {
        day: date.day,
        hour: date.hour,
        minute: date.minute,
        month: date.month,
        year: date.year,
        seconds: date.seconds,
        miliseconds: date.miliseconds
      },
    };

    let indexComm=lastComments.findIndex(x => x.user===user && x.work_item===comm.work_item && x.content===old_content && x.date.day===comm.date.day && x.date.month===comm.date.month && x.date.hour===comm.date.hour && x.date.minute===comm.date.minute && x.date.year===comm.date.year)
    console.log(indexComm)
    lastComments[indexComm]=comm
    console.log(lastComments)
    payload.comments = lastComments;
    props.userUpdateWorkItem(payload);
    handleComments(lastComments);
    let putComm = {
      user: userComment._id,
      work_item: props._id,
      content: textMessage.current,
      date: {
        day: date.day,
        hour: date.hour,
        minute: date.minute,
        month: date.month,
        year: date.year,
        seconds: date.seconds,
        miliseconds: date.miliseconds
      },
    };
    console.log(putComm)
    props.putComment(putComm);
    //setMessage("");
    textMessage.current=""
  }
  const handleEdit = (commentList,user,date,content) =>{
    var formattedComments = [];
    commentList.map((c) => {
      if(user===c.user && c.content===content){
        setCommentsButton(<span></span>)
        textMessage.current=content
      formattedComments.push(
        <div>
          <Comment> 
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <Comment.Content>
              <Comment.Author as="a" ><b>{c.user}</b></Comment.Author>
              <Comment.Metadata>
                <div>
                  <i>{c.date.year}/{c.date.month + 1}/{c.date.day} - {c.date.hour}:
                  {c.date.minute}</i>
                </div>
              </Comment.Metadata>
            </Comment.Content>
            <Button onClick={() =>handleSaveEdit(user,date,content)}>Save Changes</Button>
          </Comment>
          <Divider />
        </div>
      );}
    });
    setCommentsToShow(formattedComments);
  }
  const handleComments = (commentList) => {
    var formattedComments = [];
    setCommentsButton(<span><Form.Button
      onClick={() => {
        addReply();
      }}
    >
      Add reply
    </Form.Button></span>)
    commentList.map((c) => {
      formattedComments.push(
        <div>
          <Comment> 
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <Comment.Content>
              <Comment.Author as="a" ><b>{c.user}</b></Comment.Author>
              <Comment.Metadata>
                <div>
                  <IconButton onClick={()=>handleEdit(commentList,c.user,c.date,c.content)} width="10%" height="10%"><EditIcon /></IconButton>
                  <i>{c.date.year}/{c.date.month + 1}/{c.date.day} - {c.date.hour}:
                  {c.date.minute}</i>
                </div>
              </Comment.Metadata>
              <Comment.Text>{c.content}</Comment.Text>
            </Comment.Content>
          </Comment>
          <Divider />
        </div>
      );
    });
    setCommentsToShow(formattedComments);
  };
  useEffect(() => {
    const currentIssue = props.workItem.find((it) => it._id == props._id);
    if (!currentIssue) {
      return;
    }
    for (let i = 0; i < currentIssue.component.length; i++) {
      let componentIndex = components.findIndex(
        (c) => c._id === currentIssue.component[i].component
      );
      selectedComponent.push(components[componentIndex]);
    }

    if (selectedComponent) {
      selectedComponentFinal = selectedComponent;
    }

    for (let i = 0; i < currentIssue.label.length; i++) {
      let labelIndex = labels.findIndex(
        (c) => c._id === currentIssue.label[i].label
      );
      selectedLabel.push(labels[labelIndex]);
    }

    if (selectedLabel) {
      selectedLabelFinal = selectedLabel;
    }

    const issue = {
      _id: currentIssue._id,
      project: currentIssue.project,
      issue_type: currentIssue.issue_type,
      epic_name: currentIssue.epic_name,
      summary: currentIssue.summary,
      description: currentIssue.description,
      priority: currentIssue.priority,
      linked_issue: currentIssue.linked_issue,
      issue: currentIssue.issue,
      assignee: currentIssue.assignee,
      epic_link: currentIssue.epic_link,
      sprint: currentIssue.sprint,
      labels: selectedLabelFinal,
      components: selectedComponentFinal,
      comments: currentIssue.comments,
    };
    console.log(issue);
    handleComments(issue.comments);
    if (currentIssue.description !== "") {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(currentIssue.description))
        )
      );
    }
    props.userUpdateWorkItem(issue);
  }, [props.workItem]);

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

  const handleTextFieldChange = (e) => {
    const payload = takeValues();
    payload.summary = e.target.value;
    props.userUpdateWorkItem(payload);
  };
  const handleEditorChange = () => {
    let data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    setDescription(data);
    const payload = takeValues();
    payload.description = data;
    props.userUpdateWorkItem(payload);
  };
  const onEditorStateChange = (e) => {
    setEditorState(e);
  };
  const handleTextFieldEpicChange = (e) => {
    const payload = takeValues();
    payload.epicName = e.target.value;
    props.userUpdateWorkItem(payload);
  };
  const handleChangeIssueType = (e) => {
    if (e.name === "Epic") {
      setDisabledValue(!disabledValue);
    } else {
      setDisabledValue(true);
    }
    const payload = takeValues();
    payload.issue_type = e._id;
    props.userUpdateWorkItem(payload);
  };
  const handleChangeProject = (e) => {
    const payload = takeValues();
    payload.project = e._id;
    props.userUpdateWorkItem(payload);
  };
  const handleChangePriority = (e) => {
    const payload = takeValues();
    payload.priority = e._id;
    props.userUpdateWorkItem(payload);
  };
  const handleChangeLinkedIssue = (e) => {
    const payload = takeValues();
    payload.linked_issue = e._id;
    props.userUpdateWorkItem(payload);
  };

  const handleChangeIssue = (e) => {
    const payload = takeValues();
    payload.issue = e._id;
    props.userUpdateWorkItem(payload);
  };

  const handleChangeAssignee = (e) => {
    const payload = takeValues();
    payload.assignee = e._id;
    props.userUpdateWorkItem(payload);
  };

  const handleChangeEpicLink = (e) => {
    const payload = takeValues();
    payload.epic_link = e._id;
    props.userUpdateWorkItem(payload);
  };

  const handleChangeSprint = (e) => {
    const payload = takeValues();
    payload.sprint = e._id;
    props.userUpdateWorkItem(payload);
  };

  const handleChangeComponents = (e) => {
    const payload = takeValues();
    payload.components = e;
    props.userUpdateWorkItem(payload);
  };

  const handleChangeLabels = (e) => {
    const payload = takeValues();
    payload.labels = e;
    props.userUpdateWorkItem(payload);
  };

  const takeValues = () => {
    return {
      _id: props._id,
      project: props.updatedWorkItem.project,
      issue_type: props.updatedWorkItem.issue_type,
      epic_name: props.updatedWorkItem.epic_name,
      summary: props.updatedWorkItem.summary,
      description: props.updatedWorkItem.description,
      priority: props.updatedWorkItem.priority,
      linked_issue: props.updatedWorkItem.linked_issue,
      issue: props.updatedWorkItem.issue,
      assignee: props.updatedWorkItem.assignee,
      epic_link: props.updatedWorkItem.epic_link,
      sprint: props.updatedWorkItem.sprint,
      labels: props.updatedWorkItem.labels,
      components: props.updatedWorkItem.components,
      comments: props.updatedWorkItem.comments,
    };
  };
  const updateWorkItem = () => {
    const payload = takeValues();
    console.log(payload);
    props.updateWorkItem(payload);
    history.push(path);
  };

  const addReply = () => {
    let payload = takeValues();
    let lastComments = payload.comments;

    let comm = {
      user: obj.username,
      work_item: props._id,
      content: textMessage.current,
      date: {
        day: new Date().getDate(),
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        seconds: new Date().getSeconds(),
        miliseconds: new Date().getMilliseconds(),
      },
    };
    let comment = {
      user: obj.id,
      work_item: props._id,
      content: textMessage.current,
      date: new Date(),
    };
    lastComments.push(comm);
    payload.comments = lastComments;
    props.userUpdateWorkItem(payload);
    handleComments(lastComments);
    props.postComment(comment);
    setMessage("");
    textMessage.current=""
  };

  const handleMessageChange = (e) => {
    textMessage.current=e.target.value
    console.log(message)
    setMessage(e.target.value);
    console.log(message)
  };

  const projectIndex = projects.findIndex(
    (p) => p._id === props.updatedWorkItem.project
  );
  const selectedProject = projects[projectIndex];

  const issueTypeIndex = issues.findIndex(
    (i) => i._id === props.updatedWorkItem.issue_type
  );
  const selectedIssueType = issues[issueTypeIndex];

  const priorityIndex = priorities.findIndex(
    (p) => p._id === props.updatedWorkItem.priority
  );
  const selectedPriorities = priorities[priorityIndex];

  const linkedIssueIndex = linkedissues.findIndex(
    (l) => l._id === props.updatedWorkItem.linked_issue
  );
  const selectedLinkedIssue = linkedissues[linkedIssueIndex];
  var selectedLinkedIssueFinal = { name: " " };
  if (selectedLinkedIssue) {
    selectedLinkedIssueFinal = selectedLinkedIssue;
  }

  const issueIndex = issues.findIndex(
    (i) => i._id === props.updatedWorkItem.issue
  );
  const selectedIssue = issues[issueIndex];
  var selectedIssueFinal = { summary: " " };
  if (selectedIssue) {
    selectedIssueFinal = selectedIssue;
  }

  const assigneeIndex = workItemEpic.findIndex(
    (u) => u._id === props.updatedWorkItem.assignee
  );
  const selectedAssignee = users[assigneeIndex];
  var selectedAssigneeFinal = { username: " " };
  if (selectedAssignee) {
    selectedAssigneeFinal = selectedAssignee;
  }

  const EpicLinkIndex = workItemEpic.findIndex(
    (e) => e._id === props.updatedWorkItem.epic_link
  );
  const selectedEpicLink = workItemEpic[EpicLinkIndex];
  var selectedEpicLinkFinal = { summary: " " };
  if (selectedEpicLink) {
    selectedEpicLinkFinal = selectedEpicLink;
  }

  const SprintIndex = sprints.findIndex(
    (e) => e._id === props.updatedWorkItem.sprint
  );
  const selectedSprint = sprints[SprintIndex];
  var selectedSprintFinal = { name: " " };
  if (selectedSprint) {
    selectedSprintFinal = selectedSprint;
  }

  return (
    <Box width="70%" className={classes.mainBox} height="600px">
      <Grid container spacing={3} className={classes.headerWorkItem}>
        <Grid item sm={12}>
          <h2 className={classes.header}>Edit Issue</h2>
        </Grid>
      </Grid>
      <Paper className={classes.boxStyle}>
        <Grid container spacing={3}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={11}>
            <br></br>
            <Grid item xs={12}>
              <InputLabel fullWidth shrink required={true}>
                Projects
              </InputLabel>
              {selectedProject && (
                <Autocomplete
                  id="combo-box-demo"
                  options={projects}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  required
                  value={selectedProject}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                  onChange={(event, value) => {
                    handleChangeProject(value);
                  }}
                />
              )}
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink required={true}>
                Issue Type
              </InputLabel>
              {selectedIssueType && (
                <Autocomplete
                  id="combo-box-demo"
                  options={issues}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  required
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                  value={selectedIssueType}
                  onChange={(event, value) => {
                    handleChangeIssueType(value);
                  }}
                />
              )}
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
                  value={props.updatedWorkItem.epic_name}
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
                value={props.updatedWorkItem.summary}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink required={true}>
                Components
              </InputLabel>
              {props.updatedWorkItem.components &&
                (props.updatedWorkItem.components.length ||
                  !props.updatedWorkItem.components.length) && (
                  <Autocomplete
                    multiple
                    id="combo-box-demo"
                    limitTags={1}
                    options={components}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    required
                    defaultValue={props.updatedWorkItem.components}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                    onChange={(event, value) => {
                      handleChangeComponents(value);
                    }}
                  />
                )}
              <FormHelperText>
                Star typing to get a list of possible matches or press down to
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
                  defaultEditorState={props.updatedWorkItem.description}
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
              {selectedPriorities && (
                <Autocomplete
                  id="combo-box-demo"
                  options={priorities}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  required
                  value={selectedPriorities}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                  onChange={(event, value) => {
                    handleChangePriority(value);
                  }}
                />
              )}
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink>
                Labels
              </InputLabel>
              {props.updatedWorkItem.labels &&
                (props.updatedWorkItem.labels.length ||
                  !props.updatedWorkItem.labels.length) && (
                  <Autocomplete
                    multiple
                    id="multiple-limit-tags"
                    limitTags={1}
                    options={labels}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    defaultValue={props.updatedWorkItem.labels}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        defaultValue={props.updatedWorkItem.labels}
                      />
                    )}
                    onChange={(event, value) => {
                      handleChangeLabels(value);
                    }}
                  />
                )}
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
              {selectedLinkedIssueFinal && (
                <Autocomplete
                  id="combo-box-demo"
                  options={linkedissues}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      defaultValue={selectedLinkedIssueFinal.name}
                    />
                  )}
                  onChange={(event, value) => {
                    handleChangeLinkedIssue(value);
                  }}
                />
              )}
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    defaultValue={selectedIssueFinal.summary}
                  />
                )}
                onChange={(event, value) => {
                  handleChangeIssue(value);
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    defaultValue={selectedAssigneeFinal.username}
                  />
                )}
                onChange={(event, value) => {
                  handleChangeAssignee(value);
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    defaultValue={selectedEpicLinkFinal.summary}
                  />
                )}
                onChange={(event, value) => {
                  handleChangeEpicLink(value);
                }}
              />
              <br></br>
            </Grid>
            <br></br>
            <Grid item sm={12} xs={6}>
              <InputLabel fullWidth shrink>
                Sprint
              </InputLabel>
              <Autocomplete
                id="combo-box-demo"
                options={sprints}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    defaultValue={selectedSprintFinal.name}
                  />
                )}
                onChange={(event, value) => {
                  handleChangeSprint(value);
                }}
              />
              <br></br>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <Comment.Group>
                <Header as="h3" dividing>
                  Comments
                </Header>

                {commentsToShow}

                <Form reply>
                  <Form.TextArea
                    onChange={handleMessageChange}
                    placeholder="Message"
                    value={textMessage.current}
                  />
                  {commentsButton}
                </Form>
              </Comment.Group>

              <br></br>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={1} className={classes.footerWorkItem}>
        <Grid item xs={10}></Grid>
        <Grid item xs={1}>
          <Button
            href={path}
            onClick={updateWorkItem}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button href={path} color="primary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

StoryContentEdit.propTypes = {
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
  workItemById: state.getWorkItem.workItemById,
  updatedWorkItem: state.updateWorkItem.updatedWorkItem,
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
      getWorkItemById: getWorkItemById,
      updateWorkItem: updateWorkItem,
      userUpdateWorkItem: userUpdateWorkItem,
      postComment: postComment,
      putComment: putComment,
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(StoryContentEdit);
