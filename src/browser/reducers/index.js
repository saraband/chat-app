import { combineReducers } from 'redux'
import {
  REQUEST_ROOMS_LIST_SUCCESS,
  SHOW_CREATE_ROOM_PANEL,
  HIDE_CREATE_ROOM_PANEL,
  REQUEST_USERS_LIST_SUCCESS,
  REQUEST_ROOM_DATA_SUCCESS,
  SEND_MESSAGE_SUCCESS
} from 'Actions/index'

const isCreateRoomPanelOpen = (state = false, action) => {
  switch(action.type) {
    case SHOW_CREATE_ROOM_PANEL:
      return true
    case HIDE_CREATE_ROOM_PANEL:
      return false
    default:
      return state
  }
}

const currentUserInitialState = {
  id: '5b0a6d18ab1ebd1740587622',
  username: 'Sara'
}

// I've put currentUser in the state as I might implement a login feature later on
const currentUser = (state = currentUserInitialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

const roomsList = (state = [], action) => {
  switch(action.type) {
    case REQUEST_ROOMS_LIST_SUCCESS:
      return [...action.roomsList]
    case SEND_MESSAGE_SUCCESS:
      return state.map(room => {

        // If the message received belongs in the room, update its lastMessage property
        if(room._id === action.message.roomId)
          return {
            ...room,
            lastMessage: action.message
          }

        // If not, don't do anything
        return room
      })
    default:
      return state
  }
}

const usersList = (state = [], action) => {
  switch(action.type) {
    case REQUEST_USERS_LIST_SUCCESS:
      return [...action.usersList]
    default:
      return state
  }
}

const currentRoom = (state = {}, action) => {
  switch(action.type) {
    case REQUEST_ROOM_DATA_SUCCESS:
      return {...action.roomData}
    case SEND_MESSAGE_SUCCESS:

      // In case no current room is selected
      // No need to update anything
      if(state.messages === undefined)
        return state

      // Update messages in current room
      let nextState = {
        ...state,
        messages: [
          ...state.messages,
          action.message
        ]
      }

      return nextState
    default:
      return state
  }
}

export default combineReducers({
  currentUser,
  roomsList,
  isCreateRoomPanelOpen,
  usersList,
  currentRoom
})