import React from "react";
import { Link } from "react-router-dom";

//NotFound is displayed if the Route is Not Found

export default () => (
  <div className="bounds">
    <h1>Not Found</h1>
    <p>Sorry! We couldn't find the page you're looking for.</p>
    <Link to="/">Return to Main Page</Link>
  </div>
);
