import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material
import { Container, Box, CircularProgress, Typography, makeStyles, Button, Grid, IconButton, TextField, Paper, FormControl, InputLabel, OutlinedInput, InputAdornment, Card, CardContent, Fab } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import DeleteIcon from '@material-ui/icons/Delete';

// Components
import { AvatarImage } from '../components/AvatarImage';
import { BannerImage } from '../components/BannerImage';

// Actions
import { fetchPage, requestTiersByPage, addTier, activateTier, addPost, requestPostsByPage, removePost, removeTier } from '../actions';

const useStyles = makeStyles(theme => ({
    avatarImg: {
        marginTop: -64
    },
    media: {
        height: 160,
    },
    addTierForm: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    addPostForm: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    buttonProgress: {
        marginRight: theme.spacing(1)
    },
    postCard: {
        width: 550
    },
    pageDescription: {
        whiteSpace: 'pre-wrap'
    }
}));

export default function Page(props) {
    const classes = useStyles(props);
    const page = useSelector(state => state.page);
    const tiers = useSelector(state => state.tiers);
    const posts = useSelector(state => state.posts);

    const [addTierFormOpen, setAddTierFormOpen] = useState(false);
    const [addPostFormOpen, setAddPostFormOpen] = useState(false);

    const [form, setForm] = useState({
        title: '',
        description: '',
        amount: 0
    });

    const [postForm, setPostForm] = useState({
        title: '',
        content: '',
        requiredAmount: 0
    });

    const { match: { params } } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPage(params.id));
        dispatch(requestTiersByPage(params.id));
        dispatch(requestPostsByPage(params.id));
    }, []);


    // Tier handlers
    const toggleAddTierForm = () => {
        setAddTierFormOpen(!addTierFormOpen);
    }

    const onChangeTierTitle = (event) => {
        let newForm = { ...form };
        newForm.title = event.target.value;
        setForm(newForm);
    }

    const onChangeTierDescription = (event) => {
        let newForm = { ...form };
        newForm.description = event.target.value;
        setForm(newForm);
    }

    const onChangeTierAmount = (event) => {
        let newForm = { ...form };
        newForm.amount = event.target.value;
        setForm(newForm);
    }

    const onAddTier = () => {
        let data = { ...form };
        data.page = page.data._id;

        dispatch(addTier(data))
            .then(() => {
                dispatch(requestTiersByPage(params.id));
            });
    }

    const onActivateTier = (id) => {
        dispatch(activateTier(id))
            .then(() => {
                dispatch(requestPostsByPage(params.id));
            });
    }

    // Post handlers
    const toggleAddPostForm = () => {
        setAddPostFormOpen(!addPostFormOpen);
    }

    const onChangePostTitle = (event) => {
        let newForm = { ...postForm };
        newForm.title = event.target.value;
        setPostForm(newForm);
    }

    const onChangePostContent = (event) => {
        let newForm = { ...postForm };
        newForm.content = event.target.value;
        setPostForm(newForm);
    }

    const onChangePostRequiredAmount = (event) => {
        let newForm = { ...postForm };
        newForm.requiredAmount = event.target.value;
        setPostForm(newForm);
    }

    const onRemovePost = (id) => {
        let confirmed = confirm('Sure you want do delete this post?');

        if (confirmed)
            dispatch(removePost(id))
                .then(() => {
                    dispatch(requestPostsByPage(params.id));
                });
    }

    const onRemoveTier = (id) => {
        let confirmed = confirm('Sure you want do delete this level?');

        if (confirmed)
            dispatch(removeTier(id))
                .then(() => {
                    dispatch(requestTiersByPage(params.id));
                });
    }

    const onAddPost = () => {
        let data = { ...postForm };
        data.page = page.data._id;

        dispatch(addPost(data))
            .then(() => {
                dispatch(requestPostsByPage(params.id));
            });
    }

    const tierBody = (tier) => (
        <Paper className={classes.tier}>
            <Box p={4}>
                <Box textAlign="right" onClick={() => onRemoveTier(tier._id)}>
                    <IconButton>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Box>

                <Typography variant="h4">{tier.title}</Typography>

                <Box my={3} fontWeight="fontWeightBold">
                    <Typography variant="h3">{tier.amount}$</Typography>
                    <Typography color="textSecondary">Per month</Typography>
                    <Typography variant="subtitle1" color="textSecondary">(+ VAT)</Typography>
                </Box>

                <Button disabled={tier.active || tiers.activateProgress} variant="outlined" color="primary" onClick={() => onActivateTier(tier._id)}>{tier.active ? 'Activated' : 'Activate'}</Button>

                <Box mt={3}>
                    <Typography color="textSecondary">{tier.description}</Typography>
                </Box>

                <Box mt={3}>
                    <Typography variant="caption" color="textSecondary">Lower tiers bonuses included</Typography>
                </Box>
            </Box>
        </Paper>
    );

    const postBody = (post) => (
        <Card className={classes.postCard}>
            <CardContent>
                <Box textAlign="right">
                    <IconButton onClick={() => onRemovePost(post._id)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Box>

                {post.blocked &&
                    <Box textAlign="center">
                        <LockIcon fontSize="large" />

                        <Typography variant="body2" color="textSecondary">
                            Post locked. Minimum amount required: {post.requiredAmount}$
                        </Typography>
                    </Box>
                }

                {!post.blocked &&
                    <Box textAlign="center">
                        <Typography variant="h5">
                            {post.title}
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                            {post.content}
                        </Typography>

                        <Typography variant="caption" color="textSecondary">{post.requiredAmount}$</Typography>
                    </Box>
                }
            </CardContent>
        </Card>
    );

    return (
        <Box>
            {page.loadingPage && <CircularProgress />}

            {!page.loadingPage && page.data &&
                <Box>
                    <BannerImage src={page.data.banner}></BannerImage>

                    <Box display="flex" justifyContent="center" className={classes.avatarImg}>
                        <AvatarImage size={128} src={page.data.avatar} />
                    </Box>

                    <Container fixed>
                        <Box p={2} display="flex" alignItems="center" flexDirection="column">
                            <Box textAlign="center" fontWeight="fontWeightBold">
                                <Typography variant="h4">
                                    {page.data.title}
                                </Typography>
                            </Box>

                            <Box textAlign="center">
                                <Typography color="textSecondary" className={classes.pageDescription}>
                                    {page.data.description}
                                </Typography>
                            </Box>

                            <Box width={1} my={2} textAlign="center">
                                <Grid spacing={1} container justify="center" alignItems="center">
                                    <Grid item>
                                        <Typography variant="h4">Select tier level</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={toggleAddTierForm}>Add tier</Button>
                                    </Grid>
                                </Grid>

                                {addTierFormOpen &&
                                    <Paper className={classes.addTierForm}>
                                        <Box p={1}>
                                            <Grid container justify="center" spacing={1}>
                                                <Grid item xs={8}>
                                                    <TextField fullWidth variant="outlined" label="Title" value={form.title} onChange={onChangeTierTitle}></TextField>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <FormControl fullWidth className={classes.margin} variant="outlined">
                                                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-amount"
                                                            value={form.amount}
                                                            onChange={onChangeTierAmount}
                                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                            labelWidth={60}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField fullWidth multiline variant="outlined" label="Description" value={form.description} onChange={onChangeTierDescription}></TextField>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Button disabled={tiers.addProgress} variant="contained" color="primary" onClick={onAddTier}>
                                                        {tiers.addProgress &&
                                                            <CircularProgress className={classes.buttonProgress} color="textPrimary" size={24} />
                                                        } Add
                                                        </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                }

                                {tiers.loadingTiers &&
                                    <CircularProgress />
                                }

                                {!tiers.loadingTiers &&
                                    <Grid spacing={2} container justify="center">
                                        {tiers.data.map(tier => (
                                            <Grid xs={12} md={4} item key={tier._id}>
                                                {tierBody(tier)}
                                            </Grid>
                                        ))}
                                    </Grid>
                                }
                            </Box>

                            <Box width={1} my={2} textAlign="center">
                                <Grid spacing={1} container justify="center" alignItems="center">
                                    <Grid item>
                                        <Typography variant="h4">Posts</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={toggleAddPostForm}>Add post</Button>
                                    </Grid>
                                </Grid>



                                {addPostFormOpen &&
                                    <Paper className={classes.addPostForm}>
                                        <Box p={1}>
                                            <Grid container justify="center" spacing={1}>
                                                <Grid item xs={8}>
                                                    <TextField fullWidth variant="outlined" label="Title" value={postForm.title} onChange={onChangePostTitle}></TextField>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <FormControl fullWidth className={classes.margin} variant="outlined">
                                                        <InputLabel htmlFor="outlined-adornment-amount">Required amount</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-amount"
                                                            value={postForm.requiredAmount}
                                                            onChange={onChangePostRequiredAmount}
                                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                            labelWidth={127}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField fullWidth multiline variant="outlined" label="Content" value={postForm.content} onChange={onChangePostContent}></TextField>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Button disabled={posts.addProgress} variant="contained" color="primary" onClick={onAddPost}>
                                                        {posts.addProgress &&
                                                            <CircularProgress className={classes.buttonProgress} color="textPrimary" size={24} />
                                                        } Add
                                                        </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                }

                                {posts.loadingPosts &&
                                    <CircularProgress />
                                }

                                {!posts.loadingPosts &&
                                    <Grid spacing={2} container justify="center">
                                        {posts.data.map(post => (
                                            <Grid container item justify="center" xs={12} item key={post._id}>
                                                {postBody(post)}
                                            </Grid>
                                        ))}
                                    </Grid>
                                }
                            </Box>
                        </Box>
                    </Container>
                </Box>
            }
        </Box>
    );
}