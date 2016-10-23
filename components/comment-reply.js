import React, { Component } from 'react';
import { Text, 
	View, 
	TextInput, 
	TouchableHighlight, 
	Image,
	AlertIOS } from 'react-native';

import { addCommentOnServer, sendWallPostToServer } from './../async';

const maxCharacters = 225;

class CommentReply extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			text: "",
			inputHeight: 40,
			charactersRemaining: maxCharacters,
			uploadingComment: false
		 };
	}

	render () {

		const sendCommentToServerAndUpdate = function (message, text) {
			//if the response is a post on a user profile
			if (message.email) {
				return sendWallPostToServer(message.id, text);	
			//if the comment is a response to a message
			} else {
				return addCommentOnServer(message.id, text);
				
			}
		}

		const downloadingSpinner = (
			<Image source={require('./../img/spinner.gif')}
			style={{height: 24, 
					width: 24, 
					marginTop: 6,
					marginLeft: 14}} />
		);

		const sendButton = (
			<View>
			<View style={{height: 25,
				width: 50, 
				backgroundColor: '#EEC900', 
				borderColor: '#C6E2FF',
				borderRadius: 5,
				borderWidth: 1,
				borderStyle: 'solid',
				justifyContent: 'center',
				alignItems: 'center'}}>
				<TouchableHighlight style={{
					height: 25,
					width: 50, 
					justifyContent: 'center', 
					alignItems: 'center'}} 
					onPress={() => {
						if (this.state.text.length < 1) {
							AlertIOS.alert("Your message must contain at least one character!");
						} else {
							this.setState({uploadingComment: true});
							sendCommentToServerAndUpdate(
								this.props.message,
								this.state.text
							).then((status) => {
								if (status === "COMPLETE") {
									this.setState({
										text: "",
										charactersRemaining: maxCharacters,
										inputHeight: 40,
										uploadingComment: false
									});
								}
							})
						}
					}} >
				<Text style={{color: 'white', 
							fontWeight: 'bold', 
							textAlign: 'center'}}>
					SEND
				</Text>
				</TouchableHighlight>
			</View>
				<Text style={{color: '#575757', 
							fontWeight: 'bold', 
							fontSize: 10, 
							textAlign: 'center', 
							marginTop: 3}}>
					{"" + this.state.charactersRemaining}
				</Text>
			</View>
		);

		const displaySendButtonOrSpinner = function (state) {
			if (state.uploadingComment === false) {
				return sendButton;
			} else {
				return downloadingSpinner;
			}
		}

		return (
			<View style={{minHeight: 50,
			backgroundColor: 'white', 
			borderTopColor: '#B0B0B0', 
			borderTopWidth: 3, 
			borderStyle: 'solid'}}>
				<View style={{flexDirection: "row"}}>
					<TextInput 
					value={this.state.text}
					onChange={(event) => {
						if (maxCharacters - event.nativeEvent.text.length > -1) {
							this.setState({
								text: event.nativeEvent.text,
								inputHeight: event.nativeEvent.contentSize.height,
								charactersRemaining: maxCharacters - event.nativeEvent.text.length
							});
						}
					}}
					placeholder={"Tell 'em what you think!"}
					placeholderTextColor={'#575757'}
					multiline={true}
					style={{margin: 6, 
						borderRadius: 5, 
						borderStyle: 'solid', 
						borderColor: '#B0B0B0', 
						borderWidth: 1,
						minHeight: Math.max(40, this.state.inputHeight),
						backgroundColor: '#E3E3E3',
						fontSize: 14,
						color: '#636363',
						fontWeight: 'bold',
						flex: 1,
						padding: 2,
						paddingLeft: 6,
						paddingRight: 6}} />
					<View style={{width: 50,
							marginTop: 6,
							marginRight: 6}}>
						{displaySendButtonOrSpinner(this.state)}
					</View>
				</View>
			</View>
		);
	}
}

export { CommentReply }; 