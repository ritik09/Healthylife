import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class REPLY_INQUIRY extends Component {

    state = {
        getAppointmentModal: false,
        query:this.props.Query,
        username:this.props.username,
        hospital_name:this.props.hospitalName,
        id:this.props.id,
        reply:null
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

      handleSubmit = e => {
        e.preventDefault();
    
        if (this.state.reply) {
          console.log(`
            --SUBMITTING--
            User: ${this.state.username}
            query: ${this.state.query}
            reply: ${this.state.reply}
            id: ${this.state.id}
            Hospital Name: ${this.state.hospital_name}
          `);
          const postform = {
             username: this.state.username,
             enquiry: this.state.query,
             reply: this.state.reply,
             hospital_name: this.state.hospital_name,
             id: this.state.id
          }
          this.postedform(postform)
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
      postedform = (postform) => {
        console.log(postform)
        fetch(`https://b3013e76.ngrok.io/quickstart/reply_enquiry/${this.state.id}/` , {
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
              
              {console.log(typeof(this.state.id))}
                <Button className="displayfest btn btn-success mb-2" onClick={this.toggle}>REPLY</Button>
        <Modal isOpen={this.state.getAppointmentModal} toggle={this.toggle}  centered={true} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><div className = "font-weight-bold" style = {{
              marginLeft : "8rem" , 
              fontSize : "1.5rem",
              color: "crimson"
          }}>
              REPLY</div></ModalHeader>
          <ModalBody className = "text-center">
              <div>
              <label htmlFor="reply"></label>
              <textarea
                placeholder="Enter your reply"
                rows="4" cols="50"
                name="reply"
                noValidate
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

export default REPLY_INQUIRY;