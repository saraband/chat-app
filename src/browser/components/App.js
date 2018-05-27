import React from 'react'
import { connect } from 'react-redux'
import RoomsListComponent from './RoomsListComponent'
import SearchRoomsListComponent from './SearchRoomsListComponent'
import RoomComponent from './RoomComponent'
import InputComponent from './InputComponent'
import './App.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id='app-container'>
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