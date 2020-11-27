import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: {}
    };
  }
  handleForm = e => {
    e.preventDefault();
    if(this.state.password==='' || this.state.password_confirmation==='' || this.state.email==='' || this.state.name==='')
    {
        NotificationManager.warning("Please Enter Name,Email Password And Confirm Password");
        return false;
    }
    else if(this.state.password!==this.state.password_confirmation)
    {
        NotificationManager.warning("Your Password Not Matched ! Please Check your pasword and confirm password");
        return false;
    }
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };
    axios
    .post("http://localhost:9000/api/users/register", data)
    .then(result => {
      NotificationManager.success(result.data.msg);
    })
    .then(r=>{
       setTimeout(() => {
        NotificationManager.listNotify.forEach(n => NotificationManager.remove({ id: n.id }));
        this.props.history.push("/login");
       }, 1000);
    })
    .catch(err => {
      if (err.response && err.response.status === 400)
        NotificationManager.error(err.response.data.msg);
      else
        NotificationManager.error("Something Went Wrong");
      this.setState({ errors: err.response })
    });
};
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="content">
        <NotificationContainer />
                        <div className="col-sm-1 col-md-3"></div>
    <MDBContainer style={{ marginTop: 20 }} className="col-sm-10 col-md-6">
      <MDBRow>
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={this.handleForm}>
                <p className="h4 text-center py-4" style={{color:"green"}}>Register Up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                     required name="name" onChange={this.handleInput}
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    name="email" onChange={this.handleInput} 
                    required
                  />
        
                          <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    required name="password" onChange={this.handleInput} 
                    
                  />
                   <MDBInput
                    label="Confirm your Password"
                    icon="exclamation-triangle"
                    group
                    type="text"
                   required name="password_confirmation" onChange={this.handleInput} 
                  />

                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit" >
                    Register
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <div className="col-sm-1 col-md-3"></div>   
            </div>
    );
  }
}


export default Register;
