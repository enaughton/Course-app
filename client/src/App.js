import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import withContext from "./Context";

import "./global.css";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";

/*const course = fetch("http://localhost:5000/api/courses/").then(res =>
  res.json()
);

console.log(course);
*/
export default () => (
  <Router>
    <Header />
    <div>
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/coursedetail" component={CourseDetail} />
        <Route exact path="/UpdateCourse" component={UpdateCourse} />
      </Switch>
    </div>
  </Router>
);
