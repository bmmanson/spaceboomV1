import React, { Component } from 'react';
import {
	Text,
	TouchableHighlight,
	NavigatorIOS,
	AlertIOS
} from 'react-native';

import { Actions } from 'react-native-router-flux'; 

import { store } from './../store';
import { deleteMessage } from './../actions/'; 
import { deleteSentMessageOnServer, deleteDiscoveredMessageOnServer} from './../async/';

class DeleteMessageButton extends Component {
	
	_deleteMessage (message) {
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
						deleteSentMessageOnServer(message.id)
						.then( (message) => {
							Actions.pop();
							AlertIOS.alert("","Messaged deleted!");
						})
						}
					}
				]
			)
		} else {
			AlertIOS.alert(
				"Delete Message", 
				"You are not the author of this message. If you delete it, you won't be able to see it anymore, but others will still be able to discover it. Are you sure you want to delete it?",
				[
					{text: "Cancel", 
					onPress: () => console.log("user didn't delete message"), 
					style: "cancel"},
					{text: "Delete", 
					onPress: function () {
						store.dispatch(deleteMessage(message.id)); 
						deleteDiscoveredMessageOnServer(message.id)
						.then ( (message) => {
							Actions.pop();
							AlertIOS.alert("", "Messaged deleted!");
						})
						}
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
	    					fontSize: 26,
	    					marginVertical: 6}}>
					Delete
				</Text>
			</TouchableHighlight>
		);
	}
}

export { DeleteMessageButton };