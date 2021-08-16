import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Divider, StepContent, Toolbar, Button } from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { getComponent, postComponent } from "../../actions";
import { Backdrop} from "@material-ui/core";
import ComponentOverlay from "./ComponentOverlay";
import ComponentEditOverlay from "./ComponentEditOverlay";
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
const styles = (theme) => ({
  root: {
    width: "275px",
    height: "200px",
  },
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
  table: {
    minWidth: 650,
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
  tablebody: {
    backgroundColor: "transparent",
  },
  tableprojects: {
    "box-shadow": "none",
    "background-color": "transparent",
  },
  tableprojectsheader: {
    "background-color": "#fff",
  },
  backdrop:{
    zIndex:theme.zIndex.drawer +1,
    color:'#fff',
  },
});

function ComponentContent(props) {
  const [show, openOverlay] = useState(false);
  const [show1, openEditOverlay] = useState(false);
  var components = props.components;
  const { classes } = props;
  const history=useHistory();

  let one = true;
  useEffect(() => {
    debugger
    props.getComponent();
    one = false;
  }, [one]);

  function createData(name, description, user_id, project_id) {
    return { name, description,  user_id, project_id };
  }
  const rows = components.map((component) =>
    createData(component.name, component.description, component.username, component.projectName, "issues")
  );
  const handleClick = (name) =>{
    history.push({pathname: '/project',
    search: '?name='+name,
    state: { detail: name }})
  }
  return (
    <Grid container spacing={7}>
      <Grid item sm={0.3}></Grid>

      <Grid item sm={11}>
        <Grid container spacing={7}>
          <Grid item sm={10}>
            <h2>Components</h2>
          </Grid>
          <Grid item sm={2}>
            
          </Grid>
        </Grid>

        <Grid container spacing={6}>
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
                />
              </div></Grid>
              <Grid item sm={1}>
              <Button onClick={()=>openOverlay(!show)} variant="contained" color="primary">
              Create
            </Button>
            <Backdrop className={classes.backdrop} open={show}>
                <ComponentOverlay/>
            </Backdrop>
            <Backdrop className={classes.backdrop} open={show1}>
                <ComponentEditOverlay/>
            </Backdrop>
            </Grid>
            </Toolbar>
          </Grid>
        </Grid>
        <br></br>
        <Divider />
        <br></br>
        <TableContainer component={Paper} className={classes.tableprojects}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead className={classes.tableprojectsheader}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Component Lead</TableCell>
                <TableCell align="right">Project</TableCell>
                <TableCell align="right">Issues</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow  key={row.name}> 
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.user_id}</TableCell>
                  <TableCell onClick={() => handleClick(row.project_id)} style={{"cursor":'pointer'}} align="right">{row.project_id}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell onClick={()=>openEditOverlay(!show1)} style={{"cursor":'pointer'}}align="right">{row.edit}<EditIcon/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

ComponentContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  components: state.getComponent.component,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getComponent: getComponent,
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ComponentContent);
