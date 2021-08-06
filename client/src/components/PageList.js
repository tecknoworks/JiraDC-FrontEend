import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import StartPage from '../images/welcome.png';
// Material Imports
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Container, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, withStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

// Actions
import { fetchPages, removePage } from '../actions';
import { AvatarImage } from './AvatarImage';
import Grid from '@material-ui/core/Grid';
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
    MainImage: {
    },
 
    WelcomeText: {
        "width": "660px",
        "margin-left": "auto",
        "margin-right": "auto",
        "padding-top": "50px",
        // "padding-left": "250px",
        "text-align": "left",
        "fontFamily": 'Cochin-Bold',
        "fontSize": 35
    },
    TextDiv: {
        "width": "700px",
        "height": "200px",
        "top": "50%",
        "left": "50%",
        "margin-top": "-100px",
        "margin-left": "-100px",
    },
    AdditionalText: {
        "text-align": "left",
        "fontFamily": 'Cochin-Bold',
        "fontSize": 25
    },
    HomeContainer: {
        "padding-top": "80px",
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
            <div className={classes.HomeContainer}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div className={classes.WelcomeText}>
                            <h1>Welcome to Jira DC!</h1>
                            <div className={classes.AdditionalText}>
                                <p>The #1 software develompment used by agile teams.</p>
                                <p>Jira DC is buid for every member of your software team to plan,
                                    <p>track, and release great software.</p></p>
                            </div>
                        </div>
 
                    </Grid>
                    <Grid className={classes.MainImage} item xs={6}>
                        <img src={StartPage} alt="startpage" />
                    </Grid>
                </Grid>
            </div>
            
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