import React, { Component } from 'react';
import { Text, View, NavigatorIOS, Image } from 'react-native';

class MessageHeader extends Component {
	render () {
		return (
			<View style={{flex: 1, flexWrap: 'wrap'}}>
			<Image source={require('./../img/ben_profile.jpg')}
			style={{height: 48, width: 48, marginHorizontal: 6, borderRadius: 24}} />
			<View>
				<Text style={{fontWeight: 'bold', marginTop: 5}}>Ben Manson</Text>
				<Text style={{fontSize: 16}}>Financial District</Text>
			</View>
			</View>);
	}
}

export {MessageHeader};