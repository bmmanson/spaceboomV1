import React, { Component } from 'react';
import { ListView } from 'react-native';

import { MessageInList } from './message-in-list';
import { MessageDetailView } from './message-detail-view';

class MessageList extends Component {

	render () {
		return (
	    	<ListView 
	    	style={{flex: 12, margin: 0}}
	    	dataSource={this.props.messages}
	    	renderRow={ 
	    		(message) => <MessageInList author={message.author} 
	    		body={message.body}
	    		locationName={message.locationName}
	    		city={message.city}
	    		key={message.id}
	    		unread={message.unread} 
	    		authorPic={message.authorPic}
	    		buttonAction={() => this._handleNextPress({component: MessageDetailView, title: "A Message", passProps: message})} />} />
		);
	}
}

export {MessageList};