import React from 'react'
import { connect } from 'react-redux'
import './InputComponent.scss'

export default class InputComponent extends React.PureComponent {
  constructor(props) {
    super(props)

    this.inputRef = React.createRef()
    this.state = {
      message: ''
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('ok')
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }

  render() {
    const { message } = this.state

    return(
      <div id='input-container'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={message}
            name='message'
            ref={this.inputRef}
            onChange={this.handleChange}
            placeholder='Type your message here' />
        </form>
      </div> 
    )
  }
} 