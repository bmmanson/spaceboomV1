import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { CommentLikeButton } from './comment-like-button';

class CommentLikeButtonAndCounter extends Component {

	render () {

		let renderNumberOfLikes = function (comment) {
			if (comment.numberOfLikes === 1) {
				return "1 Like";
			} else {
				return "" + comment.numberOfLikes + " Likes";
			}
		}

		return (
			<View>
				<CommentLikeButton comment={this.props.comment} />
				<Text style={{fontSize: 10, textAlign: 'center', color: '#949494', marginTop: 6}}>
					{renderNumberOfLikes(this.props.comment)}
				</Text>
			</View>
		);
	}
}

export { CommentLikeButtonAndCounter };