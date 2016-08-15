import React, { Component } from 'react';
import {
	Text,
	TouchableHighlight,
	NavigatorIOS,
	AlertIOS
} from 'react-native';

import { store } from './../store';
import { deleteMessage } from './../actions/'; 

class DeleteMessageButton extends Component {
	
	_deleteMessage (message) {
		console.log("IS THE STATE UPDATED?", store.getState());
		if (message.currentUser === true) {
			AlertIOS.alert(
				"Delete Message", 
				"You are the author of this message. If you delete it, nobody will be able to discover it again. Are you sure you want to delete it?",
				[
					{
					text: "Cancel", 
					onPress: () => console.log("user didn't delete message"), 
					style: "cancel"
					},
					{
					text: "Delete", 
					onPress: function () {
						store.dispatch(deleteMessage(message.id)); 
						
						}
					}
				]
			)
		} else {
			AlertIOS.alert(
				"Delete Message", 
				"You are not the author of this message. If you delete it, you won't be able to see it anymore. Are you sure you want to delete it?",
				[
					{text: "Cancel", 
					onPress: () => console.log("user didn't delete message"), 
					style: "cancel"},
					{text: "Delete", 
					onPress: () => store.dispatch(deleteMessage(message.id))
					}
				]
			)
		}
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