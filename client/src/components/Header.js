import React from "react";

const Header = props => {
  return (
    <div>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            <a className="signup" href="sign-up.html">
              Sign Up
            </a>
            <a className="signin" href="sign-in.html">
              Sign In
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
