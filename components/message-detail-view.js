import React, { Component } from 'react';
import { Text, View, MapView, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { styles } from './../styles/main';
import { DeleteMessageButton } from './delete-message-button';
import { Message } from './message';
import { Comments } from './comments';
import { MessageMap } from './message-map';
import { CommentReply } from './comment-reply';

import { getCommentsForMessage } from './../async/';
import { markCommentAsLiked, markCommentAsUnliked } from './../actions';
import { store } from './../store';

class MessageDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
			downloadComplete: false
		};
	}

	componentWillMount() {
		getCommentsForMessage(this.props.message.id)
		.then( (status) => {
			if (status === "COMPLETE") {
				this.setState({
					downloadComplete: true
				});
			}
		});
	}

	render () {

		return (
			<View style={{flex: 1}}>
				<ScrollView style={{backgroundColor: '#D9D9D9'}}> 
					<View style={{
						marginTop: 0,
						marginBottom: 6,
						shadowOpacity: 0.8,
						shadowRadius: 2,
						shadowOffset: {
							width: 1,
							height: 1}}}>
						<Message message={this.props.message}
								comments={this.props.comments} />
						<Comments comments={this.props.comments} 
								  message={this.props.message}
								  downloadComplete={this.state.downloadComplete} />
						<MessageMap message={this.props.message} />
					</View>
					<DeleteMessageButton message={this.props.message}/>
				</ScrollView>
				<CommentReply message={this.props.message} />
			</View>
		);
	}
}

const sortedComments = (comments) => {
	return comments.sort((a, b) => a.id - b.id);
}

const mapStateToProps = (state) => {
	return {
		comments: sortedComments(state.comments),
	};
}

const mapDispatchToProps = (dispatch) => ({
		likeComment (commentId, numberOfLikes) {
			dispatch(markCommentAsLiked(commentId, numberOfLikes));
		},
		dislikeComment (commentId, numberOfLikes) {
			dispatch(markCommentAsUnliked(commentId, numberOfLikes));
		}
});

const MessageDetailView = connect(
	mapStateToProps,
	mapDispatchToProps
)(MessageDetail);

export { MessageDetailView };