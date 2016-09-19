import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux';

/*
original:

<Image source={{uri: this.props.message.authorPic}}
style={{height: 48, width: 48, marginRight: 2, borderRadius: 24}} />
*/

class AuthorPic extends Component {

	render () {

		let authorId = this.props.message.authorId || this.props.comment.authorId;

		let authorPic = this.props.message.authorPic || this.props.comment.authorPic;

		return (
		<View>
			<TouchableHighlight 
			style={this.props.style}
			onPress={() => Actions.UserProfile({userId: authorId})}>
			<Image source={{uri: authorPic}}
			style={this.props.style} />
			</TouchableHighlight>
		</View>
		);
	}
}

export { AuthorPic };
