import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  footer: {
    "background-color": theme.palette.primary.main,
    "border-top":"6px theme.palette.primary.main",
    "position": "fixed",
    "width": "100%",
    "bottom":" 0",
    "color": "white",
    "font-size": "25px"
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" >
          JiraDC
        </Typography>
        <Typography align="center" color="textSecondary" >
          Software Development
        </Typography>
      </Container>
    </footer>
  );
}
