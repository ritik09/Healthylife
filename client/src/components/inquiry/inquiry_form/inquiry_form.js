import React, { Component } from "react";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class INQUIRY_FORM extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userName: localStorage.getItem('user_name'),
      hospitalName: null,
      phoneNumber: null,
      id: this.props.match.params.id,
      query: null,
      formErrors: {
          userName: "",
        hospitalName: "",
        phoneNumber: "",
        query: ""
      }
    };
  }

  componentDidMount() {
    console.log(this.state.id);
    fetch(`https://b3013e76.ngrok.io/quickstart/hospital_name/${this.state.id}`, {
      method: 'GET',
      headers: {
     'Authorization' : 'JWT ' + localStorage.getItem('token')
    }
  })
    .then(response => response.json())
    .then((data) => {
      this.setState({ hospitalName: data.hospital_name })
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
    let phoneNumberError = "";
    let queryError = "";
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
    if (!this.state.phoneNumber) {
      phoneNumberError = "this field cannot be blank";
    }
    else {
        phoneNumberError = "";
    }
    if (!this.state.query) {
      queryError = "this field cannot be blank";
    }
    else {
        queryError = "";
    }

    if(userNameError || hospitalNameError || phoneNumberError || queryError){
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          userName: userNameError,
          hospitalName: hospitalNameError,
          phoneNumber: phoneNumberError,
          // email: emailError,
          query: queryError
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
        Location: ${this.state.phoneNumber}
        Query: ${this.state.query}
      `);
      const postform = {
         username: this.state.userName,
        //  email: this.state.email,
         hospital_name: this.state.id,
         contact: this.state.phoneNumber,
         Query: this.state.query
      }
      console.log(postform);
      this.postedform(postform);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  postedform = (form_data) => {
    fetch('https://b3013e76.ngrok.io/quickstart/make_enquiry/' , {
        method: 'POST',
        body: JSON.stringify(form_data),
        headers: {
      "Content-Type": "application/json",
      'Authorization' : 'JWT ' + localStorage.getItem('token')
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    //   localStorage.setItem('user_id',responseJson.user_id);
    //   window.location.href = "/validate_hospital";
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
      case "phoneNumber":
        formErrors.phoneNumber =
          value.length < 10 ? " 10 characaters required" : "";
          break;
          case "query":
        formErrors.query =
          value.length < 10 ? " minimum 10 characaters required" : "";
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
          <h1>INQUIRY</h1>
          <form  noValidate>
            <div className="firstName">
             Hospital Name  :  {this.state.hospitalName}
            </div>
            <div className="location">
              <label htmlFor="phoneNumber">PHONE NUMBER</label>
              <input
                className={formErrors.phoneNumber.length > 0 ? "error" : null}
                placeholder="phoneNumber"
                type="text"
                name="phoneNumber"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.phoneNumber.length > 0 && (
                <span className="errorMessage">{formErrors.phoneNumber}</span>
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
            <div className="email">
              <label htmlFor="query">Query</label>
              <textarea
                className={formErrors.query.length > 0 ? "error" : null}
                placeholder="Enter your query"
                rows="4" cols="50"
                name="query"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.query.length > 0 && (
                <span className="errorMessage">{formErrors.query}</span>
              )}
            </div>

            <div className="createAccount">
              <button onClick = {this.handleSubmit} type="button">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default INQUIRY_FORM;