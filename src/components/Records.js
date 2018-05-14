import React, { Component } from 'react';
import Record from './Record'
//import $ from 'jquery'
//import axios from 'axios'
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'

class Records extends Component {
  constructor(){
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    }
  }
  
  componentDidMount() {
    //$.getJSON("https://5af93b00edf5520014cbd246.mockapi.io/api/v1/records").then(
    RecordsAPI.getAll().then(
      response => this.setState({
        records: response.data,
        isLoaded: true
      })
     ).catch(
      error => this.setState({
        isLoaded: true,
        error  // error: error
      })
    )
  }
  render() {
    const {error, isLoaded, records } = this.state;
    let RecordsComponent;

    if(error) {
      RecordsComponent = <div>Error: {error.message}</div>
    } else if(!isLoaded) {
      RecordsComponent = <div>Loading</div>;
    } else {
      RecordsComponent = (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record,i) => <Record key={record.id} {...record}  />)}
           </tbody>
          </table>
      );  
    }
    return (
      <div>
        <h2>Records</h2>
        <RecordForm />
        {RecordsComponent}
      </div>
    )
  }
}

export default Records;
