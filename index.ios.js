import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS
} from 'react-native';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

import { App } from './components/app';

import { store } from './store';

//use react-native-router-flux 
//use thunk for async? http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559

class SpaceboomV1 extends Component {

  render() {

    return (
      <Provider store={store} >
        <App />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('SpaceboomV1', () => SpaceboomV1);


