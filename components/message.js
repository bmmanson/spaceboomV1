import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
let moment = require('moment');

import { MessageHeader } from './message-header';
import { MessageReportButton } from './message-report-button';
import { MessageLikeButton } from './message-like-button';
import { MessageReplyButton } from './message-reply-button';
import { MessageTimesDiscovered } from './message-times-discovered';

class Message extends Component {

	render () {

		const displayFormattedTime = (message) => {
			if (message.createdAt) {
				return moment(message.createdAt).fromNow();
			}	
		}

		return (
			<View style={styles.container}>
				<MessageHeader message={this.props.message} />
				<Text style={styles.bodyText}>
					{this.props.message.body}
				</Text>
				<Text style={styles.timeText}>
					{displayFormattedTime(this.props.message)}
				</Text>
				<MessageTimesDiscovered message={this.props.message} />
				 <View style={{height: 38, flexDirection: 'row'}}>
				 	<MessageLikeButton message={this.props.message} />	 	
				 	<MessageReplyButton comments={this.props.comments} />
				 	<MessageReportButton message={this.props.message} />
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		minHeight: 40, 
		borderStyle: 'solid', 
		borderColor: '#8C8C8C',
		borderBottomColor: '#DBDBDB', 
		backgroundColor: '#F5F5F5', 
		borderTopWidth: 1,
		borderBottomWidth: 3
	},
	bodyText: {
		flex: 3,
		minHeight: 14, 
		fontSize: 14, 
		marginHorizontal: 10, 
		marginTop: 10, 
		marginBottom: 2
	},
	timeText: {
		color: '#949494', 
		fontSize: 12,
		marginHorizontal: 12,
		marginVertical: 10
	}
});

export { Message };