import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
class ShopList extends Component {
  constructor(){
    super()
    this.state={
      name :"",
      description :"",
      shopList:[]
    }
  }

  componentDidMount(){
    fetch("/shopList")
    .then( res => res.json())
    .then( lists => this.setState({shopList:lists}))
    .catch(err => console.log(err))

  }
  submitHandler(e){
    e.preventDefault();
    const form = {
      name:this.state.name,
      description:this.state.description};
      axios.post("/shopList/create",form)
      .then( res =>   this.componentDidMount())
      .catch(err => console.log(err));
    }
    deleteHandler(e, listId){
        e.preventDefault();
        let id = listId;
        axios.post(`/shopList/${id}/delete`, id)
        .then( res => this.componentDidMount() )
        .catch(err => console.log(err));
      }

    render() {
      return (
        <section  className="container">
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
         <div>
          <ul className="list-group">
          {this.state.shopList.map((list,index) =>
           <li key = {index} className="list-group-item">
            <Link  to = {`/ShopList/${list.id}`} >{list.name}</Link>
            <button onClick = {(e)=>this.deleteHandler(e,list.id)} className="btn btn-danger float-right">delete</button>
            <Link to = {`/ShopList/${list.id}/edit`}  class="btn btn-primary float-right">edit</Link>

           </li>

          )}
          </ul>
         </div>

        </section>
      )
    }
  }
  export default ShopList
