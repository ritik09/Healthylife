import React, { Component } from 'react';

class HOSPITAL_PROFILE_USER extends Component {
  state = {
    hospitals: null,
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

  render() {

    return (
       <div className="container">
        <div className="col-xs-12">
        <h1>HOSPITAL_PROFILE</h1>
          
          <div className="card">
            <div className="card-body">
            <h5 className="card-title">
                <img src = {"https://f6a8cd9f.ngrok.io/" + hospitals.image.split('/')[3] + "/" + hospitals.image.split('/')[4] +  "/" + hospitals.image.split('/')[5]}
               alt = ""/></h5>
              <h5 className="card-title">{hospitals.hospital_name}</h5>
              <h5 className="card-title">{hospitals.street_name}</h5>
              <h5 className="card-title">{hospitals.user_name}</h5>
              <h5 className="card-title">{hospitals.email}</h5>
              <h5 className="card-title">
              <Link to = "/doctor" style = {{ 
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
export default HOSPITAL_PROFILE_USER;
