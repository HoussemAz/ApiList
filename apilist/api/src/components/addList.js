import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class addList extends Component {
  render() {
    return (
        <div className="add-card">

        <p className="card-title-add">
          {this.props.contact.edit ? "Edit Contact" : "New Contact"}
        </p>

        <input
          type="text"
          placeholder="name..."
          name="name"
          value={this.props.contact.name}
          onChange={this.props.handelChange}
        />
        <input
          type="text"
          placeholder="phone..."
          name="phone"
          value={this.props.contact.phone}
          onChange={this.props.handelChange}
        />
        <input
          type="text"
          placeholder="email..."
          name="email"
          value={this.props.contact.email}
          onChange={this.props.handelChange}
        />
        <Link to="/contact-list">
          <input
            type="button"
            value={this.props.contact.edit ? "Save" : "Add Contact"}
            className="add-button"
            onClick={this.props.Action}
          />
        </Link>
      </div>
    );
  }
}
