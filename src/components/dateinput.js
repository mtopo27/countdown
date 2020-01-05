import React from "react"

class DateInput extends React.Component {
  state = {}

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }


  render() {

    console.log(this.state.value)
    console.log(this.state)
    return (
      <input type="text" onChange={this.handleChange}></input>
    )
  }
}

export default DateInput