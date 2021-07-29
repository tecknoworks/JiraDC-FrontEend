
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

// Dropzone
import { DropzoneArea } from 'material-ui-dropzone'

// Material Imports
import { Box, Container, Typography, Button, withStyles, Grid, TextField, FormControl, InputLabel, FormHelperText } from '@material-ui/core';

// Actions
import { addPage } from '../actions';

const styles = (theme) => ({
    gridItem: {
        padding: theme.spacing(1)
    }
});

class AddPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                title: "",
                description: "",
                avatar: null,
                banner: null
            },

            formErrors: {}
        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onAvatarChange = this.onAvatarChange.bind(this);
        this.onBannerChange = this.onBannerChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentWillMount() {
    }

    onChangeTitle(event) {
        const value = event.target.value;

        this.setState(state => {
            state.form.title = value;
            return state;
        });
    }

    onChangeDescription(event) {
        const value = event.target.value;

        this.setState(state => {
            state.form.description = value;
            return state;
        });
    }

    onAvatarChange(files) {
        let avatar = files.length == 0 ? null : files[0];

        this.setState(state => {
            state.form.avatar = avatar;
            return state;
        });
    }

    onBannerChange(files) {
        let banner = files.length == 0 ? null : files[0];

        this.setState(state => {
            state.form.banner = banner;
            return state;
        });
    }


    onSave() {
        const { addPage } = this.props;

        let isValid = this.validate();
        if (!isValid) return;

        let form = { ...this.state.form };
        addPage(form)
            .then(() => {
                this.props.history.push(`/`);
            });
    }

    validate() {
        let form = { ...this.state.form };

        let formErrors = {};

        let requiredMessage = 'Field is required.'

        if (!form.title || form.title == '')
            formErrors.title = requiredMessage;

        if (!form.description || form.description == '')
            formErrors.description = requiredMessage;

        if (form.avatar == null)
            formErrors.avatar = requiredMessage;

        if (form.banner == null)
            formErrors.banner = requiredMessage;

        this.setState({ formErrors: formErrors });

        return Object.keys(formErrors).length == 0;
    }

    render() {
        let { form, formErrors } = this.state;
        let { classes } = this.props;

        return (
            <Container fixed>
                <Box p={2}>
                    <Box px={1}>
                        <Typography variant="h4">New Page</Typography>
                    </Box>

                    <Grid container>
                        <Grid container item xs={12} className={classes.gridItem}>
                            <InputLabel>Avatar</InputLabel>

                            <FormControl fullWidth error={formErrors.avatar != undefined}>
                                <DropzoneArea
                                    dropzoneText="Upload page avatar"
                                    showFileNamesInPreview={true}
                                    filesLimit={1}
                                    onChange={this.onAvatarChange}
                                />

                                {formErrors.avatar != undefined && <FormHelperText id="component-error-text">{formErrors.avatar}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid container item xs={12} className={classes.gridItem}>
                            <InputLabel>Banner</InputLabel>

                            <FormControl fullWidth error={formErrors.banner != undefined}>
                                <DropzoneArea
                                    dropzoneText="Upload page banner"
                                    showFileNamesInPreview={true}
                                    filesLimit={1}
                                    onChange={this.onBannerChange}
                                />

                                {formErrors.banner != undefined && <FormHelperText id="component-error-text">{formErrors.banner}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid container item xs={12} md={6} className={classes.gridItem}>
                            <TextField error={formErrors.title != undefined} helperText={formErrors.title} fullWidth label="Title" variant="outlined" value={form.title} onChange={this.onChangeTitle} />
                        </Grid>

                        <Grid container item xs={12} md={12} className={classes.gridItem}>
                            <TextField error={formErrors.description != undefined} helperText={formErrors.description} fullWidth multiline label="Description" variant="outlined" value={form.description} onChange={this.onChangeDescription} />
                        </Grid>
                    </Grid>

                    <Box px={1}>
                        <Button variant="contained" color="primary" onClick={this.onSave}>Save</Button>
                    </Box>
                </Box>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    pages: state.pages.data,
    loadingPages: state.pages.loadingPages
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addPage: addPage
}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(AddPage);