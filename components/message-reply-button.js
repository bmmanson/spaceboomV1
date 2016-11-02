import React, { Component } from 'react';
import { Text, View } from 'react-native';

class MessageReplyButton extends Component {
	
	render() {

		const commentButtonText = (comments) => {
			if (comments.length === 0 || !comments) {
				return "Replies (0)";
			} else {
				return "Replies (" + comments.length + ")";
			}
		}

		return (
		 	<View style={{
		 			flex: 1, 
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