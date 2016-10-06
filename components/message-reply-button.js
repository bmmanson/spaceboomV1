import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
//import { } from './../async';

class MessageReplyButton extends Component {
	
	render() {

		const commentButtonText = (comments) => {
			if (comments.length === 0 || !comments) {
				return "Reply";
			} else {
				return "Reply (" + comments.length + ")";
			}
		}

		return (
		 	<View style={{flex: 1, 
		 			justifyContent: 'center', 
		 			alignItems: 'center'
		 		}}>
			 	<Text style={{
					flexDirection: 'column',
			 		justifyContent: 'center',
					alignItems: 'center',
			 		textAlign: 'center', 
			 		fontWeight: 'bold', 
			 		color: '#1874CD',
					}}>
			 		{commentButtonText(this.props.comments)}
			 	</Text>
		 	</View>		
		);
	}
}

export { MessageReplyButton };