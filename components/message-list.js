import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; 

import { MessageInList } from './message-in-list';
import { MessageDetailView } from './message-detail-view';

import { store } from './../store';
import { markAsUnread } from './../actions/';
import { updateMessageAsUnreadOnServer } from './../async/';

class MessageList extends Component {

	_getMessages(messages) {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return ds.cloneWithRows(messages);
	}

	_seeDetailView(message, messages){
		let currentMessage = messages.find((m) => m.id === message.id)
		if (currentMessage.unread === true) {
			updateMessageAsUnreadOnServer(currentMessage.id);
		}
		Actions.messageDetail({message: currentMessage});
	}

	render () {
		return (
	    	<ListView 
	    	style={{flex: 12, margin: 0}}
	    	enableEmptySections={true}
	    	dataSource={this._getMessages(this.props.messages)}
	    	renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
	    	renderRow={ 
	    		(message) => <MessageInList author={message.author} 
	    		body={message.body}
	    		locationName={message.locationName}
	    		city={message.city}
	    		key={message.id}
	    		unread={message.unread} 
	    		authorPic={message.authorPic}
	    		buttonAction={() => this._seeDetailView(message, this.props.messages)} />} />
		);
	}
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    marginLeft: 12,
    backgroundColor: '#D4D4D4',
  },
});

export { MessageList };