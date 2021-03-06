import React, { Component, useEffect, useState,useRef} from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

// Actions
import { register } from '../actions';

const styles = (theme) => ({
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp=(props)=>
{
   const[username,setUsername]=useState("");
   const[email,setEmail]=useState("");
   const[password,setPassword]=useState("");
  const classes = useStyles();
  const submit = () => {
    const payload = {
      username: username,
      email:email,
      password:password
    }
     console.log(payload)
     props.register(payload);
     setUsername("")
     setEmail("")
     setPassword("")
  };
 const setUsernameText = event => {
    setUsername(event.target.value)
  };
  const setEmailText = event => {
    setEmail(event.target.value)
  };
  const setPasswordText = event => {
    setPassword(event.target.value)
  };
  const inputRef = useRef("form");
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {/* <form className={classes.form} noValidate> */}
        <ValidatorForm
                ref={inputRef }
                onSubmit={submit}
                onError={errors => console.log(errors)}>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                autoComplete="uname"
                name="username"
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={username}
                onChange={setUsernameText}
                validators={['required' ]}
            errorMessages={['this field is required']}
               // defaultValue={props.user.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={setEmailText}
                validators={['isEmail','required' ]}
            errorMessages={['email is not valid','this field is required']}
               // defaultValue={props.user.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={setPasswordText}
                validators={['required' ]}
            errorMessages={['this field is required']}
              //  defaultValue={props.user.username}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          </ValidatorForm>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        {/* </form> */}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = state => ({
  user: state.register.user,
  loadingPages: state.register.loading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  register: register
}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SignUp);