import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { likeMessageOnServer, dislikeMessageOnServer, getLikeDataForMessage } from './../async';

class MessageLikeButton extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			liked: false,
			numberOfLikes: 0
		}
	}

	componentWillMount() {
		getLikeDataForMessage(this.props.message.id)
		.then( (data) => {
			if (data) {
				this.setState({
					liked: data.liked,
					numberOfLikes: data.numberOfLikes
				});
			}
		});
	}

	render() {

		const displayNumberOfLikes = (numberOfLikes) => {
			if (numberOfLikes) {
				return "Likes (" + numberOfLikes + ")";
			} else {
				return "Likes (0)";
			}
		}

		const likeMessage = (message) => {
			likeMessageOnServer(message.id)
			.then( (data) => {
				//hacky solution, but under constraints: changing local component state based on redux state
				this.setState({
					liked: true,
					numberOfLikes: data.numberOfLikes
				})
			})
		}

		const dislikeMessage = (message) => {
			//here too
			dislikeMessageOnServer(message.id)
			.then( (data) => {
				this.setState({
					liked: false,
					numberOfLikes: data.numberOfLikes
				})
			})
		}

		const toggleLike = (liked, message) => {
			if (liked) {
				dislikeMessage(message);
			} else {
				likeMessage(message);
			}
		}

		const getTextColor = (liked) => {
			if (liked) {
				return [style.text, style.textColorLiked];
			} else {
				return [style.text, style.textColorUnliked];
			}
		}

		return (
			<View style={style.container}>
		 		<TouchableHighlight
		 			style={style.highlight}
		 			onPress={() => toggleLike(this.state.liked, this.props.message)}>
			 	<Text style={getTextColor(this.state.liked)}>
			 		{displayNumberOfLikes(this.state.numberOfLikes)}
			 	</Text>
			 	</TouchableHighlight>
		 	</View>			
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
	 	alignItems: 'center'
	},
	highlight: {
		flex: 1,
		justifyContent: 'center', 
		alignItems: 'center'
	},
	text: {
		flexDirection: 'column',
 		justifyContent: 'center',
		alignItems: 'center',
 		textAlign: 'center', 
 		fontWeight: 'bold', 
	},
	textColorUnliked: {
		color: '#7F7F7F',
		fontWeight: 'bold'
	},
	textColorLiked: {
		color: '#1874CD',
		fontWeight: 'bold'
	}
})

export { MessageLikeButton };