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
		return (
		<View>
			<TouchableHighlight style={{
				height: this.props.size,
				width: this.props.size,
				marginRight: 2
			}} onPress={() => Actions.UserProfile()}>
			<Image source={{uri: this.props.message.authorPic}}
			style={{
				height: this.props.size, 
				width: this.props.size, 
				marginRight: 2, 
				borderRadius: this.props.size / 2}} />
			</TouchableHighlight>
		</View>
		);
	}
}

export { AuthorPic };
