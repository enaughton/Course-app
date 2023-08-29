import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

// PrivateRoute creates a Protected Route and only displays it if the User is Logged In
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
