import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { MessageInList } from './message-in-list';
import { store } from './../store.js';
import { MessageDetailView } from './message-detail-view';
import { MenuButton } from './menu-button';
import { setVisibility, VisibilityFilters, markAsUnread } from './../actions/';

class MessageMasterView extends Component {
	
	_getMessages() {
		let currentState = store.getState();
		let messageList = currentState.messages;
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return ds.cloneWithRows(messageList);
	}

	_seeDetailView(route){
		let currentState = store.getState();
		let messages = currentState.messages;
		let currentMessage = messages.find( (message) => message.id === route.passProps.id)
		if (currentMessage.unread === true) {
			store.dispatch(markAsUnread(currentMessage.id));
		}
		this.props.navigator.push(route);
	}

	_getFilter() {
		let currentState = store.getState();
		return currentState.visibilityFilter;
	}

	render() {

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
	    		buttonAction={() => this._seeDetailView({component: MessageDetailView, title: "A Message", passProps: message})} />} />
	    	<Text>{this._getFilter()}</Text>
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

