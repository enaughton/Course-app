import React from "react";
import Cookies from "js-cookie";

// Delete Course is a Component to Delete a Course, Only the User that Owns the Course should be allowed

class DeleteCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      authenticatedUser: Cookies.getJSON("authenticatedUser") || null
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:5000/api/courses/${this.props.match.params.id}
      `
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          course: responseData.course,
          user: responseData.course.user,
          title: responseData.course.title,
          description: responseData.course.description,
          estimatedTime: responseData.course.estimatedTime,
          materialsNeeded: responseData.course.materialsNeeded
        });
      });

    this.handleDelete = this.handleDelete.bind(this);
  }

  //  handleDelete handles the Delete of the Course and Deals with any Errors

  handleDelete(event) {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    const { course } = this.state;

    console.log(course);
    context.data
      .deleteCourse(course, authUser.emailAddress, authUser.password)
      .then(error => {
        if (error.length) {
          this.setState({ error });
          console.log(error);
        } else {
          context.actions
            .signIn(authUser.emailAddress, authUser.password)
            .then(() => {
              this.props.history.push(`/`);
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
    const { course } = this.state;
    console.log(course);
    return (
      <div>
        <h1>Are you sure you want to Delete this Course?</h1>
        <button className="button" onClick={this.handleDelete}>
          Delete Course
        </button>

        <a className="button button-secondary" href="/">
          Return to List
        </a>
      </div>
    );
  }
}
export default DeleteCourse;
