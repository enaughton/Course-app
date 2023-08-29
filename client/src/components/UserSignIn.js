import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

//This Component Signs In a User who already has an exisiting Email Address

export default class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    errors: []
  };

  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }
  // change handles the changing input fields
  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };
  // submit handles the submitting of the Form and Handles any Errors
  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: "/" }
    };
    const { emailAddress, password } = this.state;

    context.actions
      .signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch(error => {
        console.error(error);
        this.props.history.push("/error");
      });
  };

  //cancel returns the User back to the Course Screen
  cancel = () => {
    this.props.history.push("/");
  };
}
