import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class SliderElement extends Component {

  state = {
    loanChange: 500,
    monthsChange: 6
  }

  onValueChange = e => {
    // checks the slider state and assigns the value
    if (this.props.getSliderState === 'loan') {
      this.setState({ loanChange: e });
    } else {
      this.setState({ monthsChange: e });
    }
    this.props.onChange(this.state.loanChange, this.state.monthsChange);
  }

  render() {
    return (
      <div>
        <Slider min={this.props.minValue} max={this.props.maxValue} defaultValue={this.props.minValue}
                onAfterChange={this.onValueChange} getState={this.props.getSliderState}  />
      </div>
    );
  }
}
