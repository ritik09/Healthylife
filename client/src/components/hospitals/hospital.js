import React, { Component } from 'react';

class HOSPITAL extends Component {
  state = {
    hospitals: [],
    hospital_name:null,
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

  setHospitalName(hospitalName){
    this.setState({
      hospital_name:hospitalName
    })
    localStorage.setItem('hospital_name',this.state.hospital_name);
      window.location.href = "/hospital_profile_user";
  }

  render() {

    return (
       <div className="container">
        <div className="col-xs-12">
        <h1>HOSPITALS</h1>
        {this.state.hospitals.map((hospital) => (
          
          <div className="card">
            <div className="card-body">
            <h5 className="card-title">
                <img src = {"https://f6a8cd9f.ngrok.io/" + hospital.image.split('/')[3] + "/" + hospital.image.split('/')[4] +  "/" + hospital.image.split('/')[5]}
         alt = ""/></h5>
              <h5 className="card-title">{hospital.hospital_name}</h5>
              <h5 className="card-title">{hospital.street_name}</h5>
              <h5 className="card-title">
              <form>
              <button onClick = {this.setHospitalName(hospital.hospital_name)} type="submit">VIEW PROFILE</button>
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
export default HOSPITAL;
