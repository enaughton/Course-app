import React from "react";

import { Link } from "react-router-dom";

class Courses extends React.Component {
  constructor() {
    super();
    this.state = { course: [] };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/courses")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ course: responseData.course });
      });
  }

  render() {
    return (
      <div>
        <div className="bounds">
          {this.state.course.map(course => (
            <div className="grid-33">
              <Link
                className="course--module course--link"
                to={`/courses/${course.id}`}
              >
                <h4 className="course--label">{course.id}</h4>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            </div>
          ))}

          <div className="grid-33">
            <a
              className="course--module course--add--module"
              href="/CreateCourse"
            >
              <h3 className="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  className="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </h3>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Courses;
