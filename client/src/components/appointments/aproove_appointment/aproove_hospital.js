import React, { Component } from 'react';
import ACCEPT_APPOINTMENT from'../aproove_appointment/accept';

class APPROVE_APPOINTMENT extends Component {
  state = {
    appointments: []
  }
  componentDidMount() {
      // fetch appointment url
    fetch('https://b3013e76.ngrok.io/hospitals/')
    .then(response => response.json())
    .then((data) => {
      this.setState({ appointments: data })
      console.log(this.state.appointments)
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
        <h1>APPOINTMNETS</h1>
        {this.state.hospitals.map((appointment) => (
          
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{appointment.user_name}</h5>
              <h5 className="card-title">{appointment.first_name + " " + appointment.last_name}</h5>
              <h5 className="card-title">{appointment.contact}</h5>
              <h5 className="card-title"><ACCEPT_APPOINTMENT /></h5>
            </div>
          </div>
        ))}
        </div>
       </div>
    );
  }
  
}
export default APPROVE_APPOINTMENT;
