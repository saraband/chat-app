import React from 'react'
import ReactDOM from 'react-dom'
import App from 'Components/App'
import rootReducer from 'Reducers/index'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {
  createStore,
  applyMiddleware
} from 'redux'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
)
