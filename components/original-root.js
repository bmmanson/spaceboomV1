import React, {Component} from 'react';
import {
	Text,
	View
} from 'react-native';

import { styles } from './../styles/main';

class Original extends Component {
	render () {
		return (
		<View style={styles.container}>
        	<Text style={styles.welcome}>
          		Welcome to Spaceboom version one!
        	</Text>
        	<Text style={styles.instructions}>
          		To get started, edit index.ios.js
        	</Text>
        	<Text style={styles.instructions}>
          		Press Cmd+R to reload,{'\n'}
          		Cmd+D or shake for dev menu
        	</Text>
        	<Text style={styles.instructions}>
        		also, just seeing that this works!
        	</Text>
      	</View>
		);
	}
}

export { Original };

