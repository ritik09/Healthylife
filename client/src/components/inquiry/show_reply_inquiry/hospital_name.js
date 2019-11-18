import React, { Component } from 'react';

class HOSPITAL_NAME extends Component {
  state = {
    hospital_name: "",
    hospital_id: this.props.id
  }
  componentDidMount() {
    fetch(`https://b3013e76.ngrok.io/quickstart/hospital_name/${this.state.hospital_id}`, {
      method: 'GET',
      headers: {
        'Authorization' : 'JWT ' + localStorage.getItem('token')         
      }
  })
    .then(response => response.json())
    .then((data) => {
      this.setState({ hospital_name: data.hospital_name })
      console.log(this.state.hospital_name)
    })
    .catch((error) => {
      //Error 
      alert(JSON.stringify(error));
      console.error(error);
  });
  }

  render() {

    return (
        <h1>{this.state.hospital_name}</h1>
    );
  }
  
}
export default HOSPITAL_NAME;
