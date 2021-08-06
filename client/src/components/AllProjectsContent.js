import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getProject, getKanbanProject, getScrumProject, getBugtrackingProject } from '../actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Divider, Toolbar } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { AppBar } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    width: '275px',
    height: '200px',
  },
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  table: {
    minWidth: 650,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(-6),
  },
  tablebody:{
    backgroundColor: 'transparent'
  },
  tableprojects:{
    'box-shadow':'none',
    'background-color': 'transparent'
  },
  tableprojectsheader:{
    'background-color': '#fff'
  }

});

function AllProjectsContent(props) {
    const [type, setType] = useState('All Types');
    var projects = props.project
    const handleChange = (event) => {
      setType(event.target.value)
      if(event.target.value==="Kanban"){
          props.getKanbanProject()
      }else  if(event.target.value==="Scrum"){
        props.getScrumProject()
      }else  if(event.target.value==="Bug tracking"){
        props.getBugtrackingProject()
      }
    }
    const { classes } = props;
    
    let one=true
    useEffect(() => {
      props.getProject()
      console.log(props.project)
      one=false
    }, [one]);

    console.log(projects)
    function createData(name, key, type, user_id) {
      return { name, key, type, user_id };
    }
   
    const rows = projects.map(project => (
      createData(project.name, "key", project.type, project.user_id)
    ))
    let Kanban = "Kanban"
    let Scrum = "Scrum"
    let Bugtrackinng = "Bug tracking"

  return (

    <Grid container spacing={7}>
      <Grid item sm={0.3}></Grid>
      <Grid item sm={11}>
        <h2>Projects</h2>
        
          <Grid container spacing={6}>
            <Grid items xs={3}>
        <Toolbar>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon color='action'/>
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <InputLabel id="types" defaultValue="All Types"></InputLabel>
        <Select
          labelId="types"
          id="types"
          value={type}
          onChange={handleChange}
          renderValue={(selected) => {
            return selected;
          }}
        >
          <MenuItem value={Kanban}>Kanban</MenuItem>
          <MenuItem value={Scrum}>Scrum</MenuItem>
          <MenuItem value={Bugtrackinng}>Bug-tracking</MenuItem>
        </Select>
        </Toolbar></Grid>
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
                <TableCell align="right">Key</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.key}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.user_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

AllProjectsContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  project: state.getProject.project,
  loading: state.getProject.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProject: getProject,
  getKanbanProject: getKanbanProject,
  getScrumProject: getScrumProject,
  getBugtrackingProject: getBugtrackingProject,

}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(AllProjectsContent);