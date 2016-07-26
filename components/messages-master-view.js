import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';

import { MessageInList } from './message-in-list';
import { store } from './../store.js';

class MessagesMasterView extends Component {
	
	_getMessages() {

		let currentState = store.getState();
		let messageList = currentState.discoveredMessages;

		return messageList.map(message => {
	    	return ( 
	    	<MessageInList author={message.author} 
	    					body={message.body}
	    					locationName={message.locationName}
	    					key={message.id} 
	    					id={message.id}/>
			);
	    })
	}

	getInitialState() {
		let currentState = store.getState();
		let messageList = currentState.discoveredMessages;
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return ds.cloneWithRows(messageList);
	}

	render() {
	  return (
	    <ListView
	    	dataSource={this.getInitialState()}
	    	renderRow={ 
	    		(message) => <MessageInList author={message.author} 
	    		body={message.body}
	    		locationName={message.locationName}
	    		key={message.id} 
	    		id={message.id}/>} />
		);
	}
}

export { MessagesMasterView };

