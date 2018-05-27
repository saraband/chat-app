import socket from 'Root/Socket'

export const SET_ROOMS_LIST_FILTER = 'SET_ROOMS_LIST_FILTER'
export const SHOW_CREATE_ROOM_PANEL = 'SHOW_CREATE_ROOM_PANEL'
export const HIDE_CREATE_ROOM_PANEL = 'HIDE_CREATE_ROOM_PANEL'

export const REQUEST_USERS_LIST_PENDING = 'REQUEST_USERS_LIST_PENDING'
export const REQUEST_USERS_LIST_SUCCESS = 'REQUEST_USERS_LIST_SUCCESS'
export const REQUEST_USERS_LIST_FAILED = 'REQUEST_USERS_LIST_FAILED'

export const REQUEST_ROOMS_LIST_PENDING = 'REQUEST_ROOMS_LIST_PENDING'
export const REQUEST_ROOMS_LIST_SUCCESS = 'REQUEST_ROOMS_LIST_SUCCESS'
export const REQUEST_ROOMS_LIST_FAILED = 'REQUEST_ROOMS_LIST_FAILED'

export const REQUEST_ROOM_DATA_PENDING = 'REQUEST_ROOM_DATA_PENDING'
export const REQUEST_ROOM_DATA_SUCCESS = 'REQUEST_ROOM_DATA_SUCCESS'
export const REQUEST_ROOM_DATA_FAILED = 'REQUEST_ROOM_DATA_FAILED'

export const SEND_MESSAGE_PENDING = 'SEND_MESSAGE_PENDING'
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED'

export const CREATE_ROOM_PENDING = 'CREATE_ROOM_PENDING'
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS'
export const CREATE_ROOM_FAILED = 'CREATE_ROOM_FAILED'

export const setRoomsListFilter = (filter) => {
  return {
    type: SET_ROOMS_LIST_FILTER,
    filter
  }
}

export const requestUsersList = (id) => {
  return (dispatch) => {
    dispatch({type: REQUEST_USERS_LIST_PENDING})

    socket.emit('REQUEST_USERS_LIST', id)
  }
}

export const receiveUsersList = (usersList) => {
  return {
    type: REQUEST_USERS_LIST_SUCCESS,
    usersList
  }
}

export const requestRoomsList = (id) => {
  return (dispatch) => {
    dispatch({type: REQUEST_ROOMS_LIST_PENDING})

    socket.emit('REQUEST_ROOMS_LIST', id)
  }
}

export const receiveRoomsList = (roomsList) => {
  return {
    type: REQUEST_ROOMS_LIST_SUCCESS,
    roomsList
  }
}

export const requestRoomData = (id) => {
  return (dispatch) => {
    dispatch({type: REQUEST_ROOM_DATA_PENDING})

    fetch('/roomData', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({
        id
      })
    })
    .then(data => data.json(),
      error => {
        console.error(error)
        dispatch({type: REQUEST_ROOM_DATA_FAILED})
    })
    .then(roomData => {
      dispatch({
        type: REQUEST_ROOM_DATA_SUCCESS,
        roomData
      })
    })
  }
}

export const receiveMessage = (message) => {
  return {
    type: SEND_MESSAGE_SUCCESS,
    roomData
  }
}

export const createRoom = (user, title, message, participants) => {
  return (dispatch) => {
    dispatch({type: CREATE_ROOM_PENDING})

    socket.emit('CREATE_ROOM', JSON.stringify({
      user,
      title,
      message,
      participants
    }))
  }
}