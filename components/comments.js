import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { Comment } from './comment';

class Comments extends Component {

	render() {

		let displayComments = function(comments, id, type) {
			
			if (comments.length) {
				console.log("INSIDE THE DISPLAY COMMENTS FUNCTION. 32?", id);
				return (
					comments.map((comment, i) =>
						(<Comment comment={comment} userIdOfCommentedOn={id} type={type} key={i} />)
					)
				)
			} 
		}

		let displayCommentsWhenDownloadCompletes = function (comments, commentedOn, downloadComplete) {
			if (downloadComplete === true) {
				if (commentedOn.hasOwnProperty('userprofile')) {
					let id = commentedOn.id;
					//comment section belongs to user profile
					return (
						<View style={styles.container}>
							{displayComments(comments, id, "USER")}
						</View>
					);	
				} else {
					//comment section belongs to message
					return (
						<View style={styles.container}>
							{displayComments(comments, commentedOn.authorId, "MESSAGE")}
						</View>
					);
				}
			} else {
				return (
					<View style={styles.container}>
						<View>
							<Image source={require('./../img/spinner.gif')}
							style={styles.spinner} />
							<Text style={styles.downloadingText}>
								Downloading comments...
							</Text>
						</View>
					</View>
				);
			}
		}

		return (
			<View>
			{displayCommentsWhenDownloadCompletes(
				this.props.comments, 
				this.props.commentedOn, 
				this.props.downloadComplete)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 7, 
		backgroundColor: '#F5F5F5',
	},
	spinner: {
		height: 32, 
		width: 32, 
		margin: 10, 
		alignSelf: 'center'
	},
	downloadingText: {
		textAlign: 'center', 
		fontSize: 12, 
		color: '#949494', 
		marginVertical: 4
	}

})

export { Comments };