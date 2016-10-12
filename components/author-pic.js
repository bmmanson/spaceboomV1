import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux';

class AuthorPic extends Component {

	render () {
		let authorId = this.props.message.authorId;
		let authorPic = this.props.message.authorPic;
		return (
		<View>
			<TouchableHighlight style={this.props.style}
			onPress={() => Actions.UserProfile({userId: authorId})}>
			<Image source={{uri: authorPic}} style={this.props.style} />
			</TouchableHighlight>
		</View>
		);
	}
}

export { AuthorPic };
