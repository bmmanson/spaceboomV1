import React, { Component } from 'react';
import { View, Image, Text } from 'react-native'; 

class UserProfileInHorizontalList extends Component {


	render () {
		return (
	    	<View style={{marginVertical: 4, marginHorizontal: 2}}>
				<Image source={{uri: this.props.discoveredUser.authorPic}}
				style={{height: 52, width: 52, borderRadius: 26, alignSelf: 'center'}} />
				<Text style={{textAlign: 'center', fontSize: 12, color: '#919191', marginTop: 6, fontStyle: 'italic'}}>
					{this.props.discoveredUser.name.split(' ')[0]}
				</Text>
			</View>
		);
	}
}

export { UserProfileInHorizontalList };