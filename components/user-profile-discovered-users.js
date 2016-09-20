import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native'; 

import { UserProfileDiscoveredUserList } from './user-profile-discovered-user-list';

const alt = (<View><Text>Hi</Text></View>);

const displayNumberOfUsersDiscovered = function (numberOfUsers) {
	if (numberOfUsers === 1) {
		return "1 User Discovered";
	} else {
		return "" + numberOfUsers + " Users Discovered";
	}
}

const displayListWhenReady = function (discoveredUsers) {
	if (discoveredUsers.length > 0) {
		return (
		<View style={{flex: 1}}>
			<Text style={{textAlign: 'center', color: '#919191', marginVertical: 2}}>
				{displayNumberOfUsersDiscovered(discoveredUsers.length)}
			</Text>
			<UserProfileDiscoveredUserList discoveredUsers={discoveredUsers} />
		</View>
		);
	} else {
		return alt;
	}
}

class UserProfileDiscoveredUsers extends Component {
	render () {
		return (
			<View style={{
				height: 110, 
				backgroundColor: '#FAFAFA', 
				marginBottom: 6,
			borderStyle: 'solid',
			borderColor: '#EDEDED', 
			borderBottomWidth: 2,
			borderTopWidth: 2,
			marginHorizontal: 18}}>
				{displayListWhenReady(this.props.discoveredUsers)}
			</View>
		);
	}
}

export { UserProfileDiscoveredUsers };

