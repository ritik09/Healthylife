import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import BuildControls from '../src/components/buildcontrols/buildcontrols';
// import DOCTOR_SIGNUP from '../src/components/doctor_authentication/doctor_signup/doctor_signup';
// import VALIDATE from '../src/components/otp/validate';
import HOSPITAL_SIGN from '../src/components/hospitals/hospital_register/hospital_register';

class App extends Component {

  render() {
    return (
//       <BrowserRouter>
//       <div>
// <BuildControls/>
// </div>
//       </BrowserRouter>
<div>
  <HOSPITAL_SIGN />
</div>
    );
  }
}

export default App;
