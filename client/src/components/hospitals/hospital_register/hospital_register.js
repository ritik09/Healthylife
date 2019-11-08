import React, { Component } from "react";
import "./hospital_register.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class HOSPITAL_SIGN extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userName: null,
      hospitalName: null,
      email: null,
      location: null,
      password: null,
      image: null,
      confirmPassword: null,
      formErrors: {
          userName: "",
        hospitalName: "",
        email: "",
        location: "",
        password: "",
        confirmPassword: "",
        image: ""
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
    let hospitalNameError = "";
    let emailError = "";
    let locationError = "";
    let passwordError = "";
    let imageError = "";
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
    if (!this.state.email) {
        emailError = "email cannot be blank";
    }
    else {
        emailError = "";
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
    if (!this.state.image) {
      imageError = "choose image";
    }
    else {
        imageError = "";
    }

    if(userNameError || hospitalNameError || emailError || locationError || passwordError || imageError|| confirmPasswordError){
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          userName: userNameError,
          hospitalName: hospitalNameError,
          location: locationError,
          email: emailError,
          password: passwordError,
          confirmPassword: confirmPasswordError,
          image: imageError
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
        Email: ${this.state.email}
        Location: ${this.state.location}
        Password: ${this.state.password}
        Image: ${this.state.image}
      `);
      // const postform = {
      //    username: this.state.userName,
      //    email: this.state.email,
      //    password: this.state.password,
      //    confirm_password: this.state.confirmPassword,
      //    hospital_name: this.state.hospitalName,
      //    street_name: this.state.location,
      //    image: this.state.image + this.state.image.name
      // }
      let form_data = new FormData();
      form_data.append('username',this.state.userName);
      form_data.append('email',this.state.email);
      form_data.append('password',this.state.password);
      form_data.append('confirm_password',this.state.confirmPassword);
      form_data.append('hospital_name',this.state.hospitalName);
      form_data.append('street_name',this.state.location);
      form_data.append('image',this.state.image); 
      this.postedform(form_data)
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  postedform = (form_data) => {
    fetch('https://1f7f75fd.ngrok.io/quickstart/signup_as_hospital/' , {
        method: 'POST',
        body: JSON.stringify(form_data),
        headers: {
          'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      localStorage.setItem('user_id',responseJson.user_id);
      window.location.href = "/validate_hospital";
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
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
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
  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
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
              <label htmlFor="hospitalName">Hospital Name</label>
              <input
                className={formErrors.hospitalName.length > 0 ? "error" : null}
                placeholder="Hospital Name"
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
                placeholder="Location"
                type="text"
                name="location"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.location.length > 0 && (
                <span className="errorMessage">{formErrors.location}</span>
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
            <div className="image">
              <label htmlFor="image">Image</label>
              <input
                className={formErrors.image.length > 0 ? "error" : null}
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                noValidate
                onChange={this.handleImageChange}
              />
              {formErrors.image.length > 0 && (
                <span className="errorMessage">{formErrors.image}</span>
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

export default HOSPITAL_SIGN;