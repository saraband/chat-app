import React from 'react'
import { connect } from 'react-redux'
import './CreateRoomPanel.scss'
import close from './close.png'
import {
  HIDE_CREATE_ROOM_PANEL,
  requestUsersList,
  createRoom
} from 'Actions/index'

class CreateRoomPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      message: '',
      participants: []
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const {
      createRoom,
      currentUser
    } = this.props

    const {
      title,
      message,
      participants
    } = this.state

    if(!title.length
    || !message.length
    || !participants.length)
      return

    createRoom(currentUser, title, message, participants)
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  componentDidMount() {
    const {
      requestUsersList,
      currentUser
    } = this.props

    requestUsersList(currentUser.id)
  }

  addParticipant = (newParticipant) => {
    this.setState({participants: [...this.state.participants, newParticipant]})
  }

  renderUsersListLeft = () => {
    const { participants } = this.state
    const { usersList } = this.props

    return usersList.filter(u => !participants.includes(u)).map(u => <strong onClick={() => this.addParticipant(u)} >{u.username}, </strong>)
  }

  render() {
    const {
      hideCreateRoomPanel,
      usersList
    } = this.props

    const {
      title,
      message,
      participants
    } = this.state

    return(
      <div id='create-room-panel-container'>
        <div id='create-room-panel'>
          <img src={close} onClick={hideCreateRoomPanel} />
          <form onSubmit={this.handleSubmit} >
            <input type='text' placeholder='Title' 
              name='title' value={title}
              onChange={this.handleChange} /><br />
            <p>Participants: {participants.map(p => p.username + ', ')}</p>
            <input type='text' placeholder='Message'
              name='message' value={message}
              onChange={this.handleChange} /><br />
            <button>Create</button><br />
            <p>{this.renderUsersListLeft()}</p>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    usersList: state.usersList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideCreateRoomPanel: () => dispatch({type: HIDE_CREATE_ROOM_PANEL}),
    requestUsersList: (id) => dispatch(requestUsersList(id)),
    createRoom: (user, title, message, participants) => dispatch(createRoom(user, title, message, participants))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (CreateRoomPanel)