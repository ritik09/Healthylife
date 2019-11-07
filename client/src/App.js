import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import BuildControls from '../src/components/buildcontrols/buildcontrols';
// import VALIDATE from '../src/components/otp/validate';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div>
<BuildControls/>
</div>
      </BrowserRouter>
    );
  }
}

export default App;
