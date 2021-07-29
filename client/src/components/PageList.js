import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import StartPage from '../images/startpage.jpg';
// Material Imports
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Container, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, withStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

// Actions
import { fetchPages, removePage } from '../actions';
import { AvatarImage } from './AvatarImage';

const styles = (theme) => ({
    root: {
        position: 'relative'
    },
    media: {
        height: 160,
    },
    addButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    deleteButton: {
        position: 'absolute',
        right: -10,
        top: -10,
        zIndex: 10
    },
    StartPage:{
        position:'absolute',
        right:'100px',
        top:'20%'
    },
    WelcomeText:{
        "text-align": "left",
        "top":"20px",
        "display": "inline-block",
        "float":"left",
        "top": "50%",
        "left": "50%",
        "margin-top": "400px",
        "margin-left": "60px"
    },
    TextDiv:{
        "width":"500px",
        "height":"200px",
        "top": "50%",
        "left": "50%",
        "margin-top": "-100px",
        "margin-left": "-100px",
      
        
    }
});

class PageList extends React.Component {
    constructor(props) {
        super(props);

        this.onPageClick = this.onPageClick.bind(this);
    }

    componentWillMount() {
        const { fetchPages } = this.props;
        fetchPages({});
    }

    onRemovePage(id) {
        const { removePage } = this.props;

        var confirmed = confirm(`Are you sure you want to remove this page?`)

        if (confirmed)
            removePage(id);
    }

    onPageClick(id) {
        this.props.history.push(`/pages/${id}`);
    }

    render() {
        let { loadingPages, pages, classes } = this.props;

        return (
            <Container fixed>
                <div className={classes.TextDiv}>
                <div className={classes.WelcomeText}>
               <h1>Welcome to Jira DC!</h1>
               </div></div>
            <img src={StartPage} alt="startpage" className={classes.StartPage}/>
            </Container>
            
        ) 
    }
}

const mapStateToProps = state => ({
    pages: state.pages.data,
    loadingPages: state.pages.loadingPages
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPages: fetchPages,
    removePage: removePage
}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(PageList);