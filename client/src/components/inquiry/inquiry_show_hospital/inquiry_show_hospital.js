import React, { Component } from 'react';
import REPLY from '../reply_inquiry/reply_inquiry';

class INQUIRIES extends Component {
  state = {
    inquiries: []
  }
  componentDidMount() {
    fetch('https://b3013e76.ngrok.io/quickstart/EnquiryView/', {
      method: 'GET',
      headers: {
     'Authorization' : 'JWT ' + localStorage.getItem('token')
    }
  })
    .then(response => response.json())
    .then((data) => {
      this.setState({ inquiries: data })
      console.log(this.state.inquiries)
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
        <h1>INQUIRIES</h1>
        {this.state.inquiries.map((inquiry) => (
          
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{inquiry.username}</h5>
              <h5 className="card-title">{inquiry.Query}</h5>
              <h5 className="card-title">{inquiry.contact}</h5>
              <h5 className="card-title">
                <REPLY 
                 username = {inquiry.username}
                 Query = {inquiry.Query}
                 hospitalName = {inquiry.hospital_name}
                 id = {inquiry.id}
                />
              </h5>
            </div>
          </div>
        ))}
        </div>
       </div>
    );
  }
  
}
export default INQUIRIES;
