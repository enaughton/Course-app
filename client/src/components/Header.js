import React from "react";
import { Link } from "react-router-dom";

//Header Component lets a User Create an Account, or Sign In and Sign Out

export default ({ context }) => {
  const authUser = context.authenticatedUser;

  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Course App</h1>
        <nav>
          {authUser ? (
            <React.Fragment>
              <span>
                Welcome, {authUser.firstName} {authUser.lastName}!
              </span>
              <Link to="/signout">Sign Out</Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link className="signup" to="/signup">
                Sign Up
              </Link>
              <Link className="signin" to="/signin">
                Sign In
              </Link>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
};
