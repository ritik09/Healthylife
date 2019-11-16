import React, { Component } from 'react';

class SHOW_DOCTORS_HOSPITAL extends Component {
  state = {
    doctors: []
  }
  componentDidMount() {
    fetch('https://31a6d177.ngrok.io/quickstart/hospital_profile/' , {
        method: 'GET',
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('token') ,
          'Content-Type': 'application/json'
      }
    })
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
        {this.state.doctors.map((doctor) => (
          
          <div className="card">
            <div className="card-body">
            {/* <h5 className="card-title">
                <img src = {"https://f6a8cd9f.ngrok.io/" + hospital.image.split('/')[3] + "/" + hospital.image.split('/')[4] +  "/" + hospital.image.split('/')[5]}
         alt = ""/></h5> */}
              <h5 className="card-title">{doctor.first_name} + {" "} + {doctor.last_name}</h5>
              <h5 className="card-title">{doctor.Specialisation}</h5>
              <h5 className="card-title">{doctor.Qualification}</h5>
              <h5 className="card-title">{doctor.Contact}</h5>
              <h5 className="card-title">{doctor.Years_of_Experience}</h5>
            </div>
          </div>
        ))}
        </div>
       </div>
    );
  }
  
}
export default SHOW_DOCTORS_HOSPITAL;
