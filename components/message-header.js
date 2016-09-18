import React, { Component } from 'react';
import { Text, View, NavigatorIOS, Image } from 'react-native';

class MessageHeader extends Component {
	render () {
		return (
			<View style={{height: 50, flexWrap: 'wrap', marginHorizontal: 10, marginTop: 10}}>
				<Image source={{uri: this.props.authorPic}}
				style={{height: 48, width: 48, marginRight: 2, borderRadius: 24}} />
				<View style={{marginLeft: 4}}>
					<Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 16}}>{this.props.author}</Text>
					<Text style={{fontSize: 14, marginTop: 3}}>{this.props.locationName}</Text>
				</View>
			</View>);
	}
}

export {MessageHeader};