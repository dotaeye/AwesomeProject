'use strict'

import React, {
  Component,
  StatusBarIOS,
  Platform,
  AsyncStorage
  } from 'react-native'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux/native'
import reducers from './reducers'
import configs from './configs';
import ApiClient from './utils/ApiClient';
import clientMiddleware from './middleware/clientMiddleware'
import App from './containers/App'
import { loadAuthToken } from './actions/auth';

const createStoreWithMW = applyMiddleware(clientMiddleware(new ApiClient()))(createStore);
const store = createStoreWithMW(reducers);



export default class Root extends Component {

  componentDidMount() {
    if (Platform.OS === 'ios') {
      StatusBarIOS.setHidden(true)
    }
  }

  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    )
  }
}
