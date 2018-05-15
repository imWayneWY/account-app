import React, { Component } from 'react';
import Record from './Record'
//import $ from 'jquery'
//import axios from 'axios'
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'
import AmountBox from './AmountBox'

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
  addRecord(record) {
    this.setState({
      error: null,
      isLoaded: true,
      records: [
        ...this.state.records,
        record
      ]
    })
  }

  updateRecord(record, data){
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map( (item, index) =>{
      if(index !== recordIndex){
        // This isn't the item we care about, keep it as-is
        return item;
      }

      //Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records: newRecords
    });
  }
  deleteRecord(record){
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter( (item, index) => index!== recordIndex);
    this.setState({
      records: newRecords
    });
  }
  credit() {
    let credits = this.state.records.filter((record) => {
      return record.amount >= 0;
    });

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0);
  }

  debit() {
    let debits = this.state.records.filter((record) => {
      return record.amount < 0;
    });

    return debits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0);
  }
  blance() {
    return this.debit() + this.credit();
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
              {records.map((record) => (
              <Record 
              key={record.id} 
              record={record} 
              handleEditRecord={this.updateRecord.bind(this)} 
              handleDeleteRecord={this.deleteRecord.bind(this)}
              />)
              )}
           </tbody>
          </table>
      );  
    }

 
    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.credit()} />
          <AmountBox text="Debit" type="danger" amount={this.debit()} />
          <AmountBox text="Blance" type="info" amount={this.blance()} />
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {RecordsComponent}
      </div>
    )
  }
}

export default Records;
