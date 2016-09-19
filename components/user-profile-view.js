import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';

import { getUserInfoForProfileFromServer } from './../async/';

let Dimensions = require('Dimensions');
let windowSize = Dimensions.get('window');

class UserProfileView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			downloadComplete: false,
			user: {
				id: 'downloading...',
				authorPic: null
			},
		};
	}

	componentWillMount() {
		getUserInfoForProfileFromServer(this.props.userId)
		.then( (user) => {
			if (user) {
				console.log("THE DATA FROM USERPROFILEVIEW", user);
				this.setState({
					downloadComplete: true,
					user
				});
			}
		});
	}

	render() {

		return (
		<ScrollView style={{flex: 1, backgroundColor: '#D9D9D9'}}>
			<View style={{flex: 1, alignItems: 'stretch', backgroundColor: 'blue'}}>
				{displayProfilePicture(this.state)}
			</View>
	    </ScrollView>
		);
	}
}

const displayProfilePicture = function(state) {
	if (state.downloadComplete) {
		return (
			<View style={{flex: 1}}>
				<Image source={{uri: state.user.authorPic}} style={{height: windowSize.width, width: windowSize.width}} />
			</View>
		);
	} else {
		return (
			<View style={{height: 300, width: 300}}>
			<Image source={require('./../img/spinner.gif')}
							style={{height: 32, width: 32, margin: 10, alignSelf: 'center'}} />
			</View>
		);
	}
}

export { UserProfileView };