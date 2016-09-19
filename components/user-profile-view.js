import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';

class UserProfileView extends Component {

	// componentWillMount() {
	// 	getUserInfoForProfileFromServer(this.props.userId)
	// 	.then( (status) => {
	// 		if (status === "COMPLETE") {
	// 			this.setState({
	// 				downloadComplete: true
	// 			});
	// 		}
	// 	});
	// }

	render() {

		return (
	  	<ScrollView style={{flex: 1}}>
	  		<Text style={{textAlign: 'center', marginTop: 40}}>
	  			Hello. Profiles will live here in the future. 
	  			{" "}
	  			You got the userId!
	  			{" "}
	  			It is:
	  			{this.props.userId}
	  		</Text>
	    </ScrollView>
		);
	}
}

export { UserProfileView };