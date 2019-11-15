import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardUp, MDBCardBody, MDBAvatar, MDBRotatingCard, MDBIcon } from "mdbreact";

class FlippingCardPage extends Component {

state = {
  flipped1: false,
}

handleFlipping = id => () => {
  const cardId = `flipped${id}`;
  this.setState({ [cardId]: !this.state[cardId] });
}

render() {
  return (
    <MDBContainer>
      <MDBRow between>
        <MDBCol style={{ minHeight: '26rem', maxWidth: "22rem" }}>
          <MDBRotatingCard flipped={this.state.flipped1} className="text-center h-100 w-100">
            <MDBCard className="face front">
              <MDBCardUp>
                <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/photo7.jpg" alt="" />
              </MDBCardUp>
              <MDBAvatar className="mx-auto white" circle>
                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg" alt="" className="rounded-circle" />
              </MDBAvatar>
              <MDBCardBody>
                <h4 className="font-weight-bold mb-3">Marie Johnson</h4>
                <p className="font-weight-bold blue-text">Web developer</p>
                <a href="#!" className="rotate-btn text-dark" data-card="card-1" onClick={this.handleFlipping(1)}>
                  <MDBIcon icon="redo" /> Click here to rotate
                </a>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="face back" style={{ height: "400px" }}>
              <MDBCardBody>
                <h4 className="font-weight-bold">About me</h4>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Maxime quae, dolores dicta. Blanditiis rem amet repellat,
                  dolores nihil quae in mollitia asperiores ut rerum
                  repellendus, voluptatum eum, officia laudantium quaerat?
                </p>
                <hr />
                <ul className="list-inline py-2">
                  <li className="list-inline-item">
                    <a href="#!" className="p-2 fa-lg fb-ic">
                      <MDBIcon fab icon="facebook-f" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#!" className="p-2 fa-lg tw-ic">
                      <MDBIcon fab icon="twitter" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#!" className="p-2 fa-lg gplus-ic">
                      <MDBIcon fab icon="google-plus" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#!" className="p-2 fa-lg li-ic">
                      <MDBIcon fab icon="linkedin" />
                    </a>
                  </li>
                </ul>
                <a href="#!" className="rotate-btn text-dark" data-card="card-1" onClick={this.handleFlipping(1)}>
                  <MDBIcon icon="undo" /> Click here to rotate back
                </a>
              </MDBCardBody>
            </MDBCard>
          </MDBRotatingCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    );
  }
}

export default FlippingCardPage;