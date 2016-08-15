import React, { Component } from 'react';
import {
	Text,
	TouchableHighlight,
	NavigatorIOS
} from 'react-native';

class DeleteMessageButton extends Component {
	
	_deleteMessage (message) {

	}

	render () {

		return (
			<TouchableHighlight onPress={this._deleteMessage.bind(this, this.props.message)} style={{flex:1}}>
				<Text style={{
							flex: 1,
							backgroundColor: '#B22222',
	   						flexDirection: 'column',
	    					textAlign: 'center',
	    					justifyContent: 'center',
	    					alignItems: 'center',
	    					color: 'white',
	    					fontWeight: 'bold',
	    					fontSize: 26}}>
					Delete
				</Text>
			</TouchableHighlight>
		);
	}
}

export { DeleteMessageButton };