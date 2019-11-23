import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Addtodo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title : ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title)
    this.setState({ title : '' });
  }

  onChandge = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input 
            type="text"
            name="title" 
            style={{ flex: "10", padding: "5px"}}  
            placeholder="Add to do..."
            value={this.state.title}
            onChange={this.onChandge}
          />
          <input 
            type="submit"
            value="Submit"
            className="btn"
            style={{ flex: "1"}}
          />
        </form>
      </div>
    )
  }
}

Addtodo.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default Addtodo