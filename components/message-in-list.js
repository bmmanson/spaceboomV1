import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

class MessageInList extends Component {
	render () {
		return (
			<View>
		    	<Text>{this.props.author}</Text>
		    	<Text>{this.props.body}</Text>
		    	<Text>{this.props.locationName}</Text>
		    	<Text>{this.props.id}</Text>
		    	<Text>1</Text>
	    	</View>
		);
	}
}

export { MessageInList };

