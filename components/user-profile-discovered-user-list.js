import React, { Component } from 'react';
import { ListView } from 'react-native'; 

import { UserProfileInHorizontalList } from './message-in-list';

class UserProfileDiscoveredUserList extends Component {

	_getUserProfiles(users) {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return ds.cloneWithRows(users);
	}

	render () {
		return (
	    	<ListView 
	    	dataSource={this._getUsers(this.props.discoveredUsers)}
	    	renderRow={ 
	    		(discoveredUser) => <MessageInList author={message.author} 
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

export { UserProfileDiscoveredUserList };