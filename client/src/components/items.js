import React, { Component } from 'react';
import axios from 'axios';
import io from "socket.io-client";

class Items extends Component {
  constructor(){
    super()
    this.state={
      item :"",
      itemList:[],
      email:"",
      endpoint : "http://localhost:5000"
    }
  }
 setItemList(items){
   this.setState({itemList:items})
 }
  componentDidMount(){
    const socket = io(this.state.endpoint);
    socket.emit('give items', this.props.match.params.id);
    socket.on('show items', (items) => {
        console.log(items);
        this.setItemList(items)
          });
  }
  submitHandler(e){
      const socket = io(this.state.endpoint);
    e.preventDefault();
    const data = {
      item:this.state.item,
      shopListId:this.props.match.params.id
    };
    socket.emit('post items', data);
    socket.on('success', (items) => {
      this.componentDidMount()
          });
    }
    statusHandler(e, item){
      e.preventDefault();
      let id ={itemId: item.id}
      if (item.status === "added"){
      axios.post(`/ShopList/${this.props.match.params.id}/items/${item.id}/mark`, id)
      .then( (res) => {  this.componentDidMount();
      console.log(res)})
      .catch(err => console.log(err));
    } else{
      axios.post(`/ShopList/${this.props.match.params.id}/items/${item.id}/unMark`,id )
      .then( (res) => {  this.componentDidMount();})
        .catch(err => console.log(err));
    }

    }
    collabHandler(e){
        e.preventDefault();
          let body = {email:this.state.email};
        axios.post(`/shopList/${this.props.match.params.id}/collab`, body)
        .then( res => this.componentDidMount() )
        .catch(err => console.log(err));
    }
    deleteHandler(e, itemId){
        e.preventDefault();
        let id = itemId;
        axios.post(`/shopList/${this.props.match.params.id}/items/${id}/delete`, id)
        .then( res => this.componentDidMount() )
        .catch(err => console.log(err));
      }
    render() {
      return (
        <div className = "container">
        <section>
        <form onSubmit = {(e)=>this.submitHandler(e)}>
        <input
        type="text"
        name="name"
        placeholder="Enter item"
        value = {this.state.item}
        onChange = {(e)=>this.setState({item:e.target.value})} />
        <input type="submit"/>
        </form>
        <div>
        <ul className="list-group">
        {this.state.itemList.map((item,index) =>
          <li className="list-group-item" key = {index}>
            {item.title}
              <button className="btn btn-primary float-right" onClick = {(e)=>this.deleteHandler(e,item.id)}>delete</button>
              <button className="btn btn-primary float-right" onClick  = {(e)=>this.statusHandler(e,item)}>{item.status}</button>
          </li>

        )}
        </ul>
        </div>

        </section>
        <section>
        <form onSubmit = {(e)=>this.collabHandler(e)}>
        <input
        type="email"
        placeholder="Enter collaborator email"
        value = {this.state.email}
        onChange = {(e)=>this.setState({email:e.target.value})} />
        <input type="submit"/>
        </form>
        </section>
        </div>
      )
    }

}
export default Items
