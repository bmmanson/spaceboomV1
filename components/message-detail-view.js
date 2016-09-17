import React, { Component } from 'react';
import { Text, View, MapView, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { styles } from './../styles/main';
import { DeleteMessageButton } from './delete-message-button';
import { Message } from './message';
import { Comments } from './comments';

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

			<ScrollView style={{flex: 10, backgroundColor: '#D9D9D9'}}> 
				
				<View style={{
					marginTop: 10,
					marginBottom: 10,
					shadowOpacity: 0.8,
					shadowRadius: 2,
					shadowOffset: {
						width: 1,
						height: 1}}}>
					<Message message={this.props.message}
							comments={this.props.comments} />
					<Comments comments={this.props.comments} 
							  downloadComplete={this.state.downloadComplete} />
				</View>
				<View style={{height: 240, marginVertical: 12}}>
					<MapView style={{flex: 1, 
						justifyContent: 'space-between',
					shadowOpacity: 0.8,
					shadowRadius: 2,
					shadowOffset: {
						width: 1,
						height: 1}}}
								showUsersLocation={false}
								scrollEnabled={false}
								zoomEnabled={false} 
								region={{latitude: this.props.message.latitude, 
										longitude: this.props.message.longitude,
										latitudeDelta: 0.005,
										longitudeDelta: 0.005}} />
				</View>
				<DeleteMessageButton message={this.props.message}/>
			</ScrollView>
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