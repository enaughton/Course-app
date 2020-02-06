import React from "react";

class UpdateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      user: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.setState({
          course: responseData.course,
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
    console.log(this.state.name);
  }

  render() {
    return (
      <div>
        <div id="root">
          <div>
            <div className="bounds course--detail">
              <h1>Update Course</h1>
              <div>
                <form>
                  <div className="grid-66">
                    <div className="course--header">
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
                              onChange={this.handleInputChange}
                              value={this.state.course.estimatedTime}
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
                              value={this.state.course.materialsNeeded}
                            ></textarea>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">
                      Update Course
                    </button>
                    <button
                      className="button button-secondary"
                      onClick="event.preventDefault(); location.href='course-detail.html';"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateCourse;
