import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Comment } from './comment';

class Comments extends Component {


	render() {

		let displayComments = function(comments) {
			
			if (comments.length) {
				return (
					comments.map((comment, i) =>
						(<Comment comment={comment} key={i} />)
					)
				)
			} 
		}

		return (
			<View style={{flex: 7, 
				backgroundColor: '#F5F5F5',
				borderStyle: 'solid', 
				borderColor: '#8C8C8C', 
				borderBottomWidth: 1,
				}}>
			{displayComments(this.props.comments)}
			</View>
		);
	}
}

export { Comments };