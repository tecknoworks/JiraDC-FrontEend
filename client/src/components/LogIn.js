import React, { useEffect, useState, useRef } from 'react';
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
import { useHistory } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
// Actions
import { login } from '../actions';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const LogIn=(props)=> {

  //const [cookies, setCookie] = useCookies(['user']);
 const history=useHistory();
  if(props.isAuthUser===true){
    history.push("/");
  }else{
   history.push("/login");
  }
  const classes = useStyles();
  const[email,setEmail]=useState("");
   const[password,setPassword]=useState("");
  
  const submit = () => {
    const payload = {
      email:email,
      password:password
    }
     props.login(payload);
     console.log(props.isAuthUser)
     
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
          Log in
        </Typography>
        <ValidatorForm
                ref={inputRef }
                onSubmit={submit}
                onError={errors => console.log(errors)}
            >
        {/* <form className={classes.form} noValidate> */}
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextValidator
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
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
            margin="normal"
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
           // defaultValue={props.user.password}
          />
          </Grid>
          <Grid item xs={12}  style={{"text-align-last": "center"} }>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          </Grid>
          </ValidatorForm>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        {/* </form> */}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
const mapStateToProps = state => ({
  user: state.login.user,
  loading: state.login.loading,
  isAuthUser: state.login.isAuthUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login: login
}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(LogIn);