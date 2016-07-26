import React, { Component } from 'react';
import {
	Text,
	TouchableHighlight,
	NavigatorIOS
} from 'react-native';

import { NewMessageView } from './new-message-view';

class MenuButton extends Component {
	
	render () {

		return (
			<TouchableHighlight onPress={this.props.buttonAction} style={{flex:1, backgroundColor: this.props.buttonColor}}>
				<Text style={{
	   						flexDirection: 'column',
	    					textAlign: 'center',
	    					justifyContent: 'center',
	    					alignItems: 'center',
	    					color: 'white',
	    					fontWeight: 'bold',
	    					fontSize: 26}}>
					{this.props.buttonText}
				</Text>
			</TouchableHighlight>
		);
	}
}

export {MenuButton};