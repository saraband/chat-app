import React from 'react'
import { connect } from 'react-redux'
import './SearchRoomsListComponent.scss'

export default class SearchRoomsListComponent extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <input type='text' placeholder='Search conversations..' />
      </div>
    )
  }
} 