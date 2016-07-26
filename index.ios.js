import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS
} from 'react-native';
import { LaunchPage } from './components/launch-page';
import { styles } from './styles/main';

class SpaceboomV1 extends Component {
  render() {
    return (
      < NavigatorIOS 
      initialRoute={{
        component: LaunchPage,
        title: "Spaceboom"
      }} style={styles.container} />
    );
  }
}

AppRegistry.registerComponent('SpaceboomV1', () => SpaceboomV1);
