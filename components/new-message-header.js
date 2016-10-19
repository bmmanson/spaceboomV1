import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { AuthorPic } from './author-pic';
import { SubmitMessageButton } from './submit-message-button';

class NewMessageHeader extends Component {
	render () {

		let message = {
			authorId: this.props.currentSession.userId, 
			authorPic: this.props.currentSession.authorPic
		}

		return (
			<View style={styles.view}>
				<View style={styles.picContainer}>
					<AuthorPic message={message} style={styles.authorPic} />
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.authorText}>
						{this.props.currentSession.name}
					</Text>
					<Text style={styles.locationNameText}>
						{this.props.currentSession.locationName}
					</Text>
				</View>
				<View style={styles.buttonContainer}>
					<View style={styles.buttonContentContainer}>
						<SubmitMessageButton 
							messageText={this.props.messageText}
							downloading={this.props.currentSession.downloading} />
						<Text style={styles.counter}>
							{this.props.counter}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	view: {
		height: 50, 
		flexDirection: 'row', 
		paddingHorizontal: 10, 
		paddingTop: 10,
		marginBottom: 10,
		borderStyle: 'solid', borderTopColor: '#DBDBDB', borderTopWidth: 3
	},
	picContainer: {
		width: 50
	},
	authorPic: {
		height: 48,
		width: 48,
		marginRight: 2,
		borderRadius: 24
	},
	textContainer: {
		flex: .6,
		marginLeft: 4
	},
	authorText: {
		fontWeight: 'bold', 
		marginTop: 5, 
		fontSize: 16
	},
	locationNameText: {
		fontSize: 12, 
		marginTop: 3,
		color: '#8C8C8C'
	},
	buttonContainer: {
		flex: .2,
		justifyContent: 'center',
	    alignItems: 'center',
	},
	buttonContentContainer: {
		flex: 1,
	},
	counter: {
		textAlign: 'center', 
		marginTop: 2, 
		fontWeight: 'bold',
		color: '#6E6E6E',
		fontSize: 16
	}
});

export { NewMessageHeader };