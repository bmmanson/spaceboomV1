import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'; 

import { MessageInList } from './message-in-list';
import { MessageList } from './message-list';
import { store } from './../store.js';
import { MessageDetailView } from './message-detail-view';
import { MenuButton } from './menu-button';
import { setVisibility, VisibilityFilters } from './../actions/';

class MessageMasterView extends Component {

	_getFilter() {
		let currentState = store.getState();
		return currentState.visibilityFilter;
	}

	render() {
		let state = store.getState();
		let messages = state.messages;
		let filterStatus = this._getFilter();

		return (
	  	<View style={{flex: 1}}>
	  		<View style={{flex: 1}} />
	    	<MessageList messages={messages} />
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

