import React from "react";
import { Redirect } from "react-router-dom";
//Signs the Logged in User Out
export default ({ context }) => {
  context.actions.signOut();

  return <Redirect to="/" />;
};
