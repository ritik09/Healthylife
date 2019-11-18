import React, { Component } from "react";
import "./hospital_edit_profile.css";

class HOSPITAL_EDIT_PROFILE extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userName: null,
      hospitalName: null,
      location: null,
      password: null,
      confirmPassword: null,
      email: null,
      formErrors: {
          userName: "",
        hospitalName: "",
        location: "",
        password: "",
        confirmPassword: ""
      }
    };
  }

  componentDidMount() {
    fetch(`https://b3013e76.ngrok.io/quickstart/profile_hospital/${localStorage.getItem('user_name')}/`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
          userName: data.username,
          hospitalName: data.hospital_name,
          location:data.street_name,
          email: data.email
    })
      console.log(this.state)
    })
    .catch((error) => {
      //Error 
      alert(JSON.stringify(error));
      console.error(error);
  });
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
    let hospitalNameError = "";
    let locationError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    if (!this.state.userName) {
      userNameError = "name cannot be blank";
    }
    else {
        userNameError = "";
    }
    if (!this.state.hospitalName) {
      hospitalNameError = "name cannot be blank";
    }
    else {
        hospitalNameError = "";
    }
    if (!this.state.location) {
      locationError = "location cannot be blank";
    }
    else {
        locationError = "";
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

    if(userNameError || hospitalNameError || locationError || passwordError || confirmPasswordError){
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          userName: userNameError,
          hospitalName: hospitalNameError,
          location: locationError,
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
        Hospital Name: ${this.state.hospitalName}
        Location: ${this.state.location}
        Password: ${this.state.password}
      `);
      const postform = {
         username: this.state.userName,
         password: this.state.password,
         confirm_password: this.state.confirmPassword,
         hospital_name: this.state.hospitalName,
         street_name: this.state.location,
         email: this.state.email
      }
      console.log(postform);
      this.postedform(postform);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  postedform = (postform) => {
    fetch(`https://b3013e76.ngrok.io/quickstart/profile_hospital/${localStorage.getItem('user_name')}/` , {
        method: 'PUT',
        body: JSON.stringify(postform),
        headers: {
          // Accept: 'application/json, text/plain, */*',
           'Content-Type': 'application/json'

        //   'content-type': 'multipart/form-data'
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      localStorage.setItem('user_name',responseJson.user_name);
      // window.location.href = "/";
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
      case "hospitalName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "location":
        formErrors.location =
          value.length < 3 ? "minimum 3 characaters required" : "";
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
                value={this.state.userName}
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
              <label htmlFor="hospitalName">Hospital Name</label>
              <input
                className={formErrors.hospitalName.length > 0 ? "error" : null}
                value={this.state.hospitalName}
                type="text"
                name="hospitalName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.hospitalName.length > 0 && (
                <span className="errorMessage">{formErrors.hospitalName}</span>
              )}
            </div>
            <div className="location">
              <label htmlFor="location">Location</label>
              <input
                className={formErrors.location.length > 0 ? "error" : null}
                value={this.state.location}
                type="text"
                name="location"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.location.length > 0 && (
                <span className="errorMessage">{formErrors.location}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                value={this.state.password}
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
                value={this.state.confirmPassword}
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
              <button type="submit">EDIT</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default HOSPITAL_EDIT_PROFILE;