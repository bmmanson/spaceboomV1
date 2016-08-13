import React, { Component } from 'react';
import {
	Text,
	TouchableHighlight,
	NavigatorIOS
} from 'react-native';

import { addSentMessage } from './../actions/';
import { store } from './../store.js';

class SubmitMessageButton extends Component {
	
	_submitMessage (body) {
		store.dispatch(addSentMessage(
			body, 
			"Ben Manson",
			'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/13620351_10207342419702909_3505351797653340889_n.jpg?oh=a1710d119f06150bb51c6903ed7f6acf&oe=58244469',
			[40.73126701752318, -73.98654699325562],
			"Fullstack Academy",
			"New York, NY")
		)
	}

	render () {

		return (
			<TouchableHighlight onPress={this._submitMessage.bind(this, this.props.messageText)} style={{flex:1, backgroundColor: "skyblue"}}>
				<Text style={{
	   						flexDirection: 'column',
	    					textAlign: 'center',
	    					justifyContent: 'center',
	    					alignItems: 'center',
	    					color: 'white',
	    					fontWeight: 'bold',
	    					fontSize: 26}}>
					{"Submit"}
				</Text>
			</TouchableHighlight>
		);
	}
}

export { SubmitMessageButton };