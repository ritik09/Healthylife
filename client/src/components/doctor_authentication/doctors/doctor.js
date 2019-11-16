import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DOCTOR extends Component {
  state = {
    doctors: [],
    id: this.props.match.params.id,
    image_path:""
  }
  componentDidMount() {
    console.log(this.state.id);
    fetch(`https://31a6d177.ngrok.io/quickstart/hospital_doctor/${this.state.id}`)
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
        <h1>DOCTORS</h1>
        {this.state.doctors.map((doctor,index) => (
          
          <div className="card">
            <div className="card-body">
            {/* <h5 className="card-title">
                <img src = {"https://f6a8cd9f.ngrok.io/" + doctor.image.split('/')[3] + "/" + doctor.image.split('/')[4] +  "/" + doctor.image.split('/')[5]}
         alt = ""/></h5> */}
              <h5 className="card-title">{doctor.first_name}</h5>
              <h5 className="card-title">{doctor.Qualification}</h5>
              <h5 className="card-title">
              <Link to = {`/doctor_profile_user/${doctor.id}`} style = {{ 
                    // display:"block",
                    // fontSize: "2rem",
                  borderBottom: "6px solid blue"
               }} className="font-weight-bold"><u>VIEW PROFILE</u></Link>
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
