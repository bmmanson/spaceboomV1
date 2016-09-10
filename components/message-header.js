import React, { Component } from 'react';
import { Text, View, NavigatorIOS, Image } from 'react-native';

class MessageHeader extends Component {
	render () {
		return (
			<View style={{flex: 1, flexWrap: 'wrap', marginHorizontal: 10}}>
				<Image source={{uri: this.props.authorPic}}
				style={{height: 40, width: 40, margin: 2, borderRadius: 20}} />
				<View>
					<Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 14}}>{this.props.author}</Text>
					<Text style={{fontSize: 12}}>{this.props.locationName}</Text>
				</View>
			</View>);
	}
}

export {MessageHeader};