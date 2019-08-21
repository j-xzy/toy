import React from 'react'
import { render } from 'react-dom'
import { createStore } from '../../redux';
import { Provider } from '../../react-redux'
import App from './components/App'
import reducer from './reducers'

const store = createStore(reducer)

export default class AppWithRedux extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <App />
      </Provider>)
  }
}