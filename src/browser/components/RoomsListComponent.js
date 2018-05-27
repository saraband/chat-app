import React from 'react'
import { connect } from 'react-redux'
import './RoomsListComponent.scss'

export default class RoomsListComponent extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div className='rooms-list-item unread'>
          <img src='https://picsum.photos/50/50/?random' />
          <div>
            <h4><strong>Sara</strong></h4>
            <p>J'ai vu un truc trop stylé ce matin en faisant les boutiques et je pens...</p>
            <p className='small-date'>17:45</p>
          </div>
        </div>
        <div className='rooms-list-item'>
          <img src='https://picsum.photos/50/50/?random&id=2' />
          <div>
            <h4><strong>Paul, Jon, Sara</strong></h4>
            <p>Paul: Yalla j'ai trop soif j'te jure jvais tout defoncer soir ce...</p>
            <p className='small-date'>17:02</p>
          </div>
        </div>
        <div className='rooms-list-item'>
          <img src='https://picsum.photos/50/50/?random&id=3' />
          <div>
            <h4><strong>Clémentine</strong></h4>
            <p>On se voit ce soir ? ;)</p>
            <p className='small-date'>14:38</p>
          </div>
        </div>
      </div>
    )
  }
} 