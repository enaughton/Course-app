import React from "react";

import Form from "./Form";

//This Component Creates a Course, a User HAS to be Logged in.

class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      errors: [],
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //handleInputChange() handles the changing input fields
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // handleSubmit handles the Creation of the Course and Deals with any Errors
  handleSubmit(event) {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const course = {
      userId: context.authenticatedUser.userId,
      title,
      description,
      estimatedTime,
      materialsNeeded
    };
    console.log(course);

    context.data
      .createCourse(course, authUser.emailAddress, authUser.password)
      .then(errors => {
        if (errors.length) {
          console.log(errors.length, errors);
          this.setState(() => {
            return {
              errors: [errors]
            };
          });
        } else {
          this.props.history.push(`/`);
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
    const { errors } = this.state;
    return (
      <div>
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.handleSubmit}
              submitButtonText="Create Course"
              elements={() => (
                <React.Fragment>
                  <div className="grid-66">
                    <div className="course--header">
                      <label className="course--label">Course</label>
                      <div>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          className="input-title course--title--input"
                          placeholder="Course title..."
                          value={this.state.title}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <p></p>
                    </div>
                    <div className="course--description">
                      <div>
                        <textarea
                          id="description"
                          name="description"
                          className=""
                          placeholder="Course description..."
                          value={this.state.description}
                          onChange={this.handleInputChange}
                        ></textarea>
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
                              placeholder="Hours"
                              value={this.state.estimatedTime}
                              onChange={this.handleInputChange}
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
                              placeholder="List materials..."
                              value={this.state.materialsNeeded}
                              onChange={this.handleInputChange}
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
        </div>
      </div>
    );
  }
}

export default CreateCourse;
