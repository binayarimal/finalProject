import axios from 'axios';
import React, { Component } from 'react';

 class SignIn extends Component {
   constructor(){
     super()
     this.state={
       email :"",
       password :"",
     }
   }
   signIn(e){
     e.preventDefault();
     const form = {
       email:this.state.email,
       password:this.state.password,
    };
       axios.post("/users/signIn",form)
       .then( (res) =>  {
         console.log(res);
         localStorage.setItem('user',res.data);
         this.props.history.push('/');
         window.location.reload();

       })
       .catch(err => console.log(err));
     }
   render() {
     return (
      <form  onSubmit = {(e)=>this.signIn(e)}>
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

        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    )
  }
}
export default SignIn
