import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
let moment = require('moment');

import { MessageHeader } from './message-header';

class Message extends Component {

	render () {

		function commentButtonText (comments) {
			if (comments.length === 0 || !comments) {
				return "Reply";
			} else {
				return "Reply (" + comments.length + ")";
			}
		}

		function displayFormattedTime (message) {
			if (message.createdAt) {
				return moment(message.createdAt).fromNow();
			}	
		}

		function displayTimesDiscovered (message) {
			if (message.timesDiscovered === 1) {
				return "Discovered 1 time.";
			} else {
				return "Discovered " + message.timesDiscovered + " times.";
			}
		}

		function displayNumberOfLikes (message) {
			if (message.numberOfLikes) {
				return "Likes (" + message.numberOfLikes + ")";
			} else {
				return "Likes (0)";
			}
		}

		return (
			<View style={{
				minHeight: 40, 
				borderStyle: 'solid', 
				borderColor: '#8C8C8C',
				borderBottomColor: '#DBDBDB', 
				backgroundColor: '#F5F5F5', 
				borderTopWidth: 1,
				borderBottomWidth: 3
				}}>
				<MessageHeader message={this.props.message} />
				<Text style={{flex: 3,
					minHeight: 14, 
					fontSize: 14, 
					marginHorizontal: 10, 
					marginTop: 10, 
					marginBottom: 2}}>
					{this.props.message.body}
				</Text>
				<Text style={{color: '#949494', 
					fontSize: 12,
					marginHorizontal: 12,
					marginVertical: 10}}>
					{displayFormattedTime(this.props.message)}
				</Text>
				<View style={{
						height: 20,  
						marginHorizontal: 10,
						marginTop: 6,
						borderStyle: 'solid', 
						borderBottomColor: '#E8E8E8', 
						borderBottomWidth: 1, 
						borderTopColor: '#E8E8E8', 
						borderTopWidth: 1,
						justifyContent: 'center', 
				 		alignItems: 'center'
						}}>
					<Text style={{
					 	textAlign: 'left',
					 	marginVertical: 6,
					 	fontSize: 12
					}}>
						{displayTimesDiscovered(this.props.message)}
					</Text>
				</View>
				 <View style={{height: 38, flexDirection: 'row'}}>
				 	<View style={{flex: 1, 
				 			justifyContent: 'center', 
				 			alignItems: 'center'
				 		}}>
				 		<TouchableHighlight
				 			style={{flex: 1,
				 			justifyContent: 'center', 
				 			alignItems: 'center'}}
				 			onPress={() => {}}>
					 	<Text style={{
							flexDirection: 'column',
					 		justifyContent: 'center',
	    					alignItems: 'center',
					 		textAlign: 'center', 
					 		fontWeight: 'bold', 
					 		color: '#1874CD',
	    					}}>
					 		{displayNumberOfLikes(this.props.message)}
					 	</Text>
					 	</TouchableHighlight>
				 	</View>				 	
				 	<View style={{flex: 1, 
				 			justifyContent: 'center', 
				 			alignItems: 'center'
				 		}}>
					 	<Text style={{
							flexDirection: 'column',
					 		justifyContent: 'center',
	    					alignItems: 'center',
					 		textAlign: 'center', 
					 		fontWeight: 'bold', 
					 		color: '#1874CD',
	    					}}>
					 		{commentButtonText(this.props.comments)}
					 	</Text>
				 	</View>
				 	<View style={{flex: 1, 
				 		justifyContent: 'center', 
				 		alignItems: 'center'
				 	}}>
					 	<Text style={{
					 		flexDirection: 'column',
					 		justifyContent: 'center',
	    					alignItems: 'center',
					 		textAlign: 'center', 
					 		fontWeight: 'bold', 
					 		color: '#1874CD',
					 		}}>
					 		Report
					 	</Text>
				 	</View>
				</View>
			</View>
		);
	}
}

export { Message };