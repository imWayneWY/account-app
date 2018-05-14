import React, { Component } from 'react';

export default class RecordForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
          data: "",
          title: "",
          amount: ""
      }
  }
  handleChange(event) {
      const {name, value} = event.target;
      this.setState({[name]: value})
  }

  valid() {
      return this.state.date && this.state.title && this.state.amount
  }
  render() {
    return (
        <form className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name="date" value={this.state.date} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name="title" value={this.state.title} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Amount" name="amount" value={this.state.amount} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
      </form>
    );
  }
}

