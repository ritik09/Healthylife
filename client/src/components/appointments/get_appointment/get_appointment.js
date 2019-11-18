import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class APPOINTMENT extends Component {

    state = {
        user: [],
        getAppointmentModal: false,
        doctorFirstName:this.props.doctor_first_name,
        doctorLastName:this.props.doctor_last_name,
        hospital_id:this.props.hospital_id,
        qualification:this.props.qualification,
        hospitalName:null,
        phoneNumber:null
      }

    constructor(props) {
        super(props);
        this.width = props.width || "350px";
        this.style = props.style || {};
        this.toggle = this.toggle.bind(this);
    }

    toggle () {
        this.setState(prevState => ({
            getAppointmentModal: !prevState.getAppointmentModal
        }));
    }

      componentDidMount() {
        console.log(this.state.hospital_id)
        fetch(`https://b3013e76.ngrok.io/quickstart/hospital_name/${this.state.hospital_id}`, {
          method: 'GET',
          headers: {
            'Authorization' : 'JWT ' + localStorage.getItem('token')         
          }
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({ 
              user: data,
              // doctorName:localStorage.getItem('doctor_name'),
              hospitalName:data.hospital_name
        })
          console.log(this.state.user)
        })
        .catch((error) => {
          //Error 
          alert(JSON.stringify(error));
          console.error(error);
      });
      }

      handleSubmit = e => {
        e.preventDefault();
    
        if (this.state.phoneNumber.length == 10) {
          console.log(`
            --SUBMITTING--
            Hospital Name: ${this.state.hospitalName}
            Doctor Name: ${this.state.doctorFirstName + " " + this.state.doctorLastName}
            Phone Number: ${this.state.phoneNumber}
            User Name: ${localStorage.getItem('user_name')}
          `);
          const postform = {
             username: localStorage.getItem('user_name'),
             hospital_name: this.state.hospital_id,
             first_name: this.state.doctorFirstName,
             last_name: this.state.doctorLastName,
             contact: this.state.phoneNumber
          }
          this.postedform(postform)
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
      postedform = (postform) => {
        fetch('https://b3013e76.ngrok.io/quickstart/make_appointment/' , {
            method: 'POST',
            body: JSON.stringify(postform),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization' : 'JWT ' + localStorage.getItem('token')
          }
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);

        })
        .catch((error) => {
          //Error 
          alert(JSON.stringify(error));
          console.error(error);
      });
    };


      handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value });
      }

    render() {
        return (
            <div>
                <Button className="displayfest btn btn-success mb-2" onClick={this.toggle}>APPOINTMENT</Button>
        <Modal isOpen={this.state.getAppointmentModal} toggle={this.toggle}  centered={true} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><div className = "font-weight-bold" style = {{
              marginLeft : "8rem" , 
              fontSize : "1.5rem",
              color: "crimson"
          }}>
              APPLY</div></ModalHeader>
          <ModalBody className = "text-center">
              <div>
                  <b>Doctor Name:</b>{this.state.doctorFirstName + " " + this.state.doctorLastName}
              </div>
              <div>
                  <b>Hospital Name:</b>{this.state.hospitalName}
              </div>
              <div>
                  <b>Qulaification:</b>{this.state.qualification}
              </div>
              <div>
                  Enter your Phone Number
              </div>
              <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                placeholder="Phone Number"
                type="text"
                name="phoneNumber"
                onChange={this.handleChange}
              />
            </div>
              
          </ModalBody>
          <ModalFooter>
          <form onSubmit={this.handleSubmit}>
              <Button color="secondary" onClick={this.toggle} type = "submit">Submit</Button>
              </form>
          </ModalFooter>
        </Modal>
            </div>
        )
    }
}

export default APPOINTMENT;