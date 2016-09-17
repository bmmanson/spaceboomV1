import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, AlertIOS } from 'react-native';

import { store } from './../store';
import { deleteCommentOnServer, currentUserId } from './../async';

import { CommentLikeButtonAndCounter } from './comment-like-button-and-counter';

class Comment extends Component {

	render () {

		function deleteComment (comment) {
			if (comment) {
				AlertIOS.alert(
					"Delete Comment", 
					"Are you sure you want to delete this comment?",
					[
						{
						text: "Cancel", 
						onPress: () => console.log("user didn't delete comment"), 
						style: "cancel"
						},
						{
						text: "Delete", 
						onPress: function () {
							deleteCommentOnServer(comment.id)
							.then( () => {
								AlertIOS.alert("", "Comment deleted!");
							})
							}
						}
					]
				)
			}
		}

		function displayDeleteButton (comment, message) {
			if (comment.currentUser || message.authorId === currentUserId) {
				return (
				<TouchableHighlight style={{height: 10, width: 55}} onPress={() => {deleteComment(comment)}}>
				<Text style={{color: '#949494', fontSize: 10}}>
					|| DELETE
				</Text>
				</TouchableHighlight>
				);
			}
		}

		return (
			<View style={{flexDirection: 'row', 
			flex: 1,
			marginVertical: 8,
			backgroundColor: '#F5F5F5',
			}}>
				<View style={{flex: 2, flexDirection: 'column'}}>
					<Image source={{uri: this.props.comment.authorPic}}
				style={{height: 36, width: 36, borderRadius: 18, alignSelf: 'center'}} />
				</View>
				<View style={{flex: 8, flexDirection: 'column'}}>
					<View style={{flex: 1, marginTop: 4}}>
						<Text style={{fontWeight: 'bold', fontSize: 12, margin: 0}}>
						{this.props.comment.author}
						</Text>
						<Text style={{fontSize: 12, margin: 0}}>
						{this.props.comment.body}
						</Text>
						<View style={{flexDirection: "row"}}>
							<Text style={{fontSize: 10, color: '#949494', marginVertical: 6}}>
							5m ago
							{" "}
							{displayDeleteButton(this.props.comment, this.props.message)}
							</Text>
						</View>
					</View>
				</View>
				<View style={{flex: 3, flexDirection: 'column'}}>
					<CommentLikeButtonAndCounter comment={this.props.comment} />
				</View>
			</View>

		);
	}
}

export { Comment };
