import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ACCEPT_APPOINTMENT extends Component {

    state = {
        getAppointmentModal: false,
        username: this.props.username,
        doctorFirstName:this.props.doctor_first_name,
        doctorLastName:this.props.doctor_last_name,
        hospital_id:this.props.hospital_id,
        phoneNumber:this.props.phoneNumber,
        date: null,
        time: null
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

    //   componentDidMount() {
    //     console.log(this.state.hospital_id)
    //     fetch(`https://b3013e76.ngrok.io/quickstart/hospital_name/${this.state.hospital_id}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //       this.setState({ 
    //           inquiry: data
    //     })
    //       console.log(this.state.user)
    //     })
    //     .catch((error) => {
    //       //Error 
    //       alert(JSON.stringify(error));
    //       console.error(error);
    //   });
    //   }

      handleSubmit = e => {
        e.preventDefault();
    
        if (this.state.date && this.statetime) {
          console.log(`
            --SUBMITTING--
            Hospital Name: ${this.state.hospital_id}
            Doctor Name: ${this.state.doctorFirstName + " " + this.state.doctorLastName}
            Phone Number: ${this.state.phoneNumber}
            User Name: ${this.state.username}
            Date: ${this.state.date}
            Time: ${this.state.time}
          `);
          const postform = {
             username: this.state.username,
             hospital_name: this.state.hospital_id,
             first_name: this.state.doctorFirstName,
             last_name: this.state.doctorLastName,
             contact: this.state.phoneNumber,
             date: this.state.date,
             time: this.state.time
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
              'Accept': 'application/json'
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
                <Button className="displayfest btn btn-success mb-2" onClick={this.toggle}>ACCEPT</Button>
        <Modal isOpen={this.state.getAppointmentModal} toggle={this.toggle}  centered={true} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><div className = "font-weight-bold" style = {{
              marginLeft : "8rem" , 
              fontSize : "1.5rem",
              color: "crimson"
          }}>
              DETAILS</div></ModalHeader>
          <ModalBody className = "text-center">
              <div>
              <label htmlFor="phoneNumber">DATE:</label>
              <input
                placeholder="DATE"
                type="date"
                name="date"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">TIME:</label>
              <input
                placeholder="DATE"
                type="time"
                name="time"
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

export default ACCEPT_APPOINTMENT;