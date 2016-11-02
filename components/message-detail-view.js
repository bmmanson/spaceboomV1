import React, { Component } from 'react';
import { View, 
	ScrollView, 
	StyleSheet, 
	Keyboard, 
	Dimensions, 
	LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';

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
			downloadComplete: false,
			visibleHeight: Dimensions.get('window').height - 65,
		};
	}

	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));

		getCommentsForMessage(this.props.message.id)
		.then( (status) => {
			if (status === "COMPLETE") {
				this.setState({
					downloadComplete: true
				});
			}
		});

	}

	componentWillUnmount () {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	keyboardDidShow (e) {
		let newSize = Dimensions.get('window').height - e.endCoordinates.height - 65;
		this.setState({
			visibleHeight: newSize,
		});
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	}
  
	keyboardDidHide (e) {
		let newSize = Dimensions.get('window').height - 65;
		this.setState({
			visibleHeight: newSize,
		});
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	} 

	render () {

		return (
			<View style={style.view}>
				<View style={{height: this.state.visibleHeight}}>
					<ScrollView style={style.scrollView}> 
						<View style={style.container}>
							<Message message={this.props.message}
									comments={this.props.comments} />
							<Comments comments={this.props.comments} 
									  commentedOn={this.props.message}
									  downloadComplete={this.state.downloadComplete} />
							<MessageMap message={this.props.message} />
							<DeleteMessageButton message={this.props.message} />
						</View>
					</ScrollView>
					<CommentReply message={this.props.message} />
				</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	view: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
		backgroundColor: '#D9D9D9'
	},
	container: {
		backgroundColor: '#FAFAFA',
		marginTop: 0,
		marginBottom: 6,
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			width: 1,
			height: 1
		}	
	}
});

const sortedComments = (comments) => {
	return comments.sort((a, b) => a.id - b.id);
}

const mapStateToProps = (state) => {
	return {
		comments: sortedComments(state.comments)
	};
}

const MessageDetailView = connect(
	mapStateToProps
)(MessageDetail);

export { MessageDetailView };