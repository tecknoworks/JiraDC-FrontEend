import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const Persistance = props => {
  const { isAuthUser, type } = props;
  console.log(isAuthUser)
  if (type === "guest" && isAuthUser) return <Redirect to="/mywork" />;
  else if (type === "private" && !isAuthUser) return <Redirect to="/signup" />;

  return <Route {...props} />;
};

const mapStateToProps = state => ({
    isAuthUser: state.login.isAuthUser
  });

export default connect(mapStateToProps)(Persistance);