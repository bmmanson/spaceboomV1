import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';

import { getUserInfoForProfileFromServer } from './../async/';

class UserProfileView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: 'downloading...',
				//authorPic: 
			},
			downloadComplete: false
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
	  		</Text>
	    </ScrollView>
		);
	}
}

//	  		<Image source={{uri: require('./../img/spinner.gif')}} 
//	  			style={{height: 200, width: 200}} />

// const downloadComplete = (

// )

// const downloading = (
// 	<View style={{flex: 1}}>
// 		<Text>
// 			Downloading...
// 		</Text>
// 	</View>
// )

export { UserProfileView };