import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    width: "275px",
    height: "200px",
  },
});

function BacklogContent(props) {
  const { classes } = props;

  let one = true;
  useEffect(() => {
    one = false;
  }, [one]);
  return (
    <h2>Backlog</h2>
  );
}

BacklogContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
    },
    dispatch
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(BacklogContent);
