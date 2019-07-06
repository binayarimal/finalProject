
import axios from 'axios';
import React, { Component } from 'react';

 class SignUp extends Component {
   constructor(){
     super()
     this.state={
       email :"",
       password :"",
       passwordConfirmation:"",
     }
   }
   signUp(e){
     e.preventDefault();
     const form = {
       email:this.state.email,
       password:this.state.password,
       passwordConfrimation:this.state.passwordCondirmation};
       axios.post("/users",form)
       .then( (res) => {
         if(res.data === "success"){
         localStorage.setItem('user',res.data);
         this.props.history.push("/");
         window.location.reload();
       } else
         {console.log(res.data)}
       }
       )
       .catch(err => console.log(err));
     }
   render() {
     return (
      <form  onSubmit = {(e)=>this.signUp(e)}>
        <div >
          <label>Email</label>
          <input
          type="email"
          className="form-control"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value = {this.state.email}
          onChange = {(e)=>this.setState({email:e.target.value})}>
          </input>
        </div>

        <div>
          <label>Password</label>
          <input
           type="password"
           className="form-control"
           name="password"
           aria-describedby="passwordHelp"
           placeholder="Enter password"
           value = {this.state.password}
           onChange = {(e)=>this.setState({password:e.target.value})}>
         </input>
        </div>

        <div>
          <label>Password Confirmation</label>
          <input
           type="password"
           className="form-control"
           name="passwordConfirmation"
           aria-describedby="passwordHelp"
           placeholder="Enter password"
           value = {this.state.passwordConfrimation}
           onChange = {(e)=>this.setState({passwordConfirmation:e.target.value})}>
         </input>
        </div>

        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    )
  }
}
export default SignUp
