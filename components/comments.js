import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Comment } from './comment';

class Comments extends Component {


	render() {

		let commentsBannerText = function (comments) {
			if (!comments.length) {
				return "0 replies.";
			} else if (comments.length === 1) {
				return "1 reply.";
			} else {
				return "" + comments.length + " replies";
			}
		}

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
				borderStyle: 'solid', 
				borderColor: '#8C8C8C', 
				backgroundColor: '#FAFAFA', 
				borderWidth: 1, 
				marginBottom: 10,
				marginTop: 12,
				shadowOpacity: 0.8,
				shadowRadius: 2,
				shadowOffset: {
					width: 1,
					height: 1
				}}}>
				<View>
					<Text style={{textAlign: 'center', marginVertical: 4}}>
						{commentsBannerText(this.props.comments)}
					</Text>
				</View>
			{displayComments(this.props.comments)}
			</View>
		);
	}
}

export { Comments };