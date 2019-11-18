import React, { Component } from 'react';
import APPOINTMENT from '../../appointments/get_appointment/get_appointment';

class DOCTOR_PROFILE_USER extends Component {
  state = {
    doctors: [],
    id: this.props.match.params.id,
    id_hospital: this.props.match.params.id_hospital,
    image_path:""
  }
  componentDidMount() {
    // console.log(this.state.index)
    fetch(`https://b3013e76.ngrok.io/quickstart/doctor/${this.state.id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('token') ,
        'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then((data) => {
      this.setState({ doctors: data})
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
            {/* <h5 className="card-title">
                <img src = {"https://f6a8cd9f.ngrok.io/" + doctor.image.split('/')[3] + "/" + doctor.image.split('/')[4] +  "/" + doctor.image.split('/')[5]}
         alt = ""/></h5> */}
              <h5 className="card-title">{this.state.doctors.first_name + " " + this.state.doctors.last_name}</h5>
              <h5 className="card-title">{this.state.doctors.Qualification}</h5>
              <h5 className="card-title">
                {console.log(this.state.doctors.first_name)}
              <APPOINTMENT 
        doctor_first_name = {this.state.doctors.first_name}
        doctor_last_name = {this.state.doctors.last_name} 
        hospital_id = {this.state.id_hospital}
        qualification = {this.state.doctors.Qualification} />
              </h5>
            </div>
          </div>
        </div>
       </div>
    );
  }
  
}
export default DOCTOR_PROFILE_USER;
