import React, { Component } from 'react';

class SHOW_USER_APPOINTMENT extends Component {
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
              <h5 className="card-title">{appointment.hospital_name}</h5>
              <h5 className="card-title">{appointment.doctor_name}</h5>
              <h5 className="card-title">{appointment.date}</h5>
              <h5 className="card-title">{appointment.time}</h5>
            </div>
          </div>
        ))}
        </div>
       </div>
    );
  }
  
}
export default SHOW_USER_APPOINTMENT;
