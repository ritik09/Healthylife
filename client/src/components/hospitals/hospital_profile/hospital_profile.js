import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HOSPITAL_PROFILE extends Component {
  state = {
    hospitals: [],
    image_path:""
 }
  componentDidMount() {
    fetch(`https://b7cf50b9.ngrok.io/quickstart/profile_hospital/${localStorage.getItem('user_name')}/`)
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

  render() {

    return (
       <div className="container">
        <div className="col-xs-12">
        <h1>HOSPITAL_PROFILE</h1>
          
          <div className="card">
            <div className="card-body">
            {/* <h5 className="card-title">
                <img src = {"https://f6a8cd9f.ngrok.io/" + hospitals.image.split('/')[3] + "/" + hospitals.image.split('/')[4] +  "/" + hospitals.image.split('/')[5]}
               alt = ""/></h5> */}
              <h5 className="card-title">{this.state.hospitals.hospital_name}</h5>
              <h5 className="card-title">{this.state.hospitals.street_name}</h5>
              <h5 className="card-title">{this.state.hospitals.user_name}</h5>
              <h5 className="card-title">{this.state.hospitals.email}</h5>
              <h5 className="card-title">
              <Link to = "/doctor_signup" style = {{ 
                    // display:"block",
                    // fontSize: "2rem",
                  borderBottom: "6px solid blue"
               }} className="font-weight-bold"><u>ADD DOCTOR</u></Link>
              </h5>
              <h5 className="card-title">
              <Link to = "/hospital_edit_profile" style = {{ 
                    // display:"block",
                    // fontSize: "2rem",
                  borderBottom: "6px solid blue"
               }} className="font-weight-bold"><u>Edit Profile</u></Link>
              </h5>
              <h5 className="card-title">
              <Link to = "/show_doctors_hospital" style = {{ 
                    // display:"block",
                    // fontSize: "2rem",
                  borderBottom: "6px solid blue"
               }} className="font-weight-bold"><u>DOCTORS</u></Link>
              </h5>
            </div>
          </div>
        </div>
       </div>
    );
  }
  
}
export default HOSPITAL_PROFILE;
