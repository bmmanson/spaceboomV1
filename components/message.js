import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { MessageHeader } from './message-header';

class Message extends Component {

	render () {

		function commentButtonText(comments) {
			if (!comments || !comments.length) {
				return "Reply";
			} else {
				return "Reply (" + comments.length + ")";
			}
		}

		return (
			<View style={{flex: 7, 
				borderStyle: 'solid', 
				borderColor: '#8C8C8C', 
				backgroundColor: '#FAFAFA', 
				borderWidth: 1, 
				borderRadius: 3, 
				margin: 10,
				marginTop: 2,
				shadowOpacity: 0.8,
				shadowRadius: 2,
				shadowOffset: {
					width: 1,
					height: 1
				}}}>
				<MessageHeader 
					author={this.props.message.author} 
					locationName={this.props.message.locationName}
					authorPic={this.props.message.authorPic} />
				<Text style={{flex: 3,
					minHeight: 40, 
					fontSize: 14, 
					marginHorizontal: 10, 
					marginTop: 10, 
					marginBottom: 6}}>
					{this.props.message.body}
				</Text>
				<View style={{flex: .5,  
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
					<Text style={{fontSize: 12,
					 	textAlign: 'left'
					}}>
						Discovered 0 times.
					</Text>
				</View>
				 <View style={{flex: 1, flexDirection: 'row'}}>
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
					 		{commentButtonText(this.props.message.comments)}
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