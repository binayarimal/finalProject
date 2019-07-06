import React, { Component } from 'react';
import axios from 'axios';
class ShopListEdit extends Component {
  constructor(){
    super()
    this.state={
      name :"",
      description :"",
    }
  }

  submitHandler(e){
    e.preventDefault();
    const form = {
      name:this.state.name,
      description:this.state.description};
      axios.post(`/shopList/${this.props.match.params.id}/update`,form)
      .then( () =>   this.props.history.push('/ShopList'))
      .catch(err => console.log(err));
    }

    render() {
      return (
        <section>
         <form onSubmit = {(e)=>this.submitHandler(e)}>
          <input
            type="text"
            name="name"
            placeholder="Enter Shop List Name"
            value = {this.state.name}
            onChange = {(e)=>this.setState({name:e.target.value})} />
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            value = {this.state.description}
            onChange = {(e)=>this.setState({description:e.target.value})} />
          <input type="submit"/>
         </form>
        </section>
      )
    }
  }
  export default ShopListEdit
