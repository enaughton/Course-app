import React from "react";
import { Link } from "react-router-dom";

class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { course: [] };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state.title);
  }

  handleSubmit(event) {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    const {
      course,
      user,
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    context.data
      .createCourse(course, authUser.emailAddress, authUser.password)
      .then(error => {
        if (error.length) {
          this.setState({ error });
          console.log(error);
        } else {
          context.actions
            .signIn(authUser.emailAddress, authUser.password)
            .then(() => {
              this.props.history.push(`/courses/${this.state.course.id}`);
            });
        }
      })
      .catch(err => {
        console.log(err && err.length);
        this.props.history.push("/error");
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="bounds course--detail">
        <div>
          <form onSubmit={this.handleSubmit}>
            <h1>Create Course</h1>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..."
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
                      ></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Create Course
              </button>
              <Link className="button button-secondary" to={`/`}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCourse;
