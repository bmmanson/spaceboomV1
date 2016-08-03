import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'; 

import { MessageInList } from './message-in-list';
import { store } from './../store.js';
import { MessageDetailView } from './message-detail-view';
import { MenuButton } from './menu-button';
import { setVisibility, VisibilityFilters, markAsUnread } from './../actions/';

class MessageMasterView extends Component {

	_getMessages() {
		let currentState = store.getState();
		let messageList = currentState.messages.filter(m =>
			m.currentUser === false);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return ds.cloneWithRows(messageList);
	}

	_seeDetailView(message){
		let currentState = store.getState();
		let messages = currentState.messages;
		let currentMessage = messages.find((m) => m.id === message.id)
		if (currentMessage.unread === true) {
			store.dispatch(markAsUnread(currentMessage.id));
		}
		Actions.messageDetail({message});
	}

	_getFilter() {
		let currentState = store.getState();
		return currentState.visibilityFilter;
	}

	render() {

		let filterStatus = this._getFilter();

		return (
	  	<View style={{flex: 1}}>
	    	<ListView 
	    	style={{flex: 12, margin: 0}}
	    	dataSource={this._getMessages()}
	    	renderRow={ 
	    		(message) => <MessageInList author={message.author} 
	    		body={message.body}
	    		locationName={message.locationName}
	    		city={message.city}
	    		key={message.id}
	    		unread={message.unread} 
	    		authorPic={message.authorPic}
	    		buttonAction={() => this._seeDetailView(message)} />} />
	    	<Text>{this.props.store}</Text>
	    	<View style={{flex: 1, flexDirection: 'row'}}>
	    		<MenuButton 
	    			buttonText={"Discovered"} 
	        		buttonColor={"#FFD700"}
	        		buttonAction={() => {store.dispatch(setVisibility(VisibilityFilters.DISCOVERED))}} />
	    		<MenuButton 
	    			buttonText={"Sent"} 
	        		buttonColor={"orange"}
	        		buttonAction={() => {store.dispatch(setVisibility(VisibilityFilters.SENT))}} />
	    	</View>
	    </View>
		);
	}
}

export { MessageMasterView };

