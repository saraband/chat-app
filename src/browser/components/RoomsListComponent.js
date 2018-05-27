import React from 'react'
import { connect } from 'react-redux'
import './RoomsListComponent.scss'
import {
  SHOW_CREATE_ROOM_PANEL,
  requestRoomData
} from 'Actions/index'
import { timeSince } from 'Utils/index'

class RoomsListComponent extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  handleCreateRoom = (event) => {
    event.preventDefault()
    this.props.showCreateRoomPanel()
  }

  render() {
    const {
      roomsList,
      requestRoomData
    } = this.props

    if(!roomsList.length) {
      return (
        <div>
          <p>No rooms yet</p>
          <a href='#' onClick={this.handleCreateRoom}>Create room</a>
        </div>
      )
    }
    
    return(
      <div>
        <a href='#' onClick={this.handleCreateRoom}>Create room</a>
        {roomsList.map(r => (
          <div className='rooms-list-item'
            onClick={() => requestRoomData(r._id)} >
            <img src='https://picsum.photos/50/50/?random' />
            <div>
              <h4><strong>{r.title}</strong></h4>
              <p>{r.lastMessage.user.username}: {r.lastMessage.content}</p>
              <p className='small-date'>{timeSince(r.lastMessage.date)}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
} 

const mapStateToProps = (state) => {
  return {
    roomsList: state.roomsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showCreateRoomPanel: () => dispatch({type: SHOW_CREATE_ROOM_PANEL}),
    requestRoomData: (id) => dispatch(requestRoomData(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (RoomsListComponent)