import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import { store } from './../store';
import { postCommentAsLikedOnServer, postCommentAsUnlikedOnServer} from './../async';

class CommentLikeButton extends Component {
	
	render () {

		const buttonStyle = function (comment) {
			if (comment.isLikedByCurrentUser === true) {
				return [likeButtonStyles.button, likeButtonStyles.liked];
			} else {
				return [likeButtonStyles.button, likeButtonStyles.notLiked]; 
			}
		};

		const likeComment = function (commentId, numberOfLikes, type) {
			postCommentAsLikedOnServer(commentId, numberOfLikes, type);
		};

		const dislikeComment = function (commentId, numberOfLikes, type) {
			postCommentAsUnlikedOnServer(commentId, numberOfLikes, type);
		};

		const likeOrDislikeComment = function (comment, type) {
			if (comment.isLikedByCurrentUser === false) {
				return likeComment(comment.id, comment.numberOfLikes, type);
			} else {
				return dislikeComment(comment.id, comment.numberOfLikes, type);
			}
		}

		return (
			<View style={buttonStyle(this.props.comment)}>
				<TouchableHighlight onPress={() => {likeOrDislikeComment(this.props.comment, this.props.commentType)}}>
					<Text style={likeButtonStyles.text}>
						LIKE
					</Text>
				</TouchableHighlight>	
			</View>
		);
	}
}

const likeButtonStyles = StyleSheet.create({
	button: {
		borderRadius: 4,
		width: 50,
		padding: 3,
		alignSelf: 'center'
	},
	text: {
		color: '#F0FFFF', 
		fontWeight: 'bold', 
		textAlign: 'center'
	},
	notLiked: {
		backgroundColor: '#8DB6CD'
	},
	liked: {
		backgroundColor: '#1874CD' 
	}
});

export { CommentLikeButton };


