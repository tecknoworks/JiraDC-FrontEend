import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { bindActionCreators, compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getProject } from '../actions';

const styles = (theme) => ({
  cardColor:{
    backgroundColor:"#d3adf7",
    width:"15px",
    height:'229px'
  },
  root: {
    width:'275px',
    height:'200px'
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
});

function ProjectsContent(props) {
  const { classes } = props;
  const projects= props.project
  useEffect(() => {
    props.getProject()
  }, [projects]);
  
  const cardsArray = projects.map(project => (
    <Grid item xs={2.5}>
      <Card className={classes.root}>
        <Grid container spacing={0}>
        <Grid item xs={2}> <Card className={classes.cardColor}> </Card></Grid>
        <Grid item xs={10}> 
          <CardContent>
          <Typography variant="h5" component="h2">
            {project.name}
          </Typography>
          <br></br>
          <Typography variant="body2" component="p">
            My open issues
          </Typography>
          <Typography variant="body2" component="p">
            Done issues
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">See project</Button>
        </CardActions>
        </Grid>
        </Grid>
      </Card>
   
    </Grid>
  ))
  return (
    <div>
      <Grid container spacing={3}>
          {cardsArray}
     </Grid>
      
    </div>
  );
}

ProjectsContent.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  project: state.getProject.project,
  loading: state.getProject.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProject: getProject
}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(ProjectsContent);


