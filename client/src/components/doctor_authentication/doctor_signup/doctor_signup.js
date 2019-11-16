import React, { Component } from "react";
import "./doctor_signup.css";

// const emailRegex = RegExp(
//   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// );

class DOCTOR_SIGNUP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hospitals: [],
      firstName: null,
      lastName: null,
      // email: null,
      speciality: null,
      qualification: null,
      yearOfExperience: null,
      phoneNumber: null,
      // password: null,
      // confirmPassword: null,
      formErrors: {
        firstName: "",
        lastName: "",
        // email: "",
        speciality: "",
      qualification: "",
      yearOfExperience: "",
      phoneNumber: "",
        // password: "",
        // confirmPassword: ""
      }
    };
  }
  // componentDidMount() {
  //   fetch('https://f6a8cd9f.ngrok.io/hospitals/')
  //   .then(response => response.json())
  //   .then((data) => {
  //     this.setState({ hospitals: data })
  //     console.log(this.state.hospitals)
  //   })
  //   .catch((error) => {
  //     //Error 
  //     alert(JSON.stringify(error));
  //     console.error(error);
  // });
  // }

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

    let firstNameError = "";
    let lastNameError = "";
    // let emailError = "";
    let specialityError = "";
    let qualificationError = "";
    let yearOfExperienceError = "";
    let phoneNumberError = "";
    // let passwordError = "";
    // let confirmPasswordError = "";
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
    // if (!this.state.email) {
    //     emailError = "email cannot be blank";
    // }
    // else {
    //     emailError = "";
    // }
    if (!this.state.speciality) {
        specialityError = "this field cannot be blank";
    }
    else {
        specialityError = "";
    }
    if (!this.state.qualification) {
        qualificationError = "this field cannot be blank";
    }
    else {
          qualificationError = "";
    }
    if (!this.state.yearOfExperience) {
        yearOfExperienceError = "this field cannot be blank";
    }
    else {
        yearOfExperienceError = "";
    }
    if (!this.state.phoneNumber) {
        phoneNumberError = "this field cannot be blank";
    }
    else {
        phoneNumberError = "";
    }
    // if (!this.state.password) {
    //   passwordError = "enter password";
    // }
    // else {
    //     passwordError = "";
    // }
    // if (!this.state.confirmPassword) {
    //   confirmPasswordError = "this field cannot be blank";
    // }
    // else {
    //     confirmPasswordError = "";
    // }

    if(firstNameError || lastNameError || specialityError || qualificationError || yearOfExperienceError || phoneNumberError){
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          firstName: firstNameError,
          lastName: lastNameError,
          // email: emailError,
          speciality: specialityError,
          qualification: qualificationError,
          yearOfExperience: yearOfExperienceError,
          phoneNumber: phoneNumberError, 
          // password: passwordError,
          // confirmPassword: confirmPasswordError
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
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        // Email: ${this.state.email}
        Speciality: ${this.state.speciality}
        Qualification: ${this.state.qualification}
        Year Of experience: ${this.state.yearOfExperience}
        Phone Number: ${this.state.phoneNumber}
        // Password: ${this.state.password}
        // Confirm Password: ${this.state.confirmPassword}
      `);
      const postform = {
        //  email: this.state.email,
        //  password: this.state.password,
        //  confirm_password: this.state.confirmPassword,
         first_name: this.state.firstName,
         last_name: this.state.lastName,
         Qualification: this.state.qualification,
         Specialization: this.state.speciality,
         Years_of_Experience: this.state.yearOfExperience,
         Contact: this.state.phoneNumber,
         hospital: localStorage.getItem('user_id')
      }
      this.postedform(postform)
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  postedform = (postform) => {
    fetch('https://31a6d177.ngrok.io/quickstart/hospital/' , {
        method: 'POST',
        body: JSON.stringify(postform),
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token') ,
          'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      // localStorage.setItem('user_id',responseJson.user_id);
      // window.location.href = "/hospital_profile";
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
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      // case "email":
      //   formErrors.email = emailRegex.test(value)
      //     ? ""
      //     : "invalid email address";
      //   break;
        case "phoneNumber":
            formErrors.phoneNumber =
              value.length < 10 ? "Phone Number should be of 10 digit" : "";
            break;
      // case "password":
      //   formErrors.password =
      //     value.length < 6 ? "minimum 6 characaters required" : "";
      //   break;
      // case "confirmPassword": 
      //   formErrors.confirmPassword = 
      //   value !== this.state.password ? "password does not match" : "";
      //   break;
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
            {/* <div className="email">
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
            </div> */}
            <div className="phoneNumber">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                className={formErrors.phoneNumber.length > 0 ? "error" : null}
                placeholder="Phone Number"
                type="text"
                name="phoneNumber"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.phoneNumber.length > 0 && (
                <span className="errorMessage">{formErrors.phoneNumber}</span>
              )}
            </div>
            <div className="qualification">
              <label htmlFor="qualification">Qualification</label>
              <input
                className={formErrors.qualification.length > 0 ? "error" : null}
                placeholder="Qualification"
                type="text"
                name="qualification"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.qualification.length > 0 && (
                <span className="errorMessage">{formErrors.qualification}</span>
              )}
            </div>
            <div className="speciality">
              <label htmlFor="speciality">Speciality</label>
              <input
                className={formErrors.speciality.length > 0 ? "error" : null}
                placeholder="Specialisation"
                type="text"
                name="speciality"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.speciality.length > 0 && (
                <span className="errorMessage">{formErrors.speciality}</span>
              )}
            </div>
            <div className="yearOfExperience">
              <label htmlFor="yearOfExperience">Years of Experience</label>
              <input
                className={formErrors.yearOfExperience.length > 0 ? "error" : null}
                placeholder="Years of Experience"
                type="text"
                name="yearOfExperience"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.yearOfExperience.length > 0 && (
                <span className="errorMessage">{formErrors.yearOfExperience}</span>
              )}
            </div>
            {/* <div className="password">
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
            </div> */}
            
            <div className="createAccount">
              <button type="submit">Create Account</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default DOCTOR_SIGNUP;