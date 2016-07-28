import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';

import { MessageInList } from './message-in-list';
import { store } from './../store.js';
import { MessageDetailView } from './message-detail-view';
import { MenuButton } from './menu-button';

class MessageMasterView extends Component {
	
	_getMessages(type) {
		let currentState = store.getState();
		let messageList = currentState.messages;
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return ds.cloneWithRows(messageList);
	}

	_handleNextPress(route){
		this.props.navigator.push(route);
	}

	render() {
	  return (
	  		<View style={{flex: 1}}>
	    	<ListView 
	    	style={{flex: 12, margin: 0}}
	    	pageSize={36}
	    	dataSource={this._getMessages('sentMessages')}
	    	renderRow={ 
	    		(message) => <MessageInList author={message.author} 
	    		body={message.body}
	    		locationName={message.locationName}
	    		city={message.city}
	    		key={message.id}
	    		unread={message.unread} 
	    		authorPic={message.authorPic}
	    		buttonAction={() => this._handleNextPress({component: MessageDetailView, title: "A Message", passProps: message})} />} />
	    	<View style={{flex: 1, flexDirection: 'row'}}>
	    		<MenuButton 
	    			buttonText={"Discovered"} 
	        		buttonColor={"#FFD700"}/>
	    		<MenuButton 
	    			buttonText={"Sent"} 
	        		buttonColor={"orange"}/>
	    	</View>
	    	</View>
		);
	}
}

export { MessageMasterView };

