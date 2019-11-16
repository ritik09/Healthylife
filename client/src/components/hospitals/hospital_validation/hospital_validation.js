import React, { Component } from "react";

class VALIDATE_HOSPITAL extends Component {
  constructor(props) {
    super(props);

    this.state = {
        otp: null,
      formErrors: {
          otp: ""
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
  
    let otpError = "";
      if (!this.state.otp) {
        otpError = "this field cannot be blank";
      }
      else {
          otpError = "";
      }

      if(otpError){
        this.setState(prevState => ({
          formErrors: {
            ...prevState.formErrors,
            otp: otpError          }
        }));
        valid = false;
      }

    return valid;
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.formValid(this.state)) {
      const postform = {
         otp: this.state.otp,
         user_id: localStorage.getItem('user_id')
      }
      this.postedform(postform)
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  postedform = (postform) => {
    console.log(postform);
      fetch(`https://31a6d177.ngrok.io/validateotp/${localStorage.getItem('user_id')}/` , {
          method: 'POST',
          body: JSON.stringify(postform),
          headers: {
            'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        window.location.href = "/login_hospital";

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
          <h1>Enter the otp</h1>
          <form onSubmit={this.handleSubmit} noValidate>
          <div className="userName">
              <label htmlFor="userName">OTP</label>
              <input
                className={formErrors.otp.length > 0 ? "error" : null}
                placeholder="OTP"
                type="number"
                name="otp"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.otp.length > 0 && (
                <span className="errorMessage">{formErrors.otp}</span>
              )}
            </div>
            <div className="login">
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default VALIDATE_HOSPITAL;