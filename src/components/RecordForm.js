import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

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
      let name,obj;
      name = event.target.name;
      this.setState((
        obj = {},
        obj[""+name] = event.target.value,
        obj
      ))
  }

  handleSubmit (event){
    event.preventDefault();
    const data = {
      date:  this.state.date,
      title: this.state.title,
      amount: Number.parseInt(this.state.amount, 0)
    }
    RecordsAPI.create(data).then(
      response =>{
        this.props.handleNewRecord(response.data);
      } 
    ).catch(
      error => console.log(error.message)
    )
    this.setState({
      data: "",
      title: "",
      amount: ""
    })
  }
  valid() {
      return this.state.date && this.state.title && this.state.amount
  }
  render() {
    return (
        <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group mr-1">
            <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name="date" value={this.state.date} />
          </div>
          <div className="form-group mr-1">
            <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name="title" value={this.state.title} />
          </div>
          <div className="form-group mr-1">
            <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Amount" name="amount" value={this.state.amount} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
      </form>
    );
  }
}

