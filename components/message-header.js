import React, { Component } from 'react';
import { Text, View, NavigatorIOS, Image } from 'react-native';

class MessageHeader extends Component {
	render () {
		return (
			<View style={{flex: 1, flexWrap: 'wrap'}}>
				<Image source={{uri: this.props.authorPic}}
				style={{height: 48, width: 48, marginHorizontal: 6, borderRadius: 24}} />
				<View>
					<Text style={{fontWeight: 'bold', marginTop: 5}}>{this.props.author}</Text>
					<Text style={{fontSize: 16}}>{this.props.locationName}</Text>
				</View>
			</View>);
	}
}

export {MessageHeader};