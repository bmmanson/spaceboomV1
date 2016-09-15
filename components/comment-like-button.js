import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class CommentLikeButton extends Component {
	
	render () {

		const buttonStyle = function (isLiked) {
			if (isLiked === true) {
				return [likeButtonStyles.likeButton, likeButtonStyles.liked];
			} else {
				return [likeButtonStyles.likeButton, likeButtonStyles.notLiked]; 
			}
		};

		return (
			<View style={buttonStyle(this.props.isLiked)}>
				<Text style={{color: '#F0FFFF', fontWeight: 'bold', textAlign: 'center'}}>
					LIKE
				</Text>
			</View>

		);
	}
}

const likeButtonStyles = StyleSheet.create({
	likeButton: {
		borderRadius: 4,
		width: 50,
		padding: 3,
		alignSelf: 'center'
	},
	notLiked: {
		backgroundColor: '#8DB6CD'
	},
	liked: {
		backgroundColor: '#1874CD' 
	}
});

export { CommentLikeButton };


