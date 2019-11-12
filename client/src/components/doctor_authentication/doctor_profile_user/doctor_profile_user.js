import React, { Component } from 'react';
import APPOINTMENT from '../../appointments/get_appointment/get_appointment';

class DOCTOR_PROFILE_USER extends Component {
  state = {
    doctors: null,
    image_path:""
  }
  componentDidMount() {
    fetch('https://f6a8cd9f.ngrok.io/hospitals/')
    .then(response => response.json())
    .then((data) => {
      this.setState({ doctors: data })
      console.log(this.state.doctors)
    })
    .catch((error) => {
      //Error 
      alert(JSON.stringify(error));
      console.error(error);
  });
  }

  render() {

    return (
       <div className="container">
        <div className="col-xs-12">
        <h1>DOCTOR PROFILE</h1>
          
          <div className="card">
            <div className="card-body">
            <h5 className="card-title">
                <img src = {"https://f6a8cd9f.ngrok.io/" + doctors.image.split('/')[3] + "/" + doctors.image.split('/')[4] +  "/" + doctors.image.split('/')[5]}
               alt = ""/></h5>
              <h5 className="card-title">{doctors.first_name}</h5>
              <h5 className="card-title">{doctors.qualification}</h5>
              <h5 className="card-title">{doctors.specialisation}</h5>
              <h5 className="card-title">{doctors.email}</h5>
              <h5 className="card-title">
              <APPOINTMENT />
              </h5>
            </div>
          </div>
        </div>
       </div>
    );
  }
  
}
export default DOCTOR_PROFILE_USER;
