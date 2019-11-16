import React, { Component } from "react";
import "./login.css";

class LOG extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userName: null,
      password: null,
      formErrors: {
          userName: "",
        password: ""
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
    let passwordError = "";
    if (!this.state.userName) {
        userNameError = "this field cannot be blank";
      }
      else {
          userNameError = "";
      }
      if (!this.state.password) {
        passwordError = "this field cannot be blank";
      }
      else {
          passwordError = "";
      }

      if(userNameError || passwordError){
        this.setState(prevState => ({
          formErrors: {
            ...prevState.formErrors,
            userName: userNameError,
            password: passwordError
          }
        }));
        valid = false;
      }

    return valid;
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.formValid(this.state)) {
      const postform = {
         username: this.state.userName,
         password: this.state.password,
      }
      this.postedform(postform)
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  postedform = (postform) => {
    console.log(postform);
      fetch('https://31a6d177.ngrok.io/login/' , {
          method: 'POST',
          body: JSON.stringify(postform),
          headers: {
            'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(responseJson.token);
        localStorage.setItem('token',responseJson.token);
        localStorage.setItem('user_name',responseJson.username);
        window.location.href = "/user_profile";
        // localStorage.get('token')
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
                value.length < 3 ? "" : "";
                break;
      case "password":
        formErrors.password =
          value.length < 6 ? "" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="loginwrapper">
        <div className="form-wrapper">
          <h1>LOGIN</h1>
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
            <div className="login">
              <button type="submit">Login</button>
              <small>Does not Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LOG;