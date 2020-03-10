import React from "react";

import Cookies from "js-cookie";
import Form from "./Form";

class UpdateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      user: [],
      authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      errors: [],
      value: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          course: responseData.course.id,
          user: responseData.course.user,
          title: responseData.course.title,
          description: responseData.course.description,
          estimatedTime: responseData.course.estimatedTime,
          materialsNeeded: responseData.course.materialsNeeded
        });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    const {
      course,
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    const update = {
      course,
      title,
      description,
      estimatedTime,
      materialsNeeded
    };
    context.data
      .updateCourse(update, authUser.emailAddress, authUser.password)
      .then(errors => {
        if (errors.length) {
          console.log(errors.length, errors);
          this.setState(() => {
            return {
              errors: [errors]
            };
          });
        } else {
          this.props.history.push(`/courses/${this.state.course}`);
        }
      })
      .catch(err => {
        console.log(err && err.length);
        this.props.history.push("/error");
      });
  }

  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    const authUser = this.state.authenticatedUser;
    return (
      <div>
        {authUser && authUser.userId === this.state.user.id ? (
          <React.Fragment>
            <div className="bounds course--detail">
              <h1>Update Course</h1>
              <Form
                cancel={this.cancel}
                errors={this.state.errors}
                submit={this.handleSubmit}
                submitButtonText="Update Course"
                elements={() => (
                  <React.Fragment>
                    <div className="grid-66">
                      <div className="course--header ">
                        <label className="course--label">
                          Course Title
                          <input
                            id="title"
                            name="title"
                            type="text"
                            className="input-title course--title--input"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                          />
                        </label>

                        <p>
                          By {this.state.user.firstName}{" "}
                          {this.state.user.lastName}
                        </p>
                      </div>
                      <div className="course--description">
                        <div>
                          <textarea
                            id="description"
                            name="description"
                            className=""
                            value={this.state.description}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid-25 grid-right">
                      <div className="course--stats">
                        <ul className="course--stats--list">
                          <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div>
                              <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                className="course--time--input"
                                onChange={this.handleInputChange}
                                value={this.state.estimatedTime}
                              />
                            </div>
                          </li>
                          <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div>
                              <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                className=""
                                onChange={this.handleInputChange}
                                value={this.state.materialsNeeded}
                              ></textarea>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="grid-100">
              <h1> Pst, You aren't suppose to be here!</h1>
              <a className="button button-secondary" href="/">
                Return to List
              </a>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default UpdateCourse;
