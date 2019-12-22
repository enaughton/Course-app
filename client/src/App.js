import React from "react";

import "./global.css";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";

const course = fetch("http://localhost:5000/api/courses/").then(res =>
  res.json()
);

console.log(course);

function App() {
  return (
    <div>
      <CourseDetail />
    </div>
  );
}

export default App;
