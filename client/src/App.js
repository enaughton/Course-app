import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

import "./global.css";
import Header from "./components/Header";
import Authenticated from "./components/Authenticated";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import NotFound from "./components/NotFound";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";

const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

export default () => (
  <Router>
    <HeaderWithContext />
    <div>
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <PrivateRoute
          path="/CreateCourse"
          component={CreateCourseWithContext}
        />
        <PrivateRoute
          path="/course/:id/update"
          component={UpdateCourseWithContext}
        />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
