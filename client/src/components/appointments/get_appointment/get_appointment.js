import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class APPOINTMENT extends Component {

    state = {
        user: [],
        getAppointmentModal: false,
        doctorName:null,
        hospitalName:null,
        userName:null,
        email:null,
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
        //   user_id url
        fetch('https://f6a8cd9f.ngrok.io/hospitals/')
        .then(response => response.json())
        .then((data) => {
          this.setState({ 
              user: data,
              doctorName:localStorage.getItem('doctor_name'),
              hospitalName:localStorage.getItem('hospital_name'),
              email:data.email,
              userName:data.user_name
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
            User Name: ${this.state.userName}
            Hospital Name: ${this.state.hospitalName}
            Doctor Name: ${this.state.doctorName}
            Email: ${this.state.email}
            Phone Number: ${this.state.phoneNumber}
          `);
          const postform = {
             username: this.state.userName,
             email: this.state.email,
             hospital_name: this.state.hospitalName,
             doctor_name: this.state.doctorName,
             phone_number: this.state.phoneNumber
          }
          this.postedform(postform)
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
      postedform = (postform) => {
        fetch('https://f6a8cd9f.ngrok.io/quickstart/signup/' , {
            method: 'POST',
            body: JSON.stringify(postform),
            headers: {
              'Content-Type': 'application/json'
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
                  <b>Doctor Name:</b>{this.state.doctorName}
              </div>
              <div>
                  <b>Hospital Name:</b>{this.state.hospitalName}
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
              <Button color="secondary" onClick={this.toggle}>Submit</Button>
              </form>
          </ModalFooter>
        </Modal>
            </div>
        )
    }
}

export default APPOINTMENT;