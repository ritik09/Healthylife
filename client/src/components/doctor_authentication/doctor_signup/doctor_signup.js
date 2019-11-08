import React, { Component } from "react";
import "./signup.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class DOCTOR_SIGNUP extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userName: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      formErrors: {
          userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  }

  formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });

    let userNameError = "";
    let firstNameError = "";
    let lastNameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    if (!this.state.userName) {
      userNameError = "name cannot be blank";
    }
    else {
        userNameError = "";
    }
    if (!this.state.firstName) {
      firstNameError = "name cannot be blank";
    }
    else {
        firstNameError = "";
    }
    if (!this.state.lastName) {
      lastNameError = "name cannot be blank";
    }
    else {
        lastNameError = "";
    }
    if (!this.state.email) {
        emailError = "email cannot be blank";
    }
    else {
        emailError = "";
    }
    if (!this.state.password) {
      passwordError = "enter password";
    }
    else {
        passwordError = "";
    }
    if (!this.state.confirmPassword) {
      confirmPasswordError = "this field cannot be blank";
    }
    else {
        confirmPasswordError = "";
    }

    if(userNameError || firstNameError || lastNameError || emailError || passwordError || confirmPasswordError){
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          userName: userNameError,
          firstName: firstNameError,
          lastName: lastNameError,
          email: emailError,
          password: passwordError,
          confirmPassword: confirmPasswordError
        }
      }));
      valid = false;
    }
  
    return valid;
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        User Name: ${this.state.userName}
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
      const postform = {
         username: this.state.userName,
         email: this.state.email,
         password: this.state.password,
         confirm_password: this.state.confirmPassword,
         first_name: this.state.firstName,
         last_name: this.state.lastName
      }
      this.postedform(postform)
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  postedform = (postform) => {
    fetch('https://f6a8cd9f.ngrok.io/quickstart/signup/' , {
        method: 'POST',
        body: JSON.stringify(postform),
        headers: {
          'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      localStorage.setItem('user_id',responseJson.user_id);
      window.location.href = "/validate";
    })
    .catch((error) => {
      //Error 
      alert(JSON.stringify(error));
      console.error(error);
  });
};

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
        case "userName":
                formErrors.userName =
                value.length < 3 ? "minimum 3 characaters required" : "";
                break;
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "confirmPassword": 
        formErrors.confirmPassword = 
        value !== this.state.password ? "password does not match" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="formwrap">
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
          <div className="userName">
              <label htmlFor="userName">User Name</label>
              <input
                className={formErrors.userName.length > 0 ? "error" : null}
                placeholder="User Name"
                type="text"
                name="userName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.userName.length > 0 && (
                <span className="errorMessage">{formErrors.userName}</span>
              )}
            </div>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className={formErrors.confirmPassword.length > 0 ? "error" : null}
                placeholder="ConfirmPassword"
                type="password"
                name="confirmPassword"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.confirmPassword.length > 0 && (
                <span className="errorMessage">{formErrors.confirmPassword}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default DOCTOR_SIGNUP;