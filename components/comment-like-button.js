import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

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

		const likeComment = function (commentId, numberOfLikes) {
			postCommentAsLikedOnServer(commentId, numberOfLikes)
			.then(() => {
				console.log("COMMENT LIKED:", store.getState());
			});
		};

		const dislikeComment = function (commentId, numberOfLikes) {
			postCommentAsUnlikedOnServer(commentId, numberOfLikes)
			.then(() => {
				console.log("COMMENT DISLIKED:", store.getState());
			});
		};

		const likeOrDislikeComment = function (comment) {
			if (comment.isLikedByCurrentUser === false) {
				return likeComment(comment.id, comment.numberOfLikes);
			} else {
				return dislikeComment(comment.id, comment.numberOfLikes);
			}
		}

		return (
			<View style={buttonStyle(this.props.comment)}>
				<TouchableHighlight onPress={() => {likeOrDislikeComment(this.props.comment)}}>
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


