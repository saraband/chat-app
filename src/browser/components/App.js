import React from 'react'
import { connect } from 'react-redux'
import RoomsListComponent from './RoomsListComponent'
import SearchRoomsListComponent from './SearchRoomsListComponent'
import RoomComponent from './RoomComponent'
import InputComponent from './InputComponent'
import './App.scss'
import socket from 'Root/Socket'
import {
  requestRoomsList,
  receiveRoomsList,
  receiveUsersList
} from 'Actions/index'
import CreateRoomPanel from './CreateRoomPanel'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      requestRoomsList,
      receiveRoomsList,
      receiveUsersList,
      currentUser
    } = this.props

    socket.on('RECEIVE_ROOMS_LIST', (roomsList) => {
      console.log(`Received rooms list: ${roomsList}`)
      receiveRoomsList(JSON.parse(roomsList))
    })

    socket.on('RECEIVE_USERS_LIST', (usersList) => {
      console.log(`Received users list: ${usersList}`)
      receiveUsersList(JSON.parse(usersList))
    })

    // Requesting rooms list the first time
    requestRoomsList(currentUser.id)
  }

  render() {
    const {
      isCreateRoomPanelOpen
    } = this.props

    return(
      <div id='app-container'>
        {isCreateRoomPanelOpen ? <CreateRoomPanel /> : null}
        <h1>Chat app</h1>
        <div id='body-container'>
          <div id='left-container'>
            <SearchRoomsListComponent />
            <RoomsListComponent />
          </div>
          <div id='right-container'>
            <div id='conversation-container'>
              <RoomComponent />
            </div>
            <div id='input-container'>
              <InputComponent />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    isCreateRoomPanelOpen: state.isCreateRoomPanelOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestRoomsList: (id) => dispatch(requestRoomsList(id)),
    receiveRoomsList: (roomsList) => dispatch(receiveRoomsList(roomsList)),
    receiveUsersList: (usersList) => dispatch(receiveUsersList(usersList))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (App)