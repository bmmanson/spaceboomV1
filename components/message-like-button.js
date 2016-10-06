import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
//import { } from './../async';

class MessageLikeButton extends Component {
	
	render() {

		const displayNumberOfLikes = (message) => {
			if (message.numberOfLikes) {
				return "Likes (" + message.numberOfLikes + ")";
			} else {
				return "Likes (0)";
			}
		}
//#1874CD - WHEN LIKED
//

		return (
			<View style={{flex: 1, 
		 			justifyContent: 'center', 
		 			alignItems: 'center'
		 		}}>
		 		<TouchableHighlight
		 			style={{flex: 1,
		 			justifyContent: 'center', 
		 			alignItems: 'center'}}
		 			onPress={() => {}}>
			 	<Text style={{
					flexDirection: 'column',
			 		justifyContent: 'center',
					alignItems: 'center',
			 		textAlign: 'center', 
			 		fontWeight: 'bold', 
			 		color: '#7F7F7F',
					}}>
			 		{displayNumberOfLikes(this.props.message)}
			 	</Text>
			 	</TouchableHighlight>
		 	</View>			
		);
	}
}

export { MessageLikeButton };