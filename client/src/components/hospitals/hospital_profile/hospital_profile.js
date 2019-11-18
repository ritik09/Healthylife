import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HOSPITAL_PROFILE extends Component {
  state = {
    hospitals: [],
    image_path:""
 }
  componentDidMount() {
    fetch(`https://b3013e76.ngrok.io/quickstart/profile_hospital/${localStorage.getItem('user_name')}/`, {
      method: 'GET',
      headers: {
     'Authorization' : 'JWT ' + localStorage.getItem('token')
    }
  })
    .then(response => response.json())
    .then((data) => {
      this.setState({ hospitals: data,
      image_path:"https://b3013e76.ngrok.io/" + data.image.split('/')[3] + "/" + data.image.split('/')[4] +  "/" + data.image.split('/')[5]
     })
      console.log(this.state.hospitals)
      console.log(this.state.image_path)
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
              {console.log(this.state.hospitals.image)}
            <h5 className="card-title">
                <img src = {this.state.image_path} className = "img-responsive"
               alt = ""/></h5>
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
              <h5 className="card-title">
              <Link to = "/inquiries" style = {{ 
                    // display:"block",
                    // fontSize: "2rem",
                  borderBottom: "6px solid blue"
               }} className="font-weight-bold"><u>INQUIRIES</u></Link>
              </h5>
              {/* <h5 className="card-title">
              <Link to = "/approve_appointment" style = {{ 
                    // display:"block",
                    // fontSize: "2rem",
                  borderBottom: "6px solid blue"
               }} className="font-weight-bold"><u>APPROVE APPONITMENT</u></Link>
              </h5> */}
               {/* <h5 className="card-title">
              <Link to = "/show_hospital_appointment" style = {{ 
                    // display:"block",
                    // fontSize: "2rem",
                  borderBottom: "6px solid blue"
               }} className="font-weight-bold"><u>APPOINTMENTS</u></Link>
              </h5> */}
              
            </div>
          </div>

        </div>
       </div>
    );
  }
  
}
export default HOSPITAL_PROFILE;
