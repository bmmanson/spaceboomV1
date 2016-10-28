import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native'; 

import { UserProfileInHorizontalList } from './user-profile-in-horizontal-list';

class UserProfileDiscoveredUserList extends Component {

	_getUserProfiles(users) {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return ds.cloneWithRows(users);		
	}

	render () {
		return (
			<View style={{flex: 1}}>
				<ListView 
		    	dataSource={this._getUserProfiles(this.props.discoveredUsers)}
		    	renderRow={ (discoveredUser) => <UserProfileInHorizontalList discoveredUser={discoveredUser} />} 
		    	horizontal={true}
		    	style={{flex: 1, paddingTop: 2, paddingBottom: 4}} />
	    	</View>
		);
	}

}

export { UserProfileDiscoveredUserList };