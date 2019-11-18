import React, { Component } from 'react';
import HOSPITAL_NAME from './hospital_name';

class SHOW_REPLY extends Component {
  state = {
    enquiries: []
  }
  componentDidMount() {
    fetch('https://b3013e76.ngrok.io/quickstart/patient_enquiryview/', {
      method: 'GET',
      headers: {
        'Authorization' : 'JWT ' + localStorage.getItem('token')         
      }
  })
    .then(response => response.json())
    .then((data) => {
      this.setState({ enquiries: data })
      console.log(this.state.enquiries)
    })
    .catch((error) => {
      //Error 
      alert(JSON.stringify(error));
      console.error(error);
  });
  }

  // setHospitalName(hospitalName){
  //   this.setState({
  //     hospital_name:hospitalName
  //   })
  //   localStorage.setItem('hospital_name',this.state.hospital_name);
  //     // window.location.href = "/hospital_profile_user";
  // }

  render() {

    return (
       <div className="container">
        <div className="col-xs-12">
        <h1>INQUIRIES</h1>
        {this.state.enquiries.map((inquiry) => (
          
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"><HOSPITAL_NAME
              id = {inquiry.hospital_name} /></h5>
              <h5 className="card-title">QUERY : {inquiry.enquiry}</h5>
              <h5 className="card-title">REPLY : {inquiry.reply}</h5>
            </div>
          </div>
        ))}
        </div>
       </div>
    );
  }
  
}
export default SHOW_REPLY;
