import React from 'react'
import { connect } from 'react-redux'
import './InputComponent.scss'
import {
  sendMessage
} from 'Actions/index'

class InputComponent extends React.PureComponent {
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
    
    const {
      currentRoom,
      currentUser,
      sendMessage
    } = this.props

    const { message } = this.state

    if(currentUser === undefined
    || currentRoom === undefined
    || !message.length)
      return

    sendMessage(currentUser, currentRoom._id, message)
    this.setState({message: ''})
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentRoom: state.currentRoom
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (user, roomId, message) => dispatch(sendMessage(user, roomId, message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (InputComponent)