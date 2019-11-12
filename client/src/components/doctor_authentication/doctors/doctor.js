import React, { Component } from 'react';

class DOCTOR extends Component {
  state = {
    doctors: [],
    doctor_name:null,
    image_path:""
  }
  componentDidMount() {
    fetch('https://f6a8cd9f.ngrok.io/hospitals/')
    .then(response => response.json())
    .then((data) => {
      this.setState({ hospitals: data })
      console.log(this.state.hospitals)
    })
    .catch((error) => {
      //Error 
      alert(JSON.stringify(error));
      console.error(error);
  });
  }

  setHospitalName(doctorName){
    this.setState({
      doctor_name:doctorName
    })
    localStorage.setItem('doctor_name',this.state.doctor_name);
      window.location.href = "/doctor_profile_user";
  }

  render() {

    return (
       <div className="container">
        <div className="col-xs-12">
        <h1>DOCTORS</h1>
        {this.state.hospitals.map((doctor) => (
          
          <div className="card">
            <div className="card-body">
            <h5 className="card-title">
                <img src = {"https://f6a8cd9f.ngrok.io/" + doctor.image.split('/')[3] + "/" + doctor.image.split('/')[4] +  "/" + doctor.image.split('/')[5]}
         alt = ""/></h5>
              <h5 className="card-title">{doctor.first_name}</h5>
              <h5 className="card-title">{doctor.qualification}</h5>
              <h5 className="card-title">
              <form>
              <button onClick = {this.setDoctorName(doctor.first_name)} type="submit">VIEW PROFILE</button>
              </form>
              </h5>
            </div>
          </div>
        ))}
        </div>
       </div>
    );
  }
  
}
export default DOCTOR;
