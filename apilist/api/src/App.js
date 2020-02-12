
import React, { Component } from "react";
import "./App.css";

import { Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import MyList from "./components/myList";
import AddList from "./components/addList";

export default class App extends Component {
  state = {
    list: [],
    name: "",
    phone: "",
    email: "",
    id: "",
    edit: false
  };
  componentDidMount = () => {
    this.getAllcontact();
  };
  getAllcontact = () => {
    axios.get("/contacts").then(res => this.setState({ list: res.data }));
  };
  addContact = () => {
    axios
      .post("/contacts", {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      })
      .then(this.getAllcontact);
    this.reset();
  };

  deleteContact = id => {
    axios
      .delete(`/contacts/${id}`)
      .then(this.getAllcontact)
      .catch(err => console.log(err));
  };
  editContact = id => {
    axios
      .put(`/contacts/${this.state.id}`,{
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      })
      .then(this.getAllcontact);this.reset()
     
  };

  handelChange = el => {
    this.setState({
      [el.target.name]: el.target.value
    });
  };

  reset = () => {
    this.setState({
      name: "",
      phone: "",
      email: ""
    });
  };
  getPerson = contact => {
    this.setState({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      id: contact._id,
      edit: true
    });
  };

  render() {
    return (
      <div>
        <h1>Contacts Card</h1>
        <Link to="/contact-list">
          <button className="button">Contact List</button>
        </Link>
        <Link to="/add-contact">
          <button className="button" onClick={()=>this.setState({ edit: false })}>Add Contactt</button>
        </Link>

        <Switch>
          <Route
            path="/contact-list"
            render={() => (
              <div className="contact-list">
                {this.state.list.map(el => (
                  <MyList contact={el} deleteContact={this.deleteContact} getPerson={this.getPerson}/>
                ))}
              </div>
            )}
          />
          <Route
            path="/add-contact"
            render={() => (
              <AddList
                handelChange={this.handelChange}
                Action={this.state.edit?this.editContact:this.addContact}
                contact={this.state}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
