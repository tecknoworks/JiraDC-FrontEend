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
import { getComponent } from "../../actions";
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
});

function ComponentContent(props) {
  var components = props.components;
  const { classes } = props;

  let one = true;
  useEffect(() => {
    props.getComponent();
    one = false;
  }, [one]);

  function createData(name, description, lead, assignee) {
    return { name, description, lead, assignee };
  }
  const rows = components.map((component) =>
    createData(component.name, "description", "lead", "assignee")
  );
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
              <Button variant="contained" color="primary">
              Create
            </Button>
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
                <TableCell align="right">Default Assignee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow onClick={() => handleClick(row.name)} key={row.name}>
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
