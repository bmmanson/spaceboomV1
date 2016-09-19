import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';

import { getUserInfoForProfileFromServer } from './../async/';

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
		<ScrollView style={{flex: 1}}>
	  		<Text style={{textAlign: 'center', marginTop: 40}}>
	  			Hello. Profiles will live here in the future. 
	  			{" "}
	  			You got the userId!
	  			{" "}
	  			It is:
	  			{this.state.user.id}
	  			{displayProfilePicture(this.state)}
	  		</Text>
	    </ScrollView>
		);
	}
}

const displayProfilePicture = function(state) {
	if (state.downloadComplete) {
		return (
			<View style={{height: 300, width: 300}}>
			<Text>
				Also downloaded picture! But you cannot see it!
			</Text>	
			<Image source={{uri: state.user.authorPic}} style={{height: 200, width: 200}} />
			</View>
		);
	} else {
		return (
			<View style={{height: 300, width: 300}}>
			<Image source={require('./../img/spinner.gif')}
							style={{height: 32, width: 32, margin: 10, alignSelf: 'center'}} />
			<Text>
				Downloading!
			</Text>
			</View>
		);
	}
}

export { UserProfileView };