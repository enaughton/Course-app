// Imports of Components

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
import DeleteCourse from "./components/DeleteCourse";

// withContext with Components to be passed Context throughout the App
const DeleteCourseWithContext = withContext(DeleteCourse);
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
      {/* 
        The Routes for the Project. 
      */}
      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute
          exact
          path="/courses/create"
          component={CreateCourseWithContext}
        />
        <PrivateRoute
          exact
          path="/courses/:id/update"
          component={UpdateCourseWithContext}
        />
        <PrivateRoute
          exact
          path="/courses/:id/delete"
          component={DeleteCourseWithContext}
        />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
