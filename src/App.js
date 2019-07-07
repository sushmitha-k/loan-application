import React, { Component } from 'react';
import SliderElement from './components/SliderElement';
import axios from 'axios';
import './App.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      interestRate: '',
      months: '',
      principal: '',
      loading: true
    };
  }

  componentDidMount() {
    this.getLoanData();
  }

  // triggers on proceed loan
  handleClick = (e) => {
    window.location.reload();
  }

  getLoanData = (amount = 500, months = 6) => {
    axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${months}`)
     .then(res => {
       this.setState({
         interestRate: res.data.interestRate,
         months: res.data.monthlyPayment.amount,
         principal: res.data.principal.amount
       });
     })
     .catch(error => {
       console.log('Error fetching and parsing data', error);
     });
  }

  render() {
    return (
      <div className="main-content">
        <div className="display-content">
          <h3>LOAN DETAILS</h3>
          <div className="sec-1">
            <h5>{this.state.principal} USD</h5>
            <h6>Principal Amount</h6>
          </div>
          <div className="sec-2">
            <div className="sec-mini-1">
              <h2>{this.state.interestRate}</h2>
              <h6>Interest Rate</h6>
            </div>
            <div className="sec-mini-2">
              <h2>{this.state.months}</h2>
              <h6>Monthly Payment</h6>
            </div>
          </div>
        </div>
        <div className="input-content">
          <div className="input-sec">
            <h1>Choose the Loan Amount</h1>
            <p>Choose the
            <span className="highLight"> Loan Amount </span> and
            <span className="highLight"> Number of Payment Months </span>
            for how much you want to borrow as Loan. Adjust the slide to pick our amount below.</p>
          </div>
          <div className="input-sec1">
            <h4>Loan Amount</h4>
            <SliderElement minValue={500} maxValue={5000} getSliderState={'loan'} onChange={this.getLoanData}/>
            <div className="input-mini-1">
              <p>$500</p>
              <p>$5000</p>
            </div>
          </div>
          <div className="input-sec2">
            <h4>Number of Payments</h4>
            <SliderElement minValue={6} maxValue={24} getSliderState={'months'} onChange={this.getLoanData}/>
            <div className="input-mini-1">
              <p>6 months</p>
              <p>24 months</p>
            </div>
            <button className="btn-proceed" onClick={this.handleClick}>Loan Proceed</button>
          </div>
        </div>
      </div>
    );
  }
}
