import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { AuthorPic } from './author-pic';

class MessageHeader extends Component {
	render () {
		return (
			<View style={styles.view}>
				<AuthorPic message={this.props.message} style={styles.authorPic} />
				<View style={styles.textContainer}>
					<Text style={styles.authorText}>
						{this.props.message.author}
					</Text>
					<Text style={styles.locationNameText}>
						{this.props.message.locationName}
					</Text>
				</View>
			</View>);
	}
}

const styles = StyleSheet.create({
	view: {
		height: 50, 
		flexDirection: 'row', 
		marginHorizontal: 10, 
		marginTop: 10
	},
	authorPic: {
		height: 48,
		width: 48,
		marginRight: 2,
		borderRadius: 24
	},
	textContainer: {
		marginLeft: 4
	},
	authorText: {
		fontWeight: 'bold', 
		marginTop: 5, 
		fontSize: 16
	},
	locationNameText: {
		fontSize: 14, 
		marginTop: 3
	}
});

export { MessageHeader };